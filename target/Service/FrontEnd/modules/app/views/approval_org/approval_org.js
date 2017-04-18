var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./approval_org.tmpl');
avalon.templateCache.approval_org = tmpl();
var rootVm = avalon.vmodels['root'];

var model = avalon.define({
    $id: "approval_org",
    dataList: {},
    appdataList: {},
    title: '事项列表',
    limit: 20,
    activityId: 0,
    type: 'all',
    allList: [],
    currentPage: 1,
    pageCount: 0,
    appcurrentPage: 1,
    apppageCount: 0,
    appparams:'',
    pageList: 0,
    isadd: true,
    OrgId: 0,
    m_Type: 0,
    GroupId: 0,
    GroupName: '',
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
        ajax.approval.ListAll(model.OrgId).done(function (data) {
            model.allList = data.items;
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
    SetApproval:function (id,name) {
        model.currentObj.ID = id;
        model.currentObj.Name = name;
        rootVm.$alert('提示', '选择了['+name+']', 'info');
    },
    Search: function () {
        model.appcurrentPage = 1;
        console.log(model.appparams);
        ajax.approval.ListAllNotIn(model.appcurrentPage, model.limit, model.OrgId, model.appparams).done(function (data) {
            model.appdataList = data.items;
            model.appcurrentPage = data.page;
            model.apppageCount = data.totalPage;
        });
    },
    appPreviouPage: function () {
        if (model.appcurrentPage == 1) {
            rootVm.$alert('提示', '已经是第一页了', 'error');
        } else {
            model.appcurrentPage--;
            model.Search();
        }
    },
    appNextPage: function () {
        if (model.appcurrentPage == model.apppageCount) {
            rootVm.$alert('提示', '已经是最后一页了', 'error');
        } else {
            model.appcurrentPage++;
            model.Search();
        }
    },
    ShowAdd: function () {
        model.currentObj.ID = 0;
        model.currentObj.Name = '未选择';
        model.currentObj.Organ = model.OrgId;
        model.currentObj.eventid = '';
        model.appparams='';
        model.isadd = true;
        model.Search();
        $("#Add_modal").modal('show');
    },
    ShowUpdate: function (obj) {
        model.currentObj.ID = obj.ID;
        model.currentObj.Name = obj.Name;
        model.currentObj.Organ = obj.Organ.ID;
        model.currentObj.eventid = obj.eventid;
        model.isadd = false;
        $("#Add_modal").modal('show');
    },
    Save: function () {
        if(model.currentObj.ID == 0)
        {
            rootVm.$alert('提示', '请选择事项', 'error');
            return false;
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
exports.setOrgId = function (OrgId, OrgName, Type, GroupId, GroupName) {
    model.OrgId = OrgId;
    model.OrgName = OrgName;
    model.m_Type = Type;
    model.GroupId = GroupId;
    model.GroupName = GroupName;
    model.load();
    model.$init();
    avalon.vmodels.page.content = "approval_org";

}
