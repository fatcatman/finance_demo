var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./parameter.tmpl');
avalon.templateCache.parameter = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "parameter",
    limit: 20,
    total: '',
    title: '参数列表',
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    dataList: [],
    typeList: [{id:'单位', name:'单位'}, {id:'个人', name:'个人'}], 
    isAdd: true,
    CurrentObj: { ID: '', Name: '', Type: '', Value: '' },
    load: function () {
        ajax.parameter.List(model.currentPage, model.limit).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.total = data.total;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
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
    ShowAdd: function () {
        model.CurrentObj.ID = 0;
        model.CurrentObj.Name = '';
        model.CurrentObj.Type = '单位';
        model.CurrentObj.Value = '';
        model.isAdd = true;
        $('#Add_modal').modal('show');
    },
    //初始化数据
    ShowUpdate: function (obj) {
        //model.CurrentObj = obj.$model;
    	model.CurrentObj.ID = obj.ID;
        model.CurrentObj.Name = obj.Name;
        model.CurrentObj.Type = obj.Type;
        model.CurrentObj.Value = obj.Value;
        model.isAdd = false; 
        $('#Add_modal').modal('show');
    },
    Save: function () {
        if ($.trim(model.CurrentObj.Name) == '') {
            rootVm.$alert('提示', '参数名称不能为空', 'error');
            return;
        }
        if ($.trim(model.CurrentObj.Type) == '') {
            rootVm.$alert('提示', '分类不能为空', 'error');
            return;
        }
        if ($.trim(model.CurrentObj.Value) == '') {
            rootVm.$alert('提示', '值不能为空', 'error');
            return;
        }
        ajax.parameter.save(model.CurrentObj.$model).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '保存成功', 'success');
                model.load();
                $("#Add_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    //初始化数据
    $init: function () {
        model.load();

    },
    ShowDel: function (obj) {
        model.CurrentObj = obj.$model;
        $('#Delete_modal').modal('show');
    },
    Delete: function () {
        ajax.parameter.Del(model.CurrentObj.ID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '删除成功', 'success');
                model.load();
                $("#Delete_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    }

});
avalon.scan();
avalon.vmodels.page.content = "parameter";