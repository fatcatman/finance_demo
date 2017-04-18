var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./productCategory.tmpl');
avalon.templateCache.productCategory = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "productCategory",
    dataList: {},
    title: '分类管理',
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    Name: '',
    ID: '',
    PID: 0,
    isAdd: true,
    load: function () {
        ajax.productCategory.List(model.limit, model.currentPage, model.PID).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    $init: function () {

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
    ShowAddCategory: function () {
        model.Name = '';
        model.ID = 0;
        model.isAdd = true;
        $("#Add_Book_modal").modal('show');
    },
    ShowUpdate: function (obj) {
        model.Name = obj.Name;
        model.ID = obj.ID;
        model.isAdd = false;
        $("#Add_Book_modal").modal('show');
    },
    ShowDelete: function (obj) {
        model.Name = obj.Name;
        model.ID = obj.ID;
        $("#Delete_Organization_modal").modal('show');
    },
    Delete: function () {
        ajax.productCategory.del(model.ID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', data.msg, 'success');
                $("#Delete_Organization_modal").modal('hide');
                model.load();
            } else {
                rootVm.$alert('提示', data.msg, 'success');
            }
        });
    },
    SaveCategory: function () {
        if ($.trim(model.Name) == '') {
            rootVm.$alert('提示', '类别名称不能为空', 'error');
            return;
        }
        ajax.productCategory.save(model.ID, model.Name, model.PID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', data.msg, 'success');
                $("#Add_Book_modal").modal('hide');
                model.load();
            } else {
                rootVm.$alert('提示', data.msg, 'success');
            }
        });
    },
    ShowChildren: function (obj) {
        model.page = 1;
        model.PID = obj.ID,
        model.load();
    },
    ShowUploadPic: function (obj) {
        model.ID = obj.ID;
        $("#upload_Pic_modal").modal('show');
    },
    UploadPic: function () {
        $.ajaxFileUpload({
            url: '/Activity/UploadPic',
            secureuri: false,
            data: { id: model.ID },
            fileElementId: 'filePic',
            dataType: 'json',
            success: function (data) {
                rootVm.$alert('提示', data.msg, 'success');
                model.load();
                $("#upload_Pic_modal").modal('hide');
            },
            error: function (data) {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });

    }
});
avalon.scan();
avalon.vmodels.page.content = "productCategory";

exports.setPID = function (pid) {
    model.PID = pid;
    model.page = 1;
    model.load();
    model.$init();
    avalon.vmodels.page.content = "productCategory";
}
