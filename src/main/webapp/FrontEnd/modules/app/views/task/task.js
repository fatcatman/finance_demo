var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./task.tmpl');
avalon.templateCache.task = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "task",
    dataList: {},
    title: '任务管理',
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    BrandID: '', //关联品牌ID
    Name: '', //Title
    detail: '', //规则rule
    reward: '', //奖惩reward
    UserNum: '',
    ID: 0,
    isAdd: true,
    load: function () {
        ajax.task.List(model.limit, model.currentPage).done(function (data) {
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
    ShowUpdate: function (obj) {
        model.Name = obj.Title;
        model.detail = obj.details;
        model.reward = obj.author;
        model.ID = obj.ID;
        model.BrandId = obj.product.ID;
        model.isAdd = false;
        $("#Add_Book_modal").modal('show');
    },
    ShowDelete: function (obj) {
        model.Name = obj.Name;
        model.ID = obj.ID;
        $("#Delete_Organization_modal").modal('show');
    },
    Delete: function () {
        ajax.task.del(model.ID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', data.msg, 'success');
                $("#Delete_Organization_modal").modal('hide');
                model.load();
            } else {
                rootVm.$alert('提示', data.msg, 'success');
            }
        });
    },
    Savetask: function () {
        if ($.trim(model.Name) == '') {
            rootVm.$alert('提示', '名称不能为空', 'error');
            //$("#Add_Book_modal").modal('hide');
            return;
        }
        if ($.trim(model.detail) == '') {
            rootVm.$alert('提示', '规则不能为空', 'error');
            //$("#Add_Book_modal").modal('hide');
            return;
        }
        if ($.trim(model.reward) == '') {
            rootVm.$alert('提示', '奖惩不能为空', 'error');
            // $("#Add_Book_modal").modal('hide');
            return;
        }
        if ($.trim(model.UserNum) == '') {
            rootVm.$alert('提示', '需要邀请人数不能为空', 'error');
            return;
        }
        if (isNaN(model.UserNum)) {
            rootVm.$alert('提示', '需要邀请人数必须为一个数字', 'error');
            return;
        }
        ajax.task.save(model.ID, model.BrandId, model.Name, model.detail, model.reward, model.UserNum).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', data.msg, 'success');
                $("#Add_Book_modal").modal('hide');
                model.load();
            } else {
                rootVm.$alert('提示', data.msg, 'success');
            }
        });
    }
});
avalon.scan();
model.load();
model.$init();
avalon.vmodels.page.content = "task";

exports.getBooks = function () {
    model.load();
    model.$init();
    avalon.vmodels.page.content = "task";
}
