define('app/views/module/module', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="module">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th>\r\n              类别\r\n            </th>\r\n            <th>\r\n              内容\r\n            </th>\r\n            <th>\r\n              管理\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList " style="max-height:100px;">\r\n            <td style="max-width:200px;">\r\n              {{obj.Title}}\r\n\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.Text}}\r\n\r\n            </td>\r\n            <td>\r\n              <a class="btn mini blue" href="javascript:void(0)" ms-click="ShowUpdateNews(obj)">\r\n                修改\r\n              </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <!--添加新闻-->\r\n  <div id="Add_News_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div>\r\n      <h1>添加新闻</h1>\r\n      <label  style="margin-left:25px;">请输入标题:</label>\r\n      <input type="text" style="width:90%;margin-left:25px;" name="Title" placeholder="请输入标题" ms-duplex="currentNews.Title" />\r\n      <script id="editor" type="text/plain" style="width:90%;height:500px;margin-left:25px;">\r\n      </script>\r\n    </div>\r\n\r\n\r\n    <div class="modal-footer">\r\n\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Save()">保存</button>\r\n    </div>\r\n\r\n\r\n  </div>\r\n  <!--修改新闻-->\r\n  <div id="UpdatePwd_News_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div>\r\n      <h1>编辑</h1>\r\n      <label  style="margin-left:25px;">正在编辑：{{pagename}}页面>{{currentModule.Title}}模块</label>\r\n      <div class="row-fluid">\r\n        <div class="row-fluid">\r\n      <div class="span12">\r\n        <div >\r\n          <div class="  "  id="ContentContainerDiv">\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Save()">保存修改</button>\r\n    </div>\r\n\r\n\r\n  </div>\r\n  <!--删除组织机构窗口-->\r\n  <div id="Delete_News_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\r\n      <h3 id="deleteDialogLabel">删除新闻</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要删除这条新闻吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Delete()">确定</button>\r\n    </div>\r\n  </div>\r\n\r\n\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.module = tmpl();
var rootVm = avalon.vmodels['root'];

var model = avalon.define({
    $id: "module",
    dataList: {},
    title: '模块列表',
    limit: 20,
    activityId: 0,
    type: 'all',
    pagename:'',
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    ue: '',
    currentModule: {
        ID: 0,
        Title: '',
        Text: '',
        Page: ''
    },
    load: function () {
        ajax.module.List(model.limit, model.currentPage, model.pagename).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    $init: function () {
        //实例化编辑器
        //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
        var ue = UE.getEditor('editor', { initialFrameWidth: null });
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
        model.currentModule.ID = '0';
        model.currentModule.Title = '';
        model.currentModule.Text = '';
        model.currentModule.Page = '';
        //实例化编辑器
        //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
        var ue = UE.getEditor('editor', { initialFrameWidth: null });
        $("#Add_News_modal").modal('show');
    },
    Save: function () {
        model.currentModule.Text = model.ue.getContent();
        if ($.trim(model.currentModule.Text) == '') {
            rootVm.$alert('提示', '内容不能为空', 'error');
            return;
        }
        ajax.module.save(model.currentModule.$model).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '保存成功', 'success');
                model.load();
                $("#UpdatePwd_News_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    ShowDelete: function (obj) {
        model.currentNews = obj.$model;
        $("#Delete_News_modal").modal('show');
    },
    Delete: function () {
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
        model.currentModule = obj.$model;
        var id = new Date().getTime();
        $('#ContentContainerDiv').html('<script id="container_' + id + '" name="content" type="text/plain"></script>');
        //实例化编辑器
        model.ue = UE.getEditor('container_' + id);
        model.ue.addListener("ready", function () {
            // editor准备好之后才可以使用
            model.ue.setContent(obj.Text);
        });
        $("#UpdatePwd_News_modal").modal('show');
    },
   
    isFocus: function (e) {
        alert(UE.getEditor('editor').isFocus());
        UE.dom.domUtils.preventDefault(e)
    },
    setblur: function (e) {
        UE.getEditor('editor').blur();
        UE.dom.domUtils.preventDefault(e)
    },
    insertHtml: function () {
        var value = prompt('插入html代码', '');
        UE.getEditor('editor').execCommand('insertHtml', value)
    },
    createEditor: function () {
        enableBtn();
        UE.getEditor('editor');
    },
    getAllHtml: function () {
        alert(UE.getEditor('editor').getAllHtml())
    },
    getContent: function () {
        var arr = [];
        arr.push("使用editor.getContent()方法可以获得编辑器的内容");
        arr.push("内容为：");
        arr.push(UE.getEditor('editor').getContent());
        alert(arr.join("\n"));
    },
    getPlainTxt: function () {
        var arr = [];
        arr.push("使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容");
        arr.push("内容为：");
        arr.push(UE.getEditor('editor').getPlainTxt());
        alert(arr.join('\n'))
    },
    setContent: function (isAppendTo) {
        var arr = [];
        arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
        UE.getEditor('editor').setContent('欢迎使用ueditor', isAppendTo);
        alert(arr.join("\n"));
    },
    setDisabled: function () {
        UE.getEditor('editor').setDisabled('fullscreen');
        disableBtn("enable");
    },

    setEnabled: function () {
        UE.getEditor('editor').setEnabled();
        enableBtn();
    },

    getText: function () {
        //当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
        var range = UE.getEditor('editor').selection.getRange();
        range.select();
        var txt = UE.getEditor('editor').selection.getText();
        alert(txt)
    },

    getContentTxt: function () {
        var arr = [];
        arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
        arr.push("编辑器的纯文本内容为：");
        arr.push(UE.getEditor('editor').getContentTxt());
        alert(arr.join("\n"));
    },
    hasContent: function () {
        var arr = [];
        arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
        arr.push("判断结果为：");
        arr.push(UE.getEditor('editor').hasContents());
        alert(arr.join("\n"));
    },
    setFocus: function () {
        UE.getEditor('editor').focus();
    },
    deleteEditor: function () {
        disableBtn();
        UE.getEditor('editor').destroy();
    },
    disableBtn: function (str) {
        var div = document.getElementById('btns');
        var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
        for (var i = 0, btn; btn = btns[i++];) {
            if (btn.id == str) {
                UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
            } else {
                btn.setAttribute("disabled", "true");
            }
        }
    },
    enableBtn: function () {
        var div = document.getElementById('btns');
        var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
        for (var i = 0, btn; btn = btns[i++];) {
            UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
        }
    },

    getLocalData: function () {
        alert(UE.getEditor('editor').execCommand("getlocaldata"));
    },

    clearLocalData: function () {
        UE.getEditor('editor').execCommand("clearlocaldata");
        alert("已清空草稿箱")
    }

});

avalon.scan();

exports.setPageName = function (pagename) {
    model.pagename = pagename;
    model.load();
    model.$init();
    avalon.vmodels.page.content = "module";
}
 
});