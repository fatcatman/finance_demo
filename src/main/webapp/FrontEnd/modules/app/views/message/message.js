var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./message.tmpl');
avalon.templateCache.message = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "message",
    dataList: {},
    title: '留言板',
    limit: 20,
    activityId: 0,
    type: 'all',
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    currentManager: {
        ID: 0,
        Account: '',
        Pwd: '',
        role: 0,
        cppoint: ''
    },
    load: function () {
        ajax.message.List(model.currentPage, model.limit, model.activityId, model.type).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    $init: function () {

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
        model.currentManager.ID = '0';
        model.currentManager.Account = '';
        model.currentManager.Pwd = '';
        model.currentManager.role = '1';
        $("#Add_Manager_modal").modal('show');
    },
    Save: function () {
        if (model.currentManager.Account == '') {
            rootVm.$alert('提示', '账号不能为空', 'error');
            return;
        }
        if (model.currentManager.Pwd == '') {
            rootVm.$alert('提示', '密码不能为空', 'error');
            return;
        }
        if (model.currentManager.Pwd.length < 6) {
            rootVm.$alert('提示', '密码长度不能小于6位', 'error');
            return;
        }
        ajax.manager.save(model.currentManager.$model).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '保存成功', 'success');
                model.load();
                $("#Add_Manager_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    ShowDelete : function(obj){
        model.currentManager = obj.$model;
        $("#Delete_Manager_modal").modal('show');
    },
    Delete:function(){
        ajax.message.del(model.currentManager.ID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '删除成功', 'success');
                model.load();
                $("#Delete_Manager_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    ShowUpdatePwd: function (obj) {
        model.currentManager = obj.$model;
        model.currentManager.Pwd = '';
        $("#UpdatePwd_Manager_modal").modal('show');
    },
    UpdatePwd: function () {
        if (model.currentManager.Pwd == '') {
            rootVm.$alert('提示', '密码不能为空', 'error');
            return;
        }
        if (model.currentManager.Pwd.length < 6) {
            rootVm.$alert('提示', '密码长度不能小于6位', 'error');
            return;
        }
        ajax.manager.UpdatePwd(model.currentManager.ID, model.currentManager.Pwd).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '修改成功', 'success');
                model.load();
                $("#UpdatePwd_Manager_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    }
});
avalon.scan();
model.load();
model.$init();
avalon.vmodels.page.content = "message";

exports.getBooks = function () {
    model.load();
    model.$init();
    avalon.vmodels.page.content = "message";
}
