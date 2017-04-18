var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./employee.tmpl');
avalon.templateCache.employee = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "employee",
    limit: 20,
    total: '',
    title: '员工信息列表',
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    dataList: [],
    isAdd: true,
    CurrentObj: { ID: '', Name: '', IdNumber: '', CompanyName: '', BusinessType: '' },
    load: function () {
        ajax.employee.List(model.currentPage, model.limit).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.total = data.total;
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
        model.CurrentObj.ID = 0;
        model.CurrentObj.Name = '';
        model.CurrentObj.IdNumber = '';
        model.CurrentObj.CompanyName = '';
        model.CurrentObj.BusinessType = '代理';
        model.isAdd = true;
        $('#Add_modal').modal('show');
    },
    //初始化数据
    ShowUpdate: function (obj) {
        //model.CurrentObj = obj.$model;
    	model.CurrentObj.ID = obj.ID;
        model.CurrentObj.Name = obj.name;
        model.CurrentObj.IdNumber = obj.idNumber;
        model.CurrentObj.CompanyName = obj.companyName;
        model.CurrentObj.BusinessType = obj.businessType;
        model.isAdd = false; 
        $('#Add_modal').modal('show');
    },
    Save: function () {
        if ($.trim(model.CurrentObj.Name) == '') {
            rootVm.$alert('提示', '姓名不能为空', 'error');
            return;
        }
        if ($.trim(model.CurrentObj.IdNumber) == '') {
            rootVm.$alert('提示', '身份证号不能为空', 'error');
            return;
        }
        if ($.trim(model.CurrentObj.CompanyName) == '') {
            rootVm.$alert('提示', '单位名称不能为空', 'error');
            return;
        }
        if ($.trim(model.CurrentObj.BusinessType) == '') {
            rootVm.$alert('提示', '业务类型不能为空', 'error');
            return;
        }
        ajax.employee.save(model.CurrentObj.$model).done(function (data) {
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
    $init: function () {
        model.load();

    },
    ShowDel: function (obj) {
        model.CurrentObj = obj.$model;
        $('#Delete_modal').modal('show');
    },
    Delete: function () {
        ajax.employee.Del(model.CurrentObj.ID).done(function (data) {
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
avalon.vmodels.page.content = "employee";