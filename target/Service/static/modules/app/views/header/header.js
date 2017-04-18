define('app/views/header/header', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="nav-progress"></div>\r\n<div class="container-fluid" ms-controller="header">\r\n  <!-- BEGIN LOGO -->\r\n  <a class="brand" href="#">\r\n    <img src="'+
((__t=( '/Service/static/lib/image/logo-index.png'))==null?'':__t)+
'" alt="logo"/>\r\n  </a>\r\n  <!-- END LOGO -->\r\n  <!-- BEGIN RESPONSIVE MENU TOGGLER -->\r\n  <a href="javascript:;" class="btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">\r\n    <img src="'+
((__t=( '/Service/static/lib/image/menu-toggler.png'))==null?'':__t)+
'" alt="" />\r\n  </a>\r\n  <!-- END RESPONSIVE MENU TOGGLER -->\r\n  <!-- BEGIN TOP NAVIGATION MENU -->\r\n  <ul class="nav pull-right">\r\n    <!-- BEGIN NOTIFICATION DROPDOWN -->\r\n    <!-- END NOTIFICATION DROPDOWN -->\r\n    <!-- BEGIN USER LOGIN DROPDOWN -->\r\n    <li class="dropdown user">\r\n      <a href="javascript:;" ms-click="logout">\r\n        <i class="icon-key"></i> 退出登录\r\n      </a>\r\n    </li>\r\n    <!-- END USER LOGIN DROPDOWN -->\r\n  </ul>\r\n  <!-- END TOP NAVIGATION MENU -->\r\n</div>';
}
return __p;
};
avalon.templateCache.header = tmpl();
var ajax = require('app/services/ajaxService');
var model = avalon.define({
    $id: "header",
    plans: [],
    user: {},
    getCurrentUser: function () {
        ajax.manager.getcurrentuser().done(function (data) {
            model.user = data;
        });
    },
    logout: function () {
        location.href = "/Service/Manager/Login.jsp";
    }
});
avalon.scan();
model.getCurrentUser();
avalon.vmodels.root.header = "header"; 
});