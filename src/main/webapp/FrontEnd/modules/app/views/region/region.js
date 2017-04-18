var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./region.tmpl');
avalon.templateCache.region = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "region",
    limit: 20,
    total: '',
    title:'社区管理',
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    dataList: [],
    imageId: 0,
    isvideo: false,
    pid: 0,//当前级PID
    p_pid: 0,//上一级PID
    level: 1,
    level_name: '海淀',
    p_level_name: '海淀',//上级名称
    CurrentObj: { ID: 0, Name: '', Type:''},
    isAdd:true,
    load: function () {
        ajax.region.List(model.currentPage, model.limit, model.p_pid).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.total = data.total;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    SetPid: function (le_name, le, obj, pid) {
        model.level += le;

        if (le == -1) {
            if (model.p_pid != 0) {
                model.pid = model.p_pid;
                model.p_pid = 0;
                ///
                model.level_name = model.p_level_name;
            } else {
                model.pid = model.p_pid;
                model.p_pid = 0;
                model.level_name = '全区';
                model.p_level_name = '全区';
            }

        } else {
            model.p_level_name = model.level_name;
            model.level_name = le_name;
            model.pid = obj;
            model.p_pid = pid;
        }
        console.log(model.pid + "," + model.p_pid);
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
        model.CurrentObj.Type = '';
        model.isAdd = true;
        $('#Add_modal').modal('show');
    },
    //初始化数据
    ShowUpdatePic: function (obj) {
        model.CurrentObj.ID = obj.id;
        model.CurrentObj.Name = obj.name;
        model.CurrentObj.Type = obj.type;
        model.isAdd = false;
        $('#Add_modal').modal('show');
    },
    Save: function () {
        if ($.trim(model.CurrentObj.Name) == '') {
            rootVm.$alert('提示', '名称不能为空', 'error');
            return;
        }
        ajax.region.save(model.CurrentObj.$model).done(function (data) {
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

    },
    updateFile: function (obj) {
        model.uploader[obj.$model.ID].upload();
    },
    ShowDel: function (obj) {
        model.CurrentObj = obj.$model;
        $('#Delete_modal').modal('show');
    },
    Delete: function () {
        ajax.region.del(model.CurrentObj.ID).done(function (data) {
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
avalon.vmodels.page.content = "mediatype";
exports.setType = function (isvideo) {
    model.isvideo = isvideo;
    model.load();
    model.$init();
    
    avalon.vmodels.page.content = "mediatype";
}