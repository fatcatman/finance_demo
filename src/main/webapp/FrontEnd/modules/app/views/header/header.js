var avalon = require('vendor/avalon/avalon');
var tmpl = __inline('./header.tmpl');
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