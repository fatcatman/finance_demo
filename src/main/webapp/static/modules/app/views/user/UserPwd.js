define('app/views/user/UserPwd', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="UserPwd">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        用户密码管理\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <div class="clearfix">\r\n        <div class="clearfix">\r\n          <div class="btn-group">\r\n            <a class="btn green" ms-click="ShowAddPwd()">\r\n              <i class="icon-plus">\r\n              </i>新增密码\r\n            </a>\r\n          </div>\r\n        </div>\r\n        <table class="table table-striped table-hover table-bordered">\r\n          <thead>\r\n            <tr>\r\n              <th>\r\n                密码\r\n              </th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr class="" ms-repeat-obj="users">\r\n              <td>\r\n                {{obj.Pwd}}\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        <div class="clearfix">\r\n          <div class="btn-group">\r\n            <a class="btn green" ms-click="PreviouPage()">\r\n              <i class="icon-step-backward">\r\n              </i>上一页\r\n            </a>\r\n            <a class="btn green" ms-click="PreviouPage()">\r\n              {{currentPage}}/{{pageCount}}\r\n            </a>\r\n            <a class="btn green" ms-click="NextPage()">\r\n              <i class="icon-step-forward">\r\n              </i>下一页\r\n            </a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n     \r\n      <div class="pagination pagination-large">\r\n        <ul>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <!--新增和修改-->\r\n  <div id="Add_Pwd_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        新增密码\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="BookFrom"  class="form-horizontal">\r\n          <div class="alert alert-error hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            请按照规则填写以下信息\r\n          </div>\r\n          <div class="alert alert-success hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            信息已通过验证，正在提交...\r\n          </div>\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="Name">\r\n                    密码:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <input type="text" name="Name" class="m-wrap span11" placeholder="请填写密码" ms-duplex="Pwd" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="SavePwd()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <!--删除组织机构窗口-->\r\n  <div id="Delete_Pwd_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\r\n      <h3 id="deleteDialogLabel">删除密码</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要删除选中密码吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Delete()">确定</button>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.UserPwd = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "UserPwd",
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    ID:0,
    userid: '',
    Pwd: '',
    users: [],
    pageList: 0,
    load: function () {
        ajax.UserPwd.List(model.currentPage, model.limit, model.userid).done(function (data) {
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
    },
    ShowAddPwd: function () {
        $("#Add_Pwd_modal").modal('show');
    },
    SavePwd: function () {
        if (model.Pwd == '') {
            rootVm.$alert('提示', '密码不能为空', 'error');
            return;
        }
        if (model.Pwd.length <6||model.Pwd.length >16) {
            rootVm.$alert('提示', '密码长度应该在6-16位之间', 'error');
            return;
        }
        ajax.UserPwd.Save(model.Pwd, model.userid).done(function (data) {
            if (data.success) {
                model.load();
                rootVm.$alert('提示', data.msg, 'success');
                $("#Add_Pwd_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    ShowDelete: function (obj) {
        model.ID = obj.ID;
        $("#Delete_Pwd_modal").modal('show');
    },
    Delete: function () {
        ajax.UserPwd.del(model.ID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', data.msg, 'success');
                $("#Delete_Pwd_modal").modal('hide');
                model.load();
            } else {
                rootVm.$alert('提示', data.msg, 'success');
            }
        });
    },

});
avalon.scan();
exports.setUserId = function (userid) {
    model.userid = userid;
    model.page = 1;
    model.load();
    avalon.vmodels.page.content = "UserPwd";
}


 
});