define('app/views/news/news', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="news">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="ShowAdd()">\r\n            <i class="icon-refresh">\r\n            </i>新增新闻\r\n          </a>\r\n        </div>\r\n      </div>\r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th>\r\n              标题\r\n            </th>\r\n            <th>\r\n              图片\r\n            </th>\r\n            <th>\r\n              管理\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList " style="max-height:100px;">\r\n            <td style="max-width:200px;">\r\n              {{obj.title}}\r\n            </td>\r\n            <td>\r\n              {{obj.pic}}\r\n            </td>\r\n            <td>\r\n              <a class="btn mini blue" ms-href="javascript:void(0);" ms-click="ShowUpdate(obj)">\r\n                修改\r\n              </a>\r\n              <a class="btn mini red" ms-href="javascript:void(0);" ms-click="ShowDelete(obj)">\r\n                删除\r\n              </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <!--设置分组窗口-->\r\n  <div id="ShowSetCategoryWin" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        选择分类\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body" style="height: 300px;">\r\n      <div class="portlet box yellow">\r\n        <div class="portlet-title">\r\n          <div class="caption">\r\n            <i class="icon-coffee"></i>分类列表\r\n          </div>\r\n          <div class="tools">\r\n            <a href="javascript:void(0);" ms-click="loadCategory" class="reload"></a>\r\n          </div>\r\n        </div>\r\n        <div class="portlet-body">\r\n          <table class="table table-striped table-hover table-bordered">\r\n            <thead>\r\n              <tr>\r\n                <th>\r\n                  分类名称\r\n                </th>\r\n                <th>\r\n                  管理\r\n                </th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr class="" ms-repeat-obj="categoryList " style="max-height:100px;">\r\n                <td style="max-width:200px;">\r\n                  {{obj.Name}}\r\n                </td>\r\n                <td>\r\n                  <a class="btn mini blue" ms-click="SetCategory(obj.ID)" href="javascript:void(0);">\r\n                    选择该组\r\n                  </a>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div id="Add_Update_News_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        {{isAdd?\'新增新闻\':\'修改新闻\'}}\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="GroupFrom"  class="form-horizontal">\r\n          <div class="alert alert-error hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            请按照规则填写以下信息\r\n          </div>\r\n          <div class="alert alert-success hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            信息已通过验证，正在提交...\r\n          </div>\r\n          <div class="row-fluid">\r\n\r\n            <div class="span6 ">\r\n              <div class="control-group">\r\n                <label class="control-label  span3" for="Name">\r\n                  标题:<span class="required">*</span>\r\n                </label>\r\n                <div class="controls  span9">\r\n                  <input type="text" name="ProductName" class="m-wrap span11" placeholder="请填写标题" ms-duplex="currentNews.title" />\r\n                  <span class="help-block"></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class="span6 ">\r\n              <div class="control-group">\r\n                <label class="control-label  span3" for="Name">\r\n                  图片:<span class="required">*</span>\r\n                </label>\r\n                <div class="controls  span9">\r\n                  <select ms-each-obj="picList" ms-duplex="currentNews.pic">\r\n                    <option ms-value="obj.path">{{obj.name}}</option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span12">\r\n                <div >\r\n                  <div class="  "  id="ContentContainerDiv">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="Save()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div id="Delete_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\r\n      <h3 id="deleteDialogLabel">删除新闻</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要删除选中的新闻吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Delete()">确定</button>\r\n    </div>\r\n  </div>\r\n  <!--信息提示-->\r\n  <div id="Hint_Msg_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <h3 id="deleteDialogLabel">信息提示</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>{{Msg}}</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n    </div>\r\n  </div>\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.news = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "news",
    Msg: '',
    dataList: {},
    picList:{},
    title: '新闻管理',
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    categoryList: [],
    Name: '',
    ID: '',
    Mark: '',
    ue:'',
    CurrentGroup: '',
    TotalNumber: '',
    isAdd: false,
    CurrentId: 0,
    SaveGroup: function () {
    },
    currentNews: {id:0,title:'',pic:'',content:''},
    load: function () {
        ajax.news.List(model.limit, model.currentPage).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    loadPic: function () {
        ajax.media.List(1, 10000, false).done(function (data) {
            model.picList = data.items;
        });
    },
    $init: function () {
        var id = new Date().getTime();
        $('#ContentContainerDiv').html('<script id="container_' + id + '" name="content" type="text/plain"></script>');
        //实例化编辑器
        model.ue = UE.getEditor('container_' + id);
    },
    ShowAdd: function () {
        model.currentNews.id = 0;
        model.currentNews.title = '';
        model.currentNews.pic = '';
        model.currentNews.content = '';

        model.isAdd = true;
        $("#Add_Update_News_modal").modal('show');
    },
    ShowUpdate: function (obj) {
        model.currentNews.id = obj.id;
        model.currentNews.title = obj.title;
        model.currentNews.pic = obj.pic;
        model.currentNews.content = obj.content;
        var id = new Date().getTime();
        $('#ContentContainerDiv').html('<script id="container_' + id + '" name="content" type="text/plain"></script>');
        //实例化编辑器
        model.ue = UE.getEditor('container_' + id);
        model.ue.addListener("ready", function () {
            // editor准备好之后才可以使用
            model.ue.setContent(obj.content);
        });
        model.isAdd = false;
        $("#Add_Update_News_modal").modal('show');
    },
    Save: function () {
        if ($.trim(model.currentNews.title) == '') {
            rootVm.$alert('提示', '新闻标题不能为空', 'error');
            return;
        }
        if ($.trim(model.currentNews.pic) == '') {
            rootVm.$alert('提示', '新闻图片不能为空', 'error');
            return;
        }
        model.currentNews.content = model.ue.getContent();
        if ($.trim(model.currentNews.content) == '') {
            rootVm.$alert('提示', '详情不能为空', 'error');
            return;
        }
        ajax.news.save(model.currentNews.$model).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', data.msg, 'success');
                $("#Add_Update_News_modal").modal('hide');
                model.load();
            } else {
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
    ShowDelete: function (obj) {
        model.currentNews.id = obj.id;
        $("#Delete_modal").modal('show');
    },
    Delete: function () {
        ajax.news.del(model.currentNews.id).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', data.msg, 'success');
                $("#Delete_modal").modal('hide');
                model.load();
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });

    }
});
avalon.scan();
model.load();
model.loadPic();
model.$init();
avalon.vmodels.page.content = "news";
 
});