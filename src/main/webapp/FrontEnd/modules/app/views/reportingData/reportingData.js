var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./reportingData.tmpl');
avalon.templateCache.reportingData = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "reportingData",
    limit: 20,
    total: '',
    title: '月度福保处理（员工单位）',
    employeeId: '',
    employeeName: '',
    idNumber: '',
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    dataList: [],
    isAdd: true,
    CurrentObj: { ID: '', ReportingMonth: '', FundsBase: '', ServicePayment: '', EmployeeId: '', IsHandled: '', ReportingResult: '', ReportingResultDetail: ''},
    load: function () {
        ajax.reportingData.List(model.currentPage, model.limit, model.employeeId).done(function (data) {
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
        model.CurrentObj.ReportingMonth = '';
        model.CurrentObj.FundsBase = '';
        model.CurrentObj.ServicePayment = '';
        model.CurrentObj.EmployeeId = model.employeeId;
        model.CurrentObj.IsHandled = '未申报';
        model.CurrentObj.ReportingResult = '无';
        model.CurrentObj.ReportingResultDetail = '无';
        model.isAdd = true;
        $('#Add_modal').modal('show');
    },
    //初始化数据
    ShowUpdate: function (obj) {
        //model.CurrentObj = obj.$model;
    	model.CurrentObj.ID = obj.ID;
        model.CurrentObj.ReportingMonth = obj.reportingMonth;
        model.CurrentObj.FundsBase = obj.fundsBase;
        model.CurrentObj.ServicePayment = obj.servicePayment;
        model.CurrentObj.EmployeeId = model.employeeId;
        model.CurrentObj.IsHandled = obj.isHandled;
        model.CurrentObj.ReportingResult = obj.reportingResult;
        model.CurrentObj.ReportingResultDetail = obj.reportingResultDetail;
        model.isAdd = false; 
        $('#Add_modal').modal('show');
    },
    Save: function () {
        if ($.trim(model.CurrentObj.ReportingMonth) == '') {
            rootVm.$alert('提示', '申报月份不能为空', 'error');
            return;
        }
        if ($.trim(model.CurrentObj.FundsBase) == '') {
            rootVm.$alert('提示', '社保公积金基数不能为空', 'error');
            return;
        }
        if ($.trim(model.CurrentObj.ServicePayment) == '') {
            rootVm.$alert('提示', '服务费不能为空', 'error');
            return;
        }

        ajax.reportingData.save(model.CurrentObj.$model).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '保存成功', 'success');
                model.load();
                $("#Add_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    doReport:function(id) {
    	ajax.reportingData.doReport(id).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '申报成功', 'success');
                model.load();
                $("#Add_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    getReportResult:function(id) {
    	ajax.reportingData.getReportResult(id).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '已获取回盘结果', 'success');
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
        ajax.reportingData.Del(model.CurrentObj.ID).done(function (data) {
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
exports.setEmployeeInfo = function (employeeId, employeeName, idNumber) {
    model.employeeId = employeeId
    model.employeeName = employeeName;
    model.idNumber = idNumber;
}

avalon.vmodels.page.content = "reportingData";