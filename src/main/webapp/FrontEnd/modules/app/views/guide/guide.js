var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./guide.tmpl');
avalon.templateCache.guide = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "guide",
    limit: 20,
    total: '',
    title: '办事指南列表',
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    dataList: [],
    isAdd: true,
    approvalId: 0,
    approvalName: '',
    OrgId: 0,
    Type: 0,
    OrgName: '全部',
    CurrentObj: { ID: '', Name: '', ApprovalItem: 0 },
    load: function () {
        ajax.guide.List(model.currentPage, model.limit, model.approvalId).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.total = data.total;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    PreviouPage: function () {
        if (model.currentPage == 1) {
            rootVm.$alert('提示', '已经是第一页了', 'error');
        } else {
            model.currentPage--;
            model.load();
        }
    },
    NextPage: function () {
        if (model.currentPage == model.pageCount) {
            rootVm.$alert('提示', '已经是最后一页了', 'error');
        } else {
            model.currentPage++;
            model.load();
        }
    },
    ShowAdd: function () {
        model.CurrentObj.ID = 0;
        model.CurrentObj.Name = '';
        model.CurrentObj.ApprovalItem = -model.approvalId;

        model.isAdd = true;
        $('#Add_modal').modal('show');
    },
    //初始化数据
    ShowUpdate: function (obj) {
        //model.CurrentObj = obj.$model;
        model.CurrentObj.ID = obj.ID;
        model.CurrentObj.Name = obj.Name;
        model.CurrentObj.ApprovalItem = obj.ApprovalItem.ID;

        model.isAdd = false;
        $('#Add_modal').modal('show');
    },
    Save: function () {
        if ($.trim(model.CurrentObj.Name) == '') {
            rootVm.$alert('提示', '名称不能为空', 'error');
            return;
        }
        ajax.guide.save(model.CurrentObj.$model).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '保存成功', 'success');
                model.load();
                $("#Add_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    //初始化数据
    $init: function () {
        model.load();

    },
    //初始化数据
    Picinit: function (obj) {
        model.formtempId = obj.$model.ID;
        $('#uploadDialog').modal('show');
    },
    ImgUpload: function () {
        $.ajaxFileUpload({
            url: '/Service/GuideTemplate/UploadFile.do',
            secureuri: false,
            data: { formtempId: model.formtempId },
            fileElementId: 'file_upload',
            dataType: 'text',
            success: function (data) {
                if (data == '1') {
                    rootVm.$alert('提示', '请选择合适的图片', 'error');
                } else if (data == '2') {
                    rootVm.$alert('提示', '上传成功', 'success');
                    $('#uploadDialog').modal('hide');
                    model.load();
                } else if (data == '0') {
                    rootVm.$alert('提示', '上传失败', 'error');
                }

            },
            error: function (data) {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    ShowDel: function (obj) {
        model.CurrentObj = obj.$model;
        $('#Delete_modal').modal('show');
    },
    Delete: function () {
        ajax.guide.Del(model.CurrentObj.ID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '删除成功', 'success');
                model.load();
                $("#Delete_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    }

});
avalon.scan();
exports.setApprovalId = function (approvalId, approvalName, OrgId, OrgName, Type) {
    model.OrgId = OrgId;
    model.OrgName = OrgName;
    model.approvalId = approvalId
    model.approvalName = approvalName;
    model.Type = Type;
    model.load();
    model.$init();
    avalon.vmodels.page.content = "temp";
}