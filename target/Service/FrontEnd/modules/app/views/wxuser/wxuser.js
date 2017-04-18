var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./wxuser.tmpl');
avalon.templateCache.wxuser = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "wxuser",
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    taskid:0,
    CurrentUser: '',
    users: [],
    pageList: 0,
    load: function () {
        ajax.wxuser.List(model.currentPage, model.limit, model.taskid).done(function (data) {
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
    }

});
avalon.scan();
avalon.vmodels.page.content = "wxuser";


exports.setTaskId = function (taskid) {
    model.taskid = taskid;
    model.load();
    avalon.vmodels.page.content = "wxuser";
}


