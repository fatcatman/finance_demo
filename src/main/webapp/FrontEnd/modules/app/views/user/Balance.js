var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./Balance.tmpl');
avalon.templateCache.Balance = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "Balance",
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    userid: '',
    users: [],
    pageList: 0,
    load: function () {
        ajax.Balance.List(model.currentPage, model.limit, model.userid).done(function (data) {
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
exports.setUserId = function (userid) {
    model.userid = userid;
    model.page = 1;
    model.load();
    avalon.vmodels.page.content = "Balance";
}


