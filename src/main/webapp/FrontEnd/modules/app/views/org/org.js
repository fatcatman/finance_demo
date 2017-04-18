var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./org.tmpl');
avalon.templateCache.org = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "org",
    limit: 10,
    total: '',
    title: '机构列表',
    groupId: 0,
    groupName: '',
    currentPage: 1,
    pageCount: 0,
    OrgcurrentPage: 1,
    OrgpageCount: 0,
    pageList: 0,
    allorgList: [],
    dataList: [],
    currentName: '',
    unclickList: [],
    isAdd: true,
    CurrentObj: { ID: '', groupId: '' },
    load: function () {
        ajax.org.List(model.currentPage, model.limit, model.groupId).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.total = data.total;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
        model.loadunclickList();
    },
    loadunclickList: function () {
        ajax.org.AllNotList(model.OrgcurrentPage, model.limit, model.groupId).done(function (data) {
            model.unclickList = data.items;
            model.OrgcurrentPage = data.page;
            model.OrgpageCount = data.totalPage;
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
    OrgPreviouPage: function () {
        if (model.OrgcurrentPage == 1) {
            rootVm.$alert('提示', '已经是第一页了', 'error');
        } else {
            model.OrgcurrentPage--;
            model.loadunclickList();
        }
    },
    OrgNextPage: function () {
        if (model.OrgcurrentPage == model.OrgpageCount) {
            rootVm.$alert('提示', '已经是最后一页了', 'error');
        } else {
            model.OrgcurrentPage++;
            model.loadunclickList();
        }
    },
    ShowAdd: function () {
        model.CurrentObj.ID = 0;
        model.CurrentObj.groupId = model.groupId;
        model.isAdd = true;
        $('#Add_modal').modal('show');
    },
    Setclick: function (obj) {
        rootVm.$alert('提示', '选择[' + obj.Name + ']成功', 'info');
        model.CurrentObj.ID = obj.ID;
        model.currentName = obj.Name;
    },
    Save: function () {
        if (model.CurrentObj.ID == 0) {
            rootVm.$alert('提示', '请选择机构', 'error');
            return;
        }
        ajax.org.saveGroup(model.CurrentObj.$model).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '保存成功', 'success');
                model.load();
                model.CurrentObj.ID = 0;
                model.currentName = '';
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
    ShowDel: function (obj) {
        model.CurrentObj.ID = obj.ID;
        $('#Delete_modal').modal('show');
    },
    Delete: function () {
        ajax.org.delgroup(model.CurrentObj.ID, model.groupId).done(function (data) {
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
exports.setGroupId = function (groupId, groupName) {
    model.groupId = groupId
    model.groupName = groupName;
    model.load();
    model.$init();
    avalon.vmodels.page.content = "org";
}
