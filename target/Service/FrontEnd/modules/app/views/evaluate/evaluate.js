var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./evaluate.tmpl');
avalon.templateCache.evaluate = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "evaluate",
    limit: 20,
    total: '',
    title:'评价管理',
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    dataList: [],
    imageId: 0,
    params:'',
    CurrentObj: { ID: '', Name: '', Type: '' },
    isAdd:true,
    load: function () {
        ajax.evaluate.List(model.currentPage, model.limit,model.params).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.total = data.total;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    Search: function () {
        model.currentPage = 1;
        model.load();
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
    ShowSetActivityGroupWin: function (record) {
        model.CurrentUser = record.$model;
        $("#ShowSetActivityGroupWin").modal('show');
    },
    SetActivityGroup: function (groupId) {
        ajax.user.setActivityGroup(groupId, model.CurrentUser.ID).done(function (data) {
            if (data.success) {
                model.load();
                $("#ShowSetActivityGroupWin").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    ShowAddPic: function () {
        model.CurrentObj.ID = 0;
        model.CurrentObj.Name = '';
        model.CurrentObj.Type = '欢迎';
        model.isAdd = true;
        $('#Add_modal').modal('show');
    },
    //初始化数据
    ShowUpdatePic: function (obj) {
        model.CurrentObj.ID = obj.ID;
        model.CurrentObj.Name = obj.Name;
        model.CurrentObj.Type = obj.Type;
        model.isAdd = false;
        $('#Add_modal').modal('show');
    },
    Save: function () {
        if ($.trim(model.CurrentObj.Name) == '') {
            rootVm.$alert('提示', '名称不能为空', 'error');
            return;
        }
        ajax.evaluate.save(model.CurrentObj.$model).done(function (data) {
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
    Picinit: function (obj) {
        model.imageId = obj.$model.ID;
        $('#uploadDialog').modal('show');
    },
    ImgUpload: function () {
        $.ajaxFileUpload({
            url: '/Image/UploadFile',
            secureuri: false,
            data: { id: model.imageId },
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
    //初始化数据
    $init: function () {
        model.load();
     
    },
    updateFile: function (obj) {
        model.uploader[obj.$model.ID].upload();
    },
    ShowDel: function (obj) {
        model.CurrentObj = obj.$model;
        $('#Delete_modal').modal('show');
    },
    Delete: function () {
        ajax.evaluate.del(model.CurrentObj.ID).done(function (data) {
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
avalon.vmodels.page.content = "evaluate";