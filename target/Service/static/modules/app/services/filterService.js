define('app/services/filterService', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
avalon.filters.pageCountToList = function (pageCount) {
    var list = [];
    for (var i = 1; i <= pageCount; i++) {
        list.push(i);
    }
    return list;
}
avalon.filters.datetostring = function (str) {
    var patten = new RegExp("[0-9]+");
    var result = patten.exec(str);
    if (result != undefined && result.length > 0) {
        return result[0];
    }else {
        return '';
    }
}
return {}; 
});