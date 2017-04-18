define('app/views/edit/edit', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="edit">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="ShowAdd">\r\n            <i class="icon-plus">\r\n            </i>新增新闻\r\n          </a>\r\n        </div>\r\n      </div>\r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th>\r\n              新闻标题\r\n            </th>\r\n            <th>\r\n              所属分类\r\n            </th>\r\n            <th>\r\n              管理\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList " style="max-height:100px;">\r\n            <td style="max-width:200px;">\r\n              {{obj.Title}}\r\n             \r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.Type.Name}}\r\n\r\n            </td>\r\n            <td>\r\n              <a class="btn mini blue" href="javascript:void(0)" ms-click="ShowUpdateNews(obj)">\r\n                修改\r\n              </a>\r\n              <a class="btn mini blue" href="javascript:void(0)" ms-click="ShowDelete(obj)">\r\n                删除\r\n              </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n \r\n  <!--修改新闻-->\r\n  <div id="Add_UpdatePwd_News_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        {{isadd==true?\'添加新闻\':\'修改新闻\'}}\r\n      </h3>\r\n    </div>\r\n\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="GroupFrom"  class="form-horizontal">\r\n          <div class="alert alert-error hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            请按照规则填写以下信息\r\n          </div>\r\n          <div class="alert alert-success hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            信息已通过验证，正在提交...\r\n          </div>\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span12">\r\n                <div class="control-group">\r\n                  <label class="control-label" for="Name">\r\n                    标题:<span class="required">*</span>\r\n                  </label>\r\n                  <input type="text" class="controls m-wrap span8" name="Title" placeholder="请输入标题" ms-duplex="currentNews.Title" />\r\n                </div>\r\n            </div>\r\n            </div>\r\n            <div class="row-fluid">\r\n              <div class="span12">\r\n                <div class="control-group">\r\n                  <label class="control-label" for="Name">\r\n                    分类:<span class="required">*</span>\r\n                  </label>\r\n                    <select ms-each-obj="typeList" ms-duplex="currentNews.Type">\r\n                      <option ms-value="{{obj.ID}}">{{obj.Name}}</option>\r\n                    </select>\r\n                    <span class="help-block"></span>\r\n              \r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span12">\r\n                <div >\r\n                  <div class="  "  id="ContentContainerDiv">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n\r\n      </div>\r\n    </div>\r\n \r\n    <div class="modal-footer">\r\n\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Save()">保存修改</button>\r\n    </div>\r\n\r\n\r\n  </div>\r\n  <!--删除组织机构窗口-->\r\n  <div id="Delete_News_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\r\n      <h3 id="deleteDialogLabel">删除新闻</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要删除这条新闻吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Delete()">确定</button>\r\n    </div>\r\n  </div>\r\n\r\n\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.edit = tmpl();
var rootVm = avalon.vmodels['root'];

var model = avalon.define({
    $id: "edit",
    dataList: {},
    title: '新闻列表',
    limit: 20,
    activityId: 0,
    type: 'all',
    typeList:[],
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    isadd:true,
    currentNews: {
        ID: 0,
        Title: '',
        Text: '',
        CreateTime: '',
        Type:0
    },
    ue: '',
    load: function () {
        ajax.news.List(model.limit, model.currentPage, model.activityId, model.type).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
        ajax.news.typeList().done(function (data) {
            model.typeList = data.items;
        });
    },
    $init: function () {
        var id = new Date().getTime();
        $('#ContentContainerDiv').html('<script id="container_' + id + '" name="content" type="text/plain"></script>');
        //实例化编辑器
        model.ue = UE.getEditor('container_' + id);
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
  
    ShowAdd: function () {
        model.currentNews.ID = '0';
        model.currentNews.Title = '';
        model.currentNews.Text = '';
        console.log(model.typeList[0].ID);
        model.currentNews.Type = model.typeList[0].ID;
        model.isadd = true;
        $("#Add_UpdatePwd_News_modal").modal('show');
    },
    Save: function () {
        if ($.trim(model.currentNews.Title) == '') {
            rootVm.$alert('提示', '标题不能为空', 'error');
            return;
        }
        if ($.trim(model.currentNews.Type) == '' || model.currentNews.Type == 0) {
            model.currentNews.Type = model.typeList[0].ID;
        }
        model.currentNews.Text = model.ue.getContent();
        if ($.trim(model.currentNews.Type) == '') {
            rootVm.$alert('提示', '内容不能为空', 'error');
            return;
        }
        console.log(model.currentNews.Type);
        ajax.news.save(model.currentNews.$model).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '保存成功', 'success');
                model.load();
                $("#Add_UpdatePwd_News_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    ShowDelete : function(obj){
        model.currentNews = obj.$model;
        $("#Delete_News_modal").modal('show');
    },
    Delete:function(){
        ajax.news.Del(model.currentNews.ID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '删除成功', 'success');
                model.load();
                $("#Delete_News_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    ShowUpdateNews: function (obj) {
        model.currentNews.ID = obj.ID;
        model.currentNews.Title = obj.Title;
        model.currentNews.Text = obj.Text;
        model.currentNews.Type = obj.Type.ID;
        var id = new Date().getTime();
        $('#ContentContainerDiv').html('<script id="container_' + id + '" name="content" type="text/plain"></script>');
        //实例化编辑器
        model.ue = UE.getEditor('container_' + id);
        model.ue.addListener("ready", function () {
            // editor准备好之后才可以使用
            model.ue.setContent(model.currentNews.Text);
        });
        model.isadd = false;
        $("#Add_UpdatePwd_News_modal").modal('show');
    }

});

avalon.scan();
model.load();
model.$init();
avalon.vmodels.page.content = "edit";

exports.getBooks = function () {
    model.load();
    model.$init();
    avalon.vmodels.page.content = "manager";
}
 
});