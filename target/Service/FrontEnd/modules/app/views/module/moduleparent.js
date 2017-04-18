var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./moduleparent.tmpl');
avalon.templateCache.moduleparent = tmpl();
var rootVm = avalon.vmodels['root'];

var model = avalon.define({
    $id: "moduleparent",
    dataList: {},
    title: '“≥√Ê¡–±Ì',
});
avalon.vmodels.page.content = "moduleparent";

