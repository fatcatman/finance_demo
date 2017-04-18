var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = __inline('./userCenter.tmpl');
avalon.templateCache.userCenter = tmpl();

var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "userCenter",
    oldpwd: '',
    newpwd: '',
    renewpwd: '',
    user: {
        ID: 0, Phone: '', Account: '', Des: '', role: '', cppoint: '',Pwd:''
    },
    edituser: {
        ID: 0, Phone: '', Account: '', Des: '', role: '', cppoint: '',Pwd:''
    },
    load: function () {
        ajax.manager.getcurrentuser().done(function (data) {
            if (data != false && data != null) {
                model.user = data;
                model.edituser = data;
            }
        });
    },
    update: function () {
        ajax.manager.update(model.edituser.$model).done(function (data) {
            if (data != null && data != false) {
                if (data.success) {
                    rootVm.$alert('提示', '修改成功', 'success');
                } else {
                    rootVm.$alert('提示', data.msg, 'info');
                }
            } else {
                rootVm.$alert('提示', '修改失败', 'error');
            }
        });
    },
    reset: function () {
        model.edituser = model.user;
    },
    // 修改密码
    changepwd: function () {
        if (model.oldpwd == '' || model.newpwd == '' || model.renewpwd == '') {
            rootVm.$alert('提示', '请正确填写信息', 'warning');
        } else {
            if (model.newpwd == model.renewpwd) {
                ajax.manager.changepwd(model.oldpwd, model.newpwd).done(function (data) {
                    if (data != null && data != false) {
                        if (data.success) {
                            rootVm.$alert('提示', '修改成功', 'success');
                        } else {
                            rootVm.$alert('提示', data.msg, 'info');
                        }
                    } else {
                        rootVm.$alert('提示', '修改失败', 'error');
                    }
                });
            } else {
                rootVm.$alert('提示', '两次输入的新密码不一致', 'warning');
            }
        }
    },
    resetpwd: function () {
        model.oldpwd = '';
        model.newpwd = '';
        model.renewpwd = '';
    },
});

model.load();

avalon.scan();
avalon.vmodels.page.content = "userCenter";