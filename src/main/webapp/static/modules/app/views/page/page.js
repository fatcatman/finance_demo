define('app/views/page/page', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div ms-controller="page" ms-include-src="content" data-include-loaded="$init" data-include-rendered="$rendered"></div>';
}
return __p;
};
avalon.templateCache.page = tmpl();

var model = avalon.define({
    $id: "page",
    content: 'empty',
    $init: function () {
    },
    $rendered: function () {
        var children = this.childNodes;
        for (var i in children) {
            if (children[i].nodeType != 8 && children[i].nodeType != 3) {
                if (children[i].nodeType == 1) {
                    var vmName = children[i].getAttribute('avalonctrl');
                    if (vmName != null && avalon.vmodels[vmName].$init != void 0) {
                        avalon.vmodels[vmName].$init();
                    }
                    if (vmName != null && avalon.vmodels[vmName].activedTab) {
                        $('a[href=#' + avalon.vmodels[vmName].activedTab + ']').trigger('click');
                    }

                    $('.nav-progress').stop().animate({ width: '100%' }, 500);
                    $('.nav-progress').fadeTo(1000, 0, function () {
                        $('.nav-progress').css({ width: 0, opacity: 1 });
                    });
                    break;
                }
            }
        }
    }
});
avalon.scan();
avalon.vmodels.root.page = "page"; 
});