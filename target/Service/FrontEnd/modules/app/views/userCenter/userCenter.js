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
                    rootVm.$alert('��ʾ', '�޸ĳɹ�', 'success');
                } else {
                    rootVm.$alert('��ʾ', data.msg, 'info');
                }
            } else {
                rootVm.$alert('��ʾ', '�޸�ʧ��', 'error');
            }
        });
    },
    reset: function () {
        model.edituser = model.user;
    },
    // �޸�����
    changepwd: function () {
        if (model.oldpwd == '' || model.newpwd == '' || model.renewpwd == '') {
            rootVm.$alert('��ʾ', '����ȷ��д��Ϣ', 'warning');
        } else {
            if (model.newpwd == model.renewpwd) {
                ajax.manager.changepwd(model.oldpwd, model.newpwd).done(function (data) {
                    if (data != null && data != false) {
                        if (data.success) {
                            rootVm.$alert('��ʾ', '�޸ĳɹ�', 'success');
                        } else {
                            rootVm.$alert('��ʾ', data.msg, 'info');
                        }
                    } else {
                        rootVm.$alert('��ʾ', '�޸�ʧ��', 'error');
                    }
                });
            } else {
                rootVm.$alert('��ʾ', '��������������벻һ��', 'warning');
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