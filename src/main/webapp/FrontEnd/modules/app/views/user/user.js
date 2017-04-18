var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./user.tmpl');
avalon.templateCache.user = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "user",
    limit: 100,
    total: '',
    currentPage: 1,
    SignIn: '全部',
    pageCount: 0,
    pageList: 0,
    CurrentUser: { Name: '', Phone: '', Account: '', ID: '', Mark: '', Balance: 0, CompanyName: '' },
    users: [],
    pageList: 0,
    phone: '',
    IDCard: '',
    Name: '',
    CompanyName: '',
    isAdd: false,
    load: function () {
        ajax.user.List(model.currentPage, model.limit, model.Name, model.phone, model.CompanyName).done(function (data) {
            model.users = data.items;
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
    //初始化数据
    init: function () {
    },
    ShowAddUser: function () {
        model.CurrentUser.ID = 0;
        model.CurrentUser.Name = '';
        model.CurrentUser.Phone = '';
        model.CurrentUser.Account = '';
        model.CurrentUser.Mark = '';
        model.CurrentUser.Balance = '';
        model.CurrentUser.CompanyName = '';
        $('#Add_Update_User_modal').modal('show');
        isAdd = true;
    },
    ShowUpdateUser: function (record) {
        model.CurrentUser.ID = record.$model.ID;
        model.CurrentUser.Name = record.$model.Name;
        model.CurrentUser.Phone = record.$model.Phone;
        model.CurrentUser.Account = record.$model.Account;
        model.CurrentUser.Mark = record.$model.Mark;
        model.CurrentUser.Balance = record.$model.Balance;
        model.CurrentUser.CompanyName = record.$model.CompanyName;
        $('#Add_Update_User_modal').modal('show');
        isAdd = false;
    },
    ShowDeleteUser: function (record) {
        model.CurrentUser = record.$model;
        $('#deleteUserDialog').modal('show');
    },
    doDeleteUser: function () {
        ajax.user.Delete(model.CurrentUser.ID).done(function (data) {
            if (data.success) {
                model.load();
                $("#deleteUserDialog").modal('hide');
                rootVm.$alert('提示', data.msg, 'success');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    SaveUser: function () {
        if (model.CurrentUser.CompanyName == '') {
            rootVm.$alert('提示', '请输入公司名称', 'error');
            return;
        }
        if (model.CurrentUser.Name == '') {
            rootVm.$alert('提示', '请输入姓名', 'error');
            return;
        }
        if (model.CurrentUser.Account == '') {
            rootVm.$alert('提示', '请输入登录账号', 'error');
            return;
        }
        if (model.CurrentUser.Phone == '') {
            rootVm.$alert('提示', '请输入手机号', 'error');
            return;
        }
        if (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(model.CurrentUser.Phone) || model.CurrentUser.Phone.length != 11) {
            rootVm.$alert('提示', '手机号输入错误', 'error');
            return;
        }
        if (model.CurrentUser.Balance == '') {
            rootVm.$alert('提示', '余额不能为空', 'error');
            return;
        }
        if (isNaN(model.CurrentUser.Balance)) {
            rootVm.$alert('提示', '余额必须为一个数值', 'error');
            return;
        }
 
        ajax.user.Save(model.CurrentUser.ID, model.CurrentUser.Account, model.CurrentUser.Name, model.CurrentUser.Phone, model.CurrentUser.CompanyName, model.CurrentUser.Balance, model.CurrentUser.Mark).done(function (data) {
            if (data.success) {
                model.load();
                rootVm.$alert('提示', data.msg, 'success');
                $("#Add_Update_User_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    //身份证号码的验证规则
    isIdCardNo: function (num) {
        //if (isNaN(num)) {alert("输入的不是数字！"); return false;} 
        var len = num.length, re;
        if (len == 15)
            re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
        else if (len == 18)
            re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
        else {
            //alert("输入的数字位数不对。"); 
            return false;
        }
        var a = num.match(re);
        if (a != null) {
            if (len == 15) {
                var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
                var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
            }
            else {
                var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
                var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
            }
            if (!B) {
                //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。"); 
                return false;
            }
        }
        if (!re.test(num)) {
            //alert("身份证最后一位只能是数字和字母。");
            return false;
        }
        return true;
    }

});
model.load();
avalon.scan();
avalon.vmodels.page.content = "user";
