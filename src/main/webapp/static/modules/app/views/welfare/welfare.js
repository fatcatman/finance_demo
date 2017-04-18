define('app/views/welfare/welfare', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="welfare">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <input type="text" ms-duplex="employeeName" style="margin-bottom: 0px;margin-left:50px" placeholder="员工姓名"/>\r\n          <input type="text" ms-duplex="idNumber" style="margin-bottom: 0px;margin-left:50px" placeholder="员工身份证号"/>\r\n          <input type="text" ms-duplex="reportingMonth" style="margin-bottom: 0px;margin-left:50px" placeholder="申报月份"/>\r\n          <select ms-duplex="isHandled" style="margin-bottom: 0px;margin-left:50px">\r\n              <option ms-value="未申报">未申报</option>\r\n              <option ms-value="已申报">已申报</option>\r\n          </select>\r\n          <a class="btn blue" ms-click="Search()" style="margin-left:5px">\r\n            <i class="icon-search">\r\n            </i>查询\r\n          </a>\r\n        </div>\r\n        <div class="btn-group">\r\n          <a class="btn red" ms-click="excelDownload()"">\r\n            <i class="icon-download">\r\n            </i>Excel文件下载\r\n          </a>\r\n        </div>\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="doReport()">\r\n            </i>月度福保申报\r\n          </a>\r\n        </div>\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="getReportResult()">\r\n            </i>回盘数据接收\r\n          </a>\r\n        </div>\r\n      </div>\r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th style="width:50px">\r\n              序号\r\n            </th>\r\n            <th>\r\n              姓名\r\n            </th>\r\n            <th>\r\n              身份证号\r\n            </th>\r\n            <th>\r\n              申报月份\r\n            </th>\r\n            <th>\r\n              社保<br/>公积金基数\r\n            </th>\r\n            <th>\r\n              服务费\r\n            </th>\r\n            <th>\r\n              申报状态\r\n            </th>\r\n            <th>\r\n              回盘结果\r\n            </th>\r\n            <th>\r\n              回盘结果详细\r\n            </th>\r\n            <th style="width:150px">\r\n              创建时间\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList " style="max-height:600px;">\r\n            <td >\r\n              {{$index+1}}\r\n            </td>\r\n            <td style="max-width:65px;">\r\n              {{obj.employee.name}}\r\n            </td>\r\n            <td style="max-width:130px;">\r\n              {{obj.employee.idNumber}}\r\n            </td>\r\n            <td style="max-width:50px;">\r\n              {{obj.reportingMonth}}\r\n            </td>\r\n            <td style="max-width:50px;">\r\n              {{obj.fundsBase}}\r\n            </td>\r\n            <td style="max-width:20px;">\r\n              {{obj.servicePayment}}\r\n            </td>\r\n            <td style="max-width:20px;">\r\n              {{obj.isHandled}}\r\n            </td>\r\n            <td style="max-width:20px;">\r\n              {{obj.reportingResult}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.reportingResultDetail}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.createTime  | date("yyyy-MM-dd:HH:mm:ss")}}\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    \r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <!--新增和修改-->\r\n  <div id="Add_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        {{isAdd==true?\'新增月度福保数据\':\'修改月度福保数据\'}}\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="BookFrom"  class="form-horizontal">\r\n          <div class="alert alert-error hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            请按照规则填写以下信息\r\n          </div>\r\n          <div class="alert alert-success hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            信息已通过验证，正在提交...\r\n          </div>\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="ReportingMonth">\r\n                    申报月份:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <input type="text" name="ReportingMonth" class="m-wrap span11" placeholder="申报月份" ms-duplex="CurrentObj.ReportingMonth" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="FundsBase">\r\n                    社保公积金基数:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <input type="text" name="FundsBase" class="m-wrap span11" placeholder="社保公积金基数" ms-duplex="CurrentObj.FundsBase" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class="row-fluid">\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="ServicePayment">\r\n                    服务费:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <input type="text" name="ServicePayment" class="m-wrap span11" placeholder="服务费" ms-duplex="CurrentObj.ServicePayment" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="Save()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <!--删除组织机构窗口-->\r\n  <div id="Delete_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\r\n      <h3 id="deleteDialogLabel">删除</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要删除吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Delete()">确定</button>\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <!--文件上传窗口-->\r\n  <div id="uploadDialog" class="modal modal-large hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\r\n      <h3 id="deleteDialogLabel">上传文件(文件大小不要超过5M)</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n\r\n      <div class="row-fluid">\r\n        <div class="span12">\r\n          <div class="control-group">\r\n            <label class="control-label " for="Name">\r\n              图片链接:<span class="required">*</span>\r\n            </label>\r\n            <div class="controls">\r\n              <input type="text" name="Name" class="m-wrap span12" placeholder="请填写图片链接" ms-duplex="CurrentObj.Link" />\r\n              <span class="help-block"></span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="row-fluid">\r\n        <div class="span12 ">\r\n          <div class="control-group">\r\n            <label class="control-label " for="Name">\r\n              图片文件【宽与高比例为2:1】:<span class="required">*</span>\r\n            </label>\r\n            <div class="controls">\r\n              <input id="file_upload" name="file_upload" type="file" multiple="true"/>\r\n              <span class="help-block"></span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="ImgUpload()">上传</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.welfare = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "welfare",
    limit: 20,
    total: '',
    title: '月度福保处理（全员）',
    employeeId: '',
    employeeName: '',
    idNumber: '',
    isHandled: '',
    reportingMonth: '',
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    dataList: [],
    isAdd: true,
    CurrentObj: { ID: '', ReportingMonth: '', FundsBase: '', ServicePayment: '', EmployeeId: '', IsHandled: '', ReportingResult: '', ReportingResultDetail: ''},
    load: function () {
        ajax.welfare.List(model.currentPage, model.limit, '', '', '', '未申报').done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.total = data.total;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    Search: function () {
        model.currentPage = 1;

        ajax.welfare.List(model.currentPage, model.limit, model.employeeName, model.idNumber, model.reportingMonth, model.isHandled).done(function (data) {
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

        ajax.welfare.save(model.CurrentObj.$model).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '保存成功', 'success');
                model.load();
                $("#Add_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    doReport:function() {
		if ($.trim(model.reportingMonth) == '') {
            rootVm.$alert('提示', '申报月份不能为空', 'error');
            return;
        }
		
    	ajax.welfare.doReport(model.employeeName, model.idNumber, model.reportingMonth, model.isHandled).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '月份[' + model.reportingMonth + ']的数据已申报成功', 'success');
                model.Search();
                $("#Add_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    getReportResult:function() {
    	if ($.trim(model.reportingMonth) == '') {
            rootVm.$alert('提示', '申报月份不能为空', 'error');
            return;
        }
		
    	ajax.welfare.getReportResult(model.employeeName, model.idNumber, model.reportingMonth, model.isHandled).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '月份[' + model.reportingMonth + ']的回盘结果已获取成功', 'success');
                model.Search();
                $("#Add_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    excelDownload:function() {
    	var timenow = new Date().getTime();
    	var excelDownloadURL = '/Service/Welfare/ExcelDownload.do?employeeName=' + model.employeeName;
    	
    	excelDownloadURL  = excelDownloadURL + '&idNumber=' + model.idNumber;
    	excelDownloadURL  = excelDownloadURL + '&reportingMonth=' + model.reportingMonth;
    	excelDownloadURL  = excelDownloadURL + '&isHandled=' + model.isHandled;
    	excelDownloadURL  = excelDownloadURL + '&timeStamp=' + timenow;
    	
    	location.href=excelDownloadURL;
    },
    //初始化数据
    $init: function () {
        model.load();
    	model.employeeName='';
    	model.idNumber='';
    	model.reportingMonth='';
    	model.isHandled='未申报';
    },
    ShowDel: function (obj) {
        model.CurrentObj = obj.$model;
        $('#Delete_modal').modal('show');
    },
    Delete: function () {
        ajax.welfare.Del(model.CurrentObj.ID).done(function (data) {
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
exports.setEmployeeInfo = function (employeeId, employeeName, idNumber, isHandled) {
    model.employeeId = employeeId
    model.employeeName = employeeName;
    model.idNumber = idNumber;
    model.isHandled = isHandled;
}

avalon.vmodels.page.content = "welfare"; 
});