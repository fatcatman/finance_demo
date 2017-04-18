var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./user.tmpl');
avalon.templateCache.user = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "user",
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    CurrentUser: '',
    users: [],
    pageList: 0,
    load: function () {
        ajax.user.List(model.currentPage, model.limit, 'Memeber').done(function (data) {
            model.users = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    ShowUpdateUserInfo: function (user) {
        model.CurrentUser = user;
        $("#Update_User_modal").modal('show');
    },
    UpdateUserInfo: function () {
        ajax.manager.update(model.buildingDetails.$model).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', data.msg, 'success');
                model.getBuilding(model.building.ID);
                $('#buildingDetailsDialog').modal('hide');
            } else {
                rootVm.$alert('提示', '楼宇名称已存在', 'info');
                $('#buildingDetailsDialog').modal('hide');
            }
        }).fail(function () {
            rootVm.$alert('提示', '操作失败！！', 'error');
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
    }

});
avalon.scan();
model.load();
avalon.vmodels.page.content = "user";


