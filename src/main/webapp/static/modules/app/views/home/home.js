define('app/views/home/home', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');
var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div ms-controller="home">\r\n  <div class="row-fluid" style="text-align: center;" >\r\n    <img src="'+
((__t=( '/Service/static/lib/image/logo-index-home.png'))==null?'':__t)+
'" alt="logo"/>\r\n    </div>\r\n</div>';
}
return __p;
};
avalon.templateCache.home = tmpl();
var rootVm = avalon.vmodels['root'];
var date = new Date();
var model = avalon.define({
    $id: "home"
   
});
avalon.scan();
avalon.vmodels.page.content = "home";
exports.reload = function () {
    avalon.vmodels.page.content = "home";
}

 
});