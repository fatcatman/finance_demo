define('app/views/userCenter/userCenter', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid row-fluid profile" ms-controller="userCenter">\r\n  <div class="tabbable tabbable-custom tabbable-full-width">\r\n    <ul class="nav nav-tabs">\r\n      <li class="active">\r\n        <a href="#personalinfo" data-toggle="tab">个人信息</a>\r\n      </li>\r\n      <li>\r\n        <a href="#changeinfo" data-toggle="tab">编辑信息</a>\r\n      </li>\r\n    </ul>\r\n    <div class="tab-content">\r\n      <!--个人信息页面-->\r\n      <div class="tab-pane row-fluid profile-classic active" id="personalinfo">\r\n        <h2>{{user.Name}}</h2>\r\n        <div class="row-fluid" style="margin-bottom:20px;">\r\n          <ul class="unstyled span5">\r\n            <li>\r\n              <span>账号：</span>{{user.Account}}\r\n            </li>\r\n            <li>\r\n              <span>密码：</span>********\r\n            </li>\r\n            <li>\r\n              <span>角色：</span>{{user.role.Des}}\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n      <!--个人信息页面结束-->\r\n      <!--修改个人信息页面-->\r\n      <div class="tab-pane row-fluid profile-account" id="changeinfo">\r\n        <div class="row-fluid">\r\n          <div class="span12">\r\n            <div class="span2">\r\n              <ul class="ver-inline-menu tabbable margin-bottom-10">\r\n \r\n                <li class="">\r\n                  <a href="#tab_2-2" data-toggle="tab">\r\n                    <i class="icon-lock"></i>修改密码\r\n                  </a>\r\n                </li>\r\n              </ul>\r\n            </div>\r\n            <div class="span7">\r\n\r\n\r\n                <div id="tab_2-2" class="tab-pane">\r\n                  <div style="height: auto;" id="accordion2-2" class="accordion in collapse">\r\n                    <form>\r\n                      <label class="control-label">当前密码：</label>\r\n                      <input type="password" placeholder="请输入您当前正在使用的密码" class="m-wrap span8" ms-duplex=\'oldpwd\' />\r\n                      <label class="control-label">新密码：</label>\r\n                      <input type="password" placeholder="请输入您的新密码" class="m-wrap span8" ms-duplex=\'newpwd\' />\r\n                      <label class="control-label">确认密码：</label>\r\n                      <input type="password" placeholder="请再次输入您的新密码" class="m-wrap span8" ms-duplex=\'renewpwd\' />\r\n                      <div class="submit-btn">\r\n                        <a href="javascript:;" class="btn green" ms-click="changepwd()">保存修改</a>\r\n                        <a href="javascript:;" class="btn" ms-click="resetpwd()">重置</a>\r\n                      </div>\r\n                    </form>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <!--修改个人信息页面结束-->\r\n      \r\n    </div>\r\n  </div>';
}
return __p;
};
avalon.templateCache.userCenter = tmpl();

var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "userCenter",
    oldpwd: '',
    newpwd: '',
    renewpwd: '',
    user: {
        ID: 0, Phone: '', Account: '', Des: '', role: '', cppoint: '',Pwd:''
    },
    edituser: {
        ID: 0, Phone: '', Account: '', Des: '', role: '', cppoint: '',Pwd:''
    },
    load: function () {
        ajax.manager.getcurrentuser().done(function (data) {
            if (data != false && data != null) {
                model.user = data;
                model.edituser = data;
            }
        });
    },
    update: function () {
        ajax.manager.update(model.edituser.$model).done(function (data) {
            if (data != null && data != false) {
                if (data.success) {
                    rootVm.$alert('提示', '修改成功', 'success');
                } else {
                    rootVm.$alert('提示', data.msg, 'info');
                }
            } else {
                rootVm.$alert('提示', '修改失败', 'error');
            }
        });
    },
    reset: function () {
        model.edituser = model.user;
    },
    // 修改密码
    changepwd: function () {
        if (model.oldpwd == '' || model.newpwd == '' || model.renewpwd == '') {
            rootVm.$alert('提示', '请正确填写信息', 'warning');
        } else {
            if (model.newpwd == model.renewpwd) {
                ajax.manager.changepwd(model.oldpwd, model.newpwd).done(function (data) {
                    if (data != null && data != false) {
                        if (data.success) {
                            rootVm.$alert('提示', '修改成功', 'success');
                        } else {
                            rootVm.$alert('提示', data.msg, 'info');
                        }
                    } else {
                        rootVm.$alert('提示', '修改失败', 'error');
                    }
                });
            } else {
                rootVm.$alert('提示', '两次输入的新密码不一致', 'warning');
            }
        }
    },
    resetpwd: function () {
        model.oldpwd = '';
        model.newpwd = '';
        model.renewpwd = '';
    },
});

model.load();

avalon.scan();
avalon.vmodels.page.content = "userCenter"; 
});