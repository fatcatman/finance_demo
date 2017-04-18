var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./UserPwd.tmpl');
avalon.templateCache.UserPwd = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "UserPwd",
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    ID:0,
    userid: '',
    Pwd: '',
    users: [],
    pageList: 0,
    load: function () {
        ajax.UserPwd.List(model.currentPage, model.limit, model.userid).done(function (data) {
            model.users = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
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
    ShowAddPwd: function () {
        $("#Add_Pwd_modal").modal('show');
    },
    SavePwd: function () {
        if (model.Pwd == '') {
            rootVm.$alert('提示', '密码不能为空', 'error');
            return;
        }
        if (model.Pwd.length <6||model.Pwd.length >16) {
            rootVm.$alert('提示', '密码长度应该在6-16位之间', 'error');
            return;
        }
        ajax.UserPwd.Save(model.Pwd, model.userid).done(function (data) {
            if (data.success) {
                model.load();
                rootVm.$alert('提示', data.msg, 'success');
                $("#Add_Pwd_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    ShowDelete: function (obj) {
        model.ID = obj.ID;
        $("#Delete_Pwd_modal").modal('show');
    },
    Delete: function () {
        ajax.UserPwd.del(model.ID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', data.msg, 'success');
                $("#Delete_Pwd_modal").modal('hide');
                model.load();
            } else {
                rootVm.$alert('提示', data.msg, 'success');
            }
        });
    },

});
avalon.scan();
exports.setUserId = function (userid) {
    model.userid = userid;
    model.page = 1;
    model.load();
    avalon.vmodels.page.content = "UserPwd";
}


