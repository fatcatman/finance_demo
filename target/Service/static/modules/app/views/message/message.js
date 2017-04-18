define('app/views/message/message', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="message">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n  \r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th>\r\n              姓名\r\n            </th>\r\n            <th>\r\n              性别\r\n            </th>\r\n            <th>\r\n              QQ\r\n            </th>\r\n             <th>\r\n              邮箱\r\n            </th>\r\n             <th>\r\n              电话\r\n            </th>\r\n             <th>\r\n              留言内容\r\n            </th>\r\n            <th>\r\n              管理\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList " style="max-height:100px;">\r\n            <td style="max-width:200px;">\r\n              {{obj.Name}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.Sex}}\r\n            </td>\r\n             <td style="max-width:200px;">\r\n              {{obj.QQ}}\r\n            </td>\r\n               <td style="max-width:200px;">\r\n              {{obj.Email}}\r\n            </td>\r\n           <td style="max-width:200px;">\r\n              {{obj.Phone}}\r\n            </td>\r\n       <td style="max-width:200px;">\r\n              {{obj.Text}}\r\n            </td>\r\n            <td>\r\n              <a class="btn mini blue" href="javascript:void(0)" ms-click="ShowDelete(obj)">\r\n                删除\r\n              </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <!--新增和修改-->\r\n  <div id="Add_Manager_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        新增管理员\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="BookFrom"  class="form-horizontal">\r\n            <div class="alert alert-error hide">\r\n\t\t\t\t      <button class="close" data-dismiss="alert"></button>\r\n                请按照规则填写以下信息\r\n\t\t\t      </div>\r\n\t\t\t      <div class="alert alert-success hide">\r\n\t\t\t\t        <button class="close" data-dismiss="alert"></button>\r\n\t\t\t\t        信息已通过验证，正在提交...\r\n\t\t\t      </div>\r\n            <div class="row-fluid">\r\n              <div class="row-fluid">\r\n                <div class="span6 ">\r\n                  <div class="control-group">\r\n                    <label class="control-label  span3" for="Name">\r\n                      账号:<span class="required">*</span>\r\n                    </label>\r\n                    <div class="controls  span9">\r\n                      <input type="text" name="Account" class="m-wrap span11" placeholder="请输入账号" ms-duplex="currentManager.Account" />\r\n                      <span class="help-block"></span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class="span6 ">\r\n                  <div class="control-group">\r\n                    <label class="control-label span3" for="NumOfPeriod">密码:</label>\r\n                    <div class="controls span9">\r\n                      <input type="password" name="Pwd" class="m-wrap span11" placeholder="请输入密码"  ms-duplex="currentManager.Pwd" />\r\n                      <span class="help-block"></span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class="row-fluid">\r\n                <div class="span6 ">\r\n                  <div class="control-group">\r\n                    <label class="control-label  span3" for="Name">\r\n                      角色:<span class="required">*</span>\r\n                    </label>\r\n                    <div class="controls  span9">\r\n                      <select ms-duplex="currentManager.role">\r\n                        <option value="1">系统管理员</option>\r\n                      </select>\r\n                      <span class="help-block"></span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="Save()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <!--修改密码-->\r\n  <div id="UpdatePwd_Manager_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        修改管理员密码\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="BookFrom"  class="form-horizontal">\r\n          <div class="alert alert-error hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            请按照规则填写以下信息\r\n          </div>\r\n          <div class="alert alert-success hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            信息已通过验证，正在提交...\r\n          </div>\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="Name">\r\n                    新密码:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <input type="text" name="newPwd" class="m-wrap span11" placeholder="请输入新密码" ms-duplex="currentManager.Pwd" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="UpdatePwd()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <!--删除组织机构窗口-->\r\n  <div id="Delete_Manager_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\r\n      <h3 id="deleteDialogLabel">删除管</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要删除吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Delete()">确定</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.message = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "message",
    dataList: {},
    title: '留言板',
    limit: 20,
    activityId: 0,
    type: 'all',
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    currentManager: {
        ID: 0,
        Account: '',
        Pwd: '',
        role: 0,
        cppoint: ''
    },
    load: function () {
        ajax.message.List(model.currentPage, model.limit, model.activityId, model.type).done(function (data) {
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
    ShowAdd: function () {
        model.currentManager.ID = '0';
        model.currentManager.Account = '';
        model.currentManager.Pwd = '';
        model.currentManager.role = '1';
        $("#Add_Manager_modal").modal('show');
    },
    Save: function () {
        if (model.currentManager.Account == '') {
            rootVm.$alert('提示', '账号不能为空', 'error');
            return;
        }
        if (model.currentManager.Pwd == '') {
            rootVm.$alert('提示', '密码不能为空', 'error');
            return;
        }
        if (model.currentManager.Pwd.length < 6) {
            rootVm.$alert('提示', '密码长度不能小于6位', 'error');
            return;
        }
        ajax.manager.save(model.currentManager.$model).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '保存成功', 'success');
                model.load();
                $("#Add_Manager_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    ShowDelete : function(obj){
        model.currentManager = obj.$model;
        $("#Delete_Manager_modal").modal('show');
    },
    Delete:function(){
        ajax.message.del(model.currentManager.ID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '删除成功', 'success');
                model.load();
                $("#Delete_Manager_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    ShowUpdatePwd: function (obj) {
        model.currentManager = obj.$model;
        model.currentManager.Pwd = '';
        $("#UpdatePwd_Manager_modal").modal('show');
    },
    UpdatePwd: function () {
        if (model.currentManager.Pwd == '') {
            rootVm.$alert('提示', '密码不能为空', 'error');
            return;
        }
        if (model.currentManager.Pwd.length < 6) {
            rootVm.$alert('提示', '密码长度不能小于6位', 'error');
            return;
        }
        ajax.manager.UpdatePwd(model.currentManager.ID, model.currentManager.Pwd).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '修改成功', 'success');
                model.load();
                $("#UpdatePwd_Manager_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    }
});
avalon.scan();
model.load();
model.$init();
avalon.vmodels.page.content = "message";

exports.getBooks = function () {
    model.load();
    model.$init();
    avalon.vmodels.page.content = "message";
}
 
});