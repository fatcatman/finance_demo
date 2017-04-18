var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./pad.tmpl');
avalon.templateCache.pad = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "pad",
    limit: 20,
    Regionlimit: 10,
    total: '',
    title:'PAD管理',
    currentPage: 1,
    pageCount: 0,
    RegioncurrentPage: 1,
    RegionpageCount: 0,
    pageList: 0,
    dataList: [],
    RegionList:[],
    imageId: 0,
    isvideo: false,
    pid: 0,//当前级PID
    p_pid: 0,//上一级PID
    level: 1,
    level_name: '全区',
    p_level_name: '全区',//上级名称
    Regionname:'',
    CurrentObj: { ID: 0, Name: '', Serial:'',Region:0},
    RegionId:0,
    isAdd:true,
    load: function () {
        ajax.pad.List(model.currentPage, model.limit, model.RegionId).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.total = data.total;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
       
    },
    SetRegion: function (id,name) {
        model.CurrentObj.Region = id;
        model.Regionname = name;
        rootVm.$alert('提示', '选择['+name+']成功', 'info');
    },
    loadregion: function () {
        ajax.region.List(model.RegioncurrentPage, model.Regionlimit, model.pid).done(function (data) {
            model.RegionList = data.items;
            model.RegioncurrentPage = data.page;
            model.RegionpageCount = data.totalPage;
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
        model.RegioncurrentPage = 1;
        model.loadregion();
    },
    RegionPreviouPage: function () {
        if (model.RegioncurrentPage == 1) {
            rootVm.$alert('提示', '已经是第一页了', 'error');
        } else {
            model.RegioncurrentPage--;
            model.loadregion();
        }
    },
    RegionNextPage: function () {
        if (model.RegioncurrentPage == model.RegionpageCount) {
            rootVm.$alert('提示', '已经是最后一页了', 'error');
        } else {
            model.RegioncurrentPage++;
            model.loadregion();
        }
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
        model.CurrentObj.Serial = '';
        model.CurrentObj.Region = 0;
        model.isAdd = true;
        $('#Add_modal').modal('show');
    },
    //初始化数据
    ShowUpdatePic: function (obj) {
        model.CurrentObj.ID = obj.id;
        model.CurrentObj.Name = obj.name;
        model.CurrentObj.Serial = obj.serial;
        model.CurrentObj.Region = obj.region.id;
        model.isAdd = false;
        $('#Add_modal').modal('show');
    },
    Save: function () {
        if ($.trim(model.CurrentObj.Name) == '') {
            rootVm.$alert('提示', '名称不能为空', 'error');
            return;
        }
        ajax.pad.save(model.CurrentObj.$model).done(function (data) {
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
        model.CurrentObj.ID = obj.$model.ID;
        $('#Delete_modal').modal('show');
    },
    Delete: function () {
        ajax.pad.del(model.CurrentObj.ID).done(function (data) {
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
model.load();
model.loadregion();
model.$init();
avalon.vmodels.page.content = "pad";
exports.setType = function (isvideo) {
    avalon.vmodels.page.content = "pad";
}