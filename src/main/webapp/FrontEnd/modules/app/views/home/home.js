var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');
var tmpl = __inline('./home.tmpl');
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

