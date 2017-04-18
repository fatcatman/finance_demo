var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./product.tmpl');
avalon.templateCache.product = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "product",
    dataList: {},
    title: '产品管理',
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    CurrentObj: '',
    isAdd: false,
    productCateogrys: [],
    users: [],
    currentProduct: {
        ID: 0,
        ProductName: '',
        ProductIntro: '',
        Text: 0,
        PID: 0
    },
    load: function () {
        ajax.product.List(model.limit, model.currentPage,0).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    $init: function () {
        var id = new Date().getTime();
        $('#ContentContainerDiv').html('<script id="container_' + id + '" name="content" type="text/plain"></script>');
        //实例化编辑器
        model.ue = UE.getEditor('container_' + id);
    },
    //初始化数据
    Picinit: function (obj) {
        model.productId = obj.$model.ID;
        $('#uploadDialog').modal('show');
    },
    ImgUpload: function () {
        $.ajaxFileUpload({
            url: '/Product/UploadFile',
            secureuri: false,
            data: { productId: model.productId },
            fileElementId: 'file_upload',
            dataType: 'text',
            success: function (data) {
                if (data == '1') {
                    rootVm.$alert('提示', '请选择合适的图片', 'success');
                } else if (data == '2') {
                    rootVm.$alert('提示', '上传成功', 'success');
                    $('#uploadDialog').modal('hide');
                    model.load();
                } else if (data == '0') {
                    rootVm.$alert('提示', '上传失败', 'success');
                }

            },
            error: function (data) {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
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
    ShowDetail: function (obj) {
        model.CurrentObj = obj;

        $("#Detail_modal").modal('show');
    },
    ShowAddProduct: function () {
        model.currentProduct.ID = 0;
        model.currentProduct.ProductName = '';
        model.currentProduct.ProductIntro = '';
        model.currentProduct.Text = '';
        model.currentProduct.PID = 0;

        model.isAdd = true;
        $("#Add_Update_User_modal").modal('show');
    },
    ShowUpdateProduct: function (obj) {
        model.currentProduct.ID = obj.ID;
        model.currentProduct.ProductName = obj.ProductName;
        model.currentProduct.ProductIntro = obj.ProductIntro;
        model.currentProduct.Text = obj.Text;
        model.currentProduct.PID = obj.PID;
        var id = new Date().getTime();
        $('#ContentContainerDiv').html('<script id="container_' + id + '" name="content" type="text/plain"></script>');
        //实例化编辑器
        model.ue = UE.getEditor('container_' + id);
        model.ue.addListener("ready", function () {
            // editor准备好之后才可以使用
            model.ue.setContent(obj.Text);
        });
        model.isAdd = false;
        $("#Add_Update_User_modal").modal('show');
    },
    ShowDeleteProduct: function (obj) {
        model.currentProduct.ID = obj.ID;
        $("#Delete_Product_modal").modal('show');
    },
    Save: function () {
        if ($.trim(model.currentProduct.ProductName) == '') {
            rootVm.$alert('提示', '产品名称不能为空', 'error');
            return;
        }
        if ($.trim(model.currentProduct.ProductIntro) == '') {
            rootVm.$alert('提示', '产品介绍不能为空', 'error');
            return;
        }
        model.currentProduct.Text = model.ue.getContent();
        if ($.trim(model.currentProduct.Text) == '') {
            rootVm.$alert('提示', '图文详情不能为空', 'error');
            return;
        }
        /*if (model.currentProduct.UserID == 0) {
            rootVm.$alert('提示', '请选择产品的归属用户', 'error');
            return;
        }
        if (model.currentProduct.categoryId == 0) {
            rootVm.$alert('提示', '请选择产品的类别', 'error');
            return;
        }*/
        ajax.product.save(model.currentProduct.ID, model.currentProduct.ProductName, model.currentProduct.ProductIntro, model.currentProduct.Text, model.currentProduct.PID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', data.msg, 'success');
                $("#Add_Update_User_modal").modal('hide');
                model.load();
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    Delete: function () {
        ajax.product.del(model.currentProduct.ID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', data.msg, 'success');
                $("#Delete_Product_modal").modal('hide');
                model.load();
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    
    }
});
avalon.scan();
model.load();
model.$init();
avalon.vmodels.page.content = "product";

exports.getBooks = function () {
    model.load();
    model.$init();
    avalon.vmodels.page.content = "product";
}
