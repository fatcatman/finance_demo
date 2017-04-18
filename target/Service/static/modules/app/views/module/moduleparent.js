define('app/views/module/moduleparent', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="moduleparent">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      \r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th>\r\n              页面名称\r\n            </th>\r\n            <th>\r\n              管理\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" style="max-height:100px;">\r\n            <td style="max-width:200px;">\r\n              关于我们\r\n            </td>\r\n            <td>\r\n              <a class="btn mini blue" href="#!/module/关于我们">\r\n                查看此页面模块\r\n              </a>\r\n            </td>\r\n          </tr>\r\n          \r\n            <tr class="" style="max-height:100px;">\r\n            <td style="max-width:200px;">\r\n              成员公司\r\n            </td>\r\n            <td>\r\n              <a class="btn mini blue" href="#!/module/成员公司">\r\n                查看此页面模块\r\n              </a>\r\n            </td>\r\n            </tr>\r\n              <tr class="" style="max-height:100px;">\r\n            <td style="max-width:200px;">\r\n              联系我们\r\n            </td>\r\n            <td>\r\n              <a class="btn mini blue" href="#!/module/联系我们">\r\n                查看此页面模块\r\n              </a>\r\n            </td>\r\n            \r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    \r\n    </div>\r\n\r\n  </div>\r\n\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.moduleparent = tmpl();
var rootVm = avalon.vmodels['root'];

var model = avalon.define({
    $id: "moduleparent",
    dataList: {},
    title: '页面列表',
});
avalon.vmodels.page.content = "moduleparent";

 
});