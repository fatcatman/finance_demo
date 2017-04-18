var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./edit.tmpl');
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
