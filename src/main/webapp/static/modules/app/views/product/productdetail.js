define('app/views/product/productdetail', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="productdetail">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a id="backbtn" class="btn red" href="#!/product">\r\n            <i class="icon-step-backward">\r\n            </i>返回\r\n          </a>\r\n        </div>\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="ShowAddProduct()">\r\n            <i class="icon-plus">\r\n            </i>新增产品\r\n          </a>\r\n        </div>\r\n        \r\n      </div>\r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th>\r\n              产品名称\r\n            </th>\r\n            <th>\r\n              产品描述\r\n            </th>\r\n            <th>\r\n              图片\r\n            </th>\r\n            <th>\r\n              操作\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList " style="max-height:100px;">\r\n            <td style="max-width:200px;">\r\n              {{obj.ProductName}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.ProductIntro}}\r\n            </td>\r\n            <td >\r\n              <span ms-visible="obj.Img!=null">\r\n                <a ms-href="/ManagerPicForOriginal/ProductPic/{{obj.Img}}" data-lightbox="1">\r\n                  <img herf="" style=" height:40px;" ms-src="/Attrachment/{{obj.Img}}"/>\r\n                </a>\r\n              </span>\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              <a class="btn mini blue"    ms-click="Picinit(obj)">\r\n                更换产品图片\r\n              </a>\r\n              <a class="btn mini blue" href="javascript:void()" ms-click="ShowUpdateProduct(obj)">\r\n                修改\r\n              </a>\r\n\r\n              <a class="btn mini blue" href="javascript:void()" ms-click="ShowDeleteProduct(obj)">\r\n                删除\r\n              </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div id="Add_Update_User_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        {{isAdd?\'新增产品\':\'修改产品信息\'}}\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="GroupFrom"  class="form-horizontal">\r\n          <div class="alert alert-error hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            请按照规则填写以下信息\r\n          </div>\r\n          <div class="alert alert-success hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            信息已通过验证，正在提交...\r\n          </div>\r\n          <div class="row-fluid">\r\n\r\n            <div class="span6 ">\r\n              <div class="control-group">\r\n                <label class="control-label  span3" for="Name">\r\n                  产品名称:<span class="required">*</span>\r\n                </label>\r\n                <div class="controls  span9">\r\n                  <input type="text" name="ProductName" class="m-wrap span11" placeholder="请填写产品名称" ms-duplex="currentProduct.ProductName" />\r\n                  <span class="help-block"></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class="span6 ">\r\n              <div class="control-group">\r\n                <label class="control-label  span3" for="Name">\r\n                  产品描述:<span class="required">*</span>\r\n                </label>\r\n                <div class="controls  span9">\r\n                  <input type="text" name="ProductIntro" class="m-wrap span11" placeholder="请填写产品描述" ms-duplex="currentProduct.ProductIntro" />\r\n                  <span class="help-block"></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span12">\r\n                <div >\r\n                  <div class="  "  id="ContentContainerDiv">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="Save()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <div id="Delete_Product_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\r\n      <h3 id="deleteDialogLabel">删除产品</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要删除选中产品吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Delete()">确定</button>\r\n    </div>\r\n  </div>\r\n  <!--文件上传窗口-->\r\n  <div id="uploadDialog" class="modal modal-large hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\r\n      <h3 id="deleteDialogLabel">上传文件(文件大小不要超过5M)</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <input id="file_upload" name="file_upload" type="file" multiple="true"/>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="ImgUpload()">上传</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.productdetail = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "productdetail",
    dataList: {},
    title: '子类产品列表',
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    CurrentObj: '',
    isAdd: false,
    productCateogrys: [],
    pid:0,
    users: [],
    currentProduct: {
        ID: 0,
        ProductName: '',
        ProductIntro: '',
        Text: 0,
        PID: 0
    },
    load: function () {
        ajax.product.List(model.limit, model.currentPage,model.pid).done(function (data) {
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
        model.currentProduct.PID = model.pid;
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
exports.setPId = function (pid) {
    model.pid=pid
    model.load();
    model.$init();
    avalon.vmodels.page.content = "productdeatil";
}
 
});