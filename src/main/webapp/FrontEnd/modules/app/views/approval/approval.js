var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./approval.tmpl');
avalon.templateCache.approval = tmpl();
var rootVm = avalon.vmodels['root'];

var model = avalon.define({
    $id: "approval",
    dataList: {},
    title: '事项列表',
    limit: 20,
    activityId: 0,
    type: 'all',
    orgList: [],
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    isadd: true,
    OrgId: 0,
    params: '',
    param: '',
    OrgName: '',
    currentObj: {
        ID: 0,
        Name: '',
        Organ: 0,
        eventid: ''
    },
    load: function () {
        ajax.approval.List(model.currentPage, model.limit, model.OrgId, '').done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    $init: function () {
    },
    Search: function () {
        model.currentPage = 1;

        ajax.approval.List(model.currentPage, model.limit, model.OrgId, model.params).done(function (data) {
            model.dataList = data.items;
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

    ShowAdd: function () {
        model.currentObj.ID = 0;
        model.currentObj.Name = '';
        model.currentObj.Organ = 0;
        model.currentObj.eventid = '';
        model.isadd = true;
        $("#Add_modal").modal('show');
    },
    ShowUpdate: function (obj) {
        model.currentObj.ID = obj.ID;
        model.currentObj.Name = obj.Name;
        model.currentObj.Organ = 0;
        model.currentObj.eventid = obj.eventid;
        model.isadd = false;
        $("#Add_modal").modal('show');
    },
    Save: function () {
        if ($.trim(model.currentObj.Name) == '') {
            rootVm.$alert('提示', '名称不能为空', 'error');
            return;
        }
        ajax.approval.save(model.currentObj.$model).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '保存成功', 'success');
                model.load();
                $("#Add_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    ShowDelete: function (obj) {
        model.currentObj.ID = obj.ID;
        $("#Delete_modal").modal('show');
    },
    Delete: function () {
        ajax.approval.Del(model.currentObj.ID).done(function (data) {
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
exports.setOrgId = function (OrgId, OrgName) {
    model.OrgId = 0;
    model.OrgName = '全部';
    model.load();
    model.$init();
    avalon.vmodels.page.content = "approval";
}
