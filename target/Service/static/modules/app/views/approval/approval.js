define('app/views/approval/approval', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="approval">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        [{{OrgName}}] {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="ShowAdd">\r\n            <i class="icon-plus">\r\n            </i>新增事项\r\n          </a>\r\n          <input type="text" ms-duplex="params" style="margin-bottom: 0px;margin-left:30px" placeholder="事项名称"/>\r\n          <a class="btn blue" ms-click="Search()" style="margin-left:5px">\r\n            <i class="icon-search">\r\n            </i>查询\r\n          </a>\r\n        </div>\r\n      </div>\r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th style="width:50px">\r\n              序号\r\n            </th>\r\n            <th>\r\n              名称\r\n            </th>\r\n            <th>\r\n              事项ID\r\n            </th>\r\n             <th>\r\n               所属机构\r\n             </th>\r\n            <th style="width:150px">\r\n              创建时间\r\n            </th>\r\n            <th>\r\n              管理\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList" style="max-height:100px;">\r\n            <td style="max-width:200px;">\r\n              {{$index+1}}\r\n             \r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.Name}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.eventid}}\r\n            </td>\r\n             <td style="max-width:200px;">\r\n                          {{obj.orglist}}\r\n               </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.CreateTime  | date("yyyy-MM-dd:HH:mm:ss")}}\r\n            </td>\r\n            <td>\r\n              <a class="btn mini green" ms-href="#!/temp/{{obj.ID}}/{{obj.Name}}/{{OrgId}}/{{OrgName}}/0">\r\n                查看填表范例模板\r\n              </a>\r\n              <!--a class="btn mini purple" ms-href="#!/guide/{{obj.ID}}/{{obj.Name}}/{{OrgId}}/{{OrgName}}/0">\r\n                查看办事指南\r\n              </a-->\r\n              <a class="btn mini blue" href="javascript:void(0)" ms-click="ShowUpdate(obj)">\r\n                修改\r\n              </a>\r\n              <a class="btn mini red" href="javascript:void(0)" ms-click="ShowDelete(obj)">\r\n                删除\r\n              </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n \r\n  <!--修改新闻-->\r\n  <div id="Add_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        {{isadd==true?\'新增事项\':\'修改事项\'}}\r\n      </h3>\r\n    </div>\r\n\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="GroupFrom"  class="form-horizontal">\r\n          <div class="alert alert-error hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            请按照规则填写以下信息\r\n          </div>\r\n          <div class="alert alert-success hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            信息已通过验证，正在提交...\r\n          </div>\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span12">\r\n                <div class="control-group">\r\n                  <label class="control-label" for="Name">\r\n                    事项名称:<span class="required">*</span>\r\n                  </label>\r\n                  <input type="text" class="controls m-wrap span8" name="Title" placeholder="事项名称" ms-duplex="currentObj.Name" />\r\n                </div>\r\n            </div>\r\n            </div>\r\n            <div class="row-fluid">\r\n              <div class="span12">\r\n                <div class="control-group">\r\n                  <label class="control-label" for="Name">\r\n                    事项ID:<span class="required">*</span>\r\n                  </label>\r\n                  <input type="text" class="controls m-wrap span8" name="Title" placeholder="事项ID" ms-duplex="currentObj.eventid" />\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n\r\n      </div>\r\n    </div>\r\n \r\n    <div class="modal-footer">\r\n\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Save()">保存</button>\r\n    </div>\r\n\r\n\r\n  </div>\r\n  <!--删除组织机构窗口-->\r\n  <div id="Delete_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\r\n      <h3 id="deleteDialogLabel">删除</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要删除吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Delete()">确定</button>\r\n    </div>\r\n\r\n  </div>\r\n\r\n\r\n</div>\r\n';
}
return __p;
};
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
 
});