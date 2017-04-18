var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./module.tmpl');
avalon.templateCache.module = tmpl();
var rootVm = avalon.vmodels['root'];

var model = avalon.define({
    $id: "module",
    dataList: {},
    title: 'ģ���б�',
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
        //ʵ�����༭��
        //����ʹ�ù�������getEditor���������ñ༭��ʵ���������ĳ���հ������øñ༭����ֱ�ӵ���UE.getEditor('editor')�����õ���ص�ʵ��
        var ue = UE.getEditor('editor', { initialFrameWidth: null });
    },
    PreviouPage: function () {
        if (model.currentPage == 1) {
            rootVm.$alert('��ʾ', '�Ѿ��ǵ�һҳ��', 'error');
        } else {
            model.currentPage--;
            model.load();
        }
    },
    NextPage: function () {
        if (model.currentPage == model.pageCount) {
            rootVm.$alert('��ʾ', '�Ѿ������һҳ��', 'error');
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
        //ʵ�����༭��
        //����ʹ�ù�������getEditor���������ñ༭��ʵ���������ĳ���հ������øñ༭����ֱ�ӵ���UE.getEditor('editor')�����õ���ص�ʵ��
        var ue = UE.getEditor('editor', { initialFrameWidth: null });
        $("#Add_News_modal").modal('show');
    },
    Save: function () {
        model.currentModule.Text = model.ue.getContent();
        if ($.trim(model.currentModule.Text) == '') {
            rootVm.$alert('��ʾ', '���ݲ���Ϊ��', 'error');
            return;
        }
        ajax.module.save(model.currentModule.$model).done(function (data) {
            if (data.success) {
                rootVm.$alert('��ʾ', '����ɹ�', 'success');
                model.load();
                $("#UpdatePwd_News_modal").modal('hide');
            } else {
                rootVm.$alert('��ʾ', data.msg, 'error');
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
                rootVm.$alert('��ʾ', 'ɾ���ɹ�', 'success');
                model.load();
                $("#Delete_News_modal").modal('hide');
            } else {
                rootVm.$alert('��ʾ', data.msg, 'error');
            }
        });
    },
    ShowUpdateNews: function (obj) {
        model.currentModule = obj.$model;
        var id = new Date().getTime();
        $('#ContentContainerDiv').html('<script id="container_' + id + '" name="content" type="text/plain"></script>');
        //ʵ�����༭��
        model.ue = UE.getEditor('container_' + id);
        model.ue.addListener("ready", function () {
            // editor׼����֮��ſ���ʹ��
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
        var value = prompt('����html����', '');
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
        arr.push("ʹ��editor.getContent()�������Ի�ñ༭��������");
        arr.push("����Ϊ��");
        arr.push(UE.getEditor('editor').getContent());
        alert(arr.join("\n"));
    },
    getPlainTxt: function () {
        var arr = [];
        arr.push("ʹ��editor.getPlainTxt()�������Ի�ñ༭���Ĵ���ʽ�Ĵ��ı�����");
        arr.push("����Ϊ��");
        arr.push(UE.getEditor('editor').getPlainTxt());
        alert(arr.join('\n'))
    },
    setContent: function (isAppendTo) {
        var arr = [];
        arr.push("ʹ��editor.setContent('��ӭʹ��ueditor')�����������ñ༭��������");
        UE.getEditor('editor').setContent('��ӭʹ��ueditor', isAppendTo);
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
        //��������ťʱ�༭�����Ѿ�ʧȥ�˽��㣬���ֱ����getText������õ����ݣ�����Ҫ��ѡ������Ȼ��ȡ������
        var range = UE.getEditor('editor').selection.getRange();
        range.select();
        var txt = UE.getEditor('editor').selection.getText();
        alert(txt)
    },

    getContentTxt: function () {
        var arr = [];
        arr.push("ʹ��editor.getContentTxt()�������Ի�ñ༭���Ĵ��ı�����");
        arr.push("�༭���Ĵ��ı�����Ϊ��");
        arr.push(UE.getEditor('editor').getContentTxt());
        alert(arr.join("\n"));
    },
    hasContent: function () {
        var arr = [];
        arr.push("ʹ��editor.hasContents()�����жϱ༭�����Ƿ�������");
        arr.push("�жϽ��Ϊ��");
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
        alert("����ղݸ���")
    }

});

avalon.scan();

exports.setPageName = function (pagename) {
    model.pagename = pagename;
    model.load();
    model.$init();
    avalon.vmodels.page.content = "module";
}
