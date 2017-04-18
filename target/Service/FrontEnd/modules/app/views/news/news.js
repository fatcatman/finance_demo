var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./news.tmpl');
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
