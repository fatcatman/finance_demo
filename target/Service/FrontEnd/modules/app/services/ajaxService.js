var avalon = require('vendor/avalon/avalon');
var lib = $;

// 拦截ajax请求，检测是否超时，以重新登录
$(document).ajaxComplete(function (event, xhr, settings) {
    if (settings.dataType != 'text') {
        if (settings.dataType == 'json' && xhr.status == 200 && xhr.responseJSON != void 0 && xhr.responseJSON.timeout != void 0) {
            if (xhr.responseJSON.timeout) {
                avalon.vmodels['root'].$confirm('提示', 'Session已经失效，请重新登录', function () {
                    location.href = "/Service/Manager/Login.jsp" + window.location.hash;
                }, function () { });
            }
        } else if (xhr.responseJSON == undefined) {
            avalon.vmodels['root'].$confirm('提示', 'Session已经失效，请重新登录', function () {
                location.href = "/Service/Manager/Login.jsp" + window.location.hash;
            }, function () { });
        }
    }

});
exports.user = {
    List: function (page, limit, Name, Phone, CompanyName) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/User/List.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                Name: Name,
                Phone: Phone,
                CompanyName: CompanyName
            }
        });
    },
    ListAll: function () {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/User/List.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
            }
        });
    },
    confirmSignIn: function (record) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/User/ConfirmSignIn.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: record
        });

    },
    setActivityGroup: function (groupId, userId) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/User/SetActivityGroup.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                groupId: groupId,
                userId: userId
            }
        });
    },
    Delete: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/User/Delete.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    },
    Save: function (ID, Account, Name, Phone, CompanyName, Balance, Mark) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/User/Save.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                ID: ID,
                Account: Account,
                Name: Name,
                Phone: Phone,
                CompanyName:
                CompanyName,
                Balance: Balance,
                Mark: Mark
            }
        });
    }
};
exports.manager = {
    List: function (limit, currentPage, type) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Manager/List.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                limit: limit,
                page: currentPage,
                type: type
            }
        });
    },
    getuserbyid: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Manager/GetUserByID.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    },
    save: function (record) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Manager/Save.do?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: { Account: record.Account, Pwd: record.Pwd, roleId: record.role }
        });
    },
    update: function (record) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Manager/UpdateUser.do?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: record
        });
    },
    Del: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Manager/Delete.do?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: { id: id }
        });
    },
    getcurrentuser: function () {
        var timenow = new Date().getTime();
        return lib.getJSON('/Service/Manager/GetCurrentManager.do?timeStamp=' + timenow);
    },
    update: function (record) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Manager/UpdateUser.do?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: record
        });
    },
    changepwd: function (oldpwd, newpwd) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Manager/UpdatePwd.do?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: {
                OldPwd: oldpwd,
                NewPwd: newpwd
            }
        });
    },
    UpdatePwd: function (id, newPwd) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Manager/UpdatePwdForManager.do?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: {
                id: id,
                newPwd: newPwd
            }
        });
    },
    SetCP: function (cpId, managerId) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Manager/SetCP.do?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: {
                cpId: cpId,
                managerId: managerId
            }
        });
    }

}
exports.productCategory = {
    List: function (limit, page, PID) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/NewsCategory/List.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                PID: PID
            }
        });
    },
    ListAll: function () {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/NewsCategory/ListAll.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
            }
        });
    },
    save: function (id, name, PID) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/NewsCategory/Save.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id,
                name: name,
                PID: PID
            }
        });
    },
    del: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/NewsCategory/Delete.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });

    },
    delPic: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/ProductImg/Delete.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });

    }
};
exports.org = {
    List: function (page, limit, groupId) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Organ/List.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                groupId: groupId
            }
        });
    },
    AllList: function (page, limit) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Organ/AllList.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit
            }
        });
    },
    AllNotList: function (page, limit, groupId) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Organ/AllNotList.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                groupId: groupId
            }
        });
    },
    save: function (record) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Organ/Save.do?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: {
                id: record.ID,
                name: record.Name
            }
        });
    },
    saveGroup: function (record) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Organ/SaveGroup.do?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: {
                id: record.ID,
                groupId: record.groupId
            }
        });
    },
    Del: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Organ/Delete.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    },
    delgroup: function (id, groupId) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Organ/DeleteGroup.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id,
                groupId: groupId
            }
        });
    }
};
exports.group = {
    List: function (page, limit) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Group/List.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit
            }
        });
    },
    save: function (record) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Group/Save.do?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: {
                id: record.ID,
                name: record.Name
            }
        });
    },
    Del: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Group/Delete.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    }
};
exports.approval = {
    List: function (page, limit, orgId, param) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Approval/List.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                orgId: orgId,
                param: param
            }
        });
    },
    ListAll: function (orgId) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Approval/ListAllForOrg.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                orgId: orgId
            }
        });
    },
    ListAllNotIn: function (page, limit,orgId, param) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Approval/ListAllForOrgPage.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                orgId: orgId,
                param: param
            }
        });
    },
    save: function (record) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Approval/Save.do?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: {
                id: record.ID,
                name: record.Name,
                orgId: record.Organ,
                eventid: record.eventid
            }
        });
    },
    Del: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Approval/Delete.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    }
};
exports.temp = {
    List: function (page, limit, approvalId) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/FormTemplate/List.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                approvalId: approvalId
            }
        });
    },
    save: function (record) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/FormTemplate/Save.do?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: {
                id: record.ID,
                name: record.Name,
                approvalId: record.ApprovalItem,
                eventid: record.eventid
            }
        });
    },
    Del: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/FormTemplate/Delete.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    }
};
exports.guide = {
    List: function (page, limit, approvalId) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/GuideTemplate/List.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                approvalId: approvalId
            }
        });
    },
    save: function (record) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/GuideTemplate/Save.do?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: {
                id: record.ID,
                name: record.Name,
                approvalId: record.ApprovalItem,
                eventid: record.eventid
            }
        });
    },
    Del: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/GuideTemplate/Delete.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    }
};
exports.module = {
    List: function (limit, page, pagename) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Module/List?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                Pageindex: page,
                Pagesize: limit,
                pagename: pagename
            }
        });
    },
    save: function (record) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Module/Save?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: {
                id: record.ID,
                page: record.Page,
                text: record.Text
            }
        });
    },
    Del: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Module/Delete?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    }
};
exports.news = {
    typeList: function () {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/News/TypeList?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
            }
        });
    },
    List: function (limit, page) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/News/GetNewsList?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                Pageindex: page,
                Pagesize: limit
            }
        });
    },
    save: function (record) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/News/SaveNews?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: {
                id: record.ID,
                title: record.Title,
                text: record.Text,
                type: record.Type
            }
        });
    },
    update: function (record) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/News/UpdateNews?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: {
                id: record.ID,
                title: record.Title,
                text: record.Text
            }
        });
    },
    Del: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/News/Delete?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    }
};
exports.task = {
    List: function (limit, page) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Task/List?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                type: 1
            }
        });
    },
    save: function (id, BrandID, Title, rule, reward, UserNum) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Task/Save?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: {
                ID: id,
                BrandID: BrandID,
                Title: Title,
                rule: rule,
                UserNum: UserNum,
                reward: reward
            }
        });
    },
    del: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Task/Delete?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    }
};
exports.product = {

    List: function (limit, page, pid) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Product/List?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                pid: pid
            }
        });
    },
    save: function (id, ProductName, ProductIntro, Text, PID) {//, UserID, categoryId) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Product/Save?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: {
                id: id,
                ProductName: ProductName,
                ProductIntro: ProductIntro,
                Text: Text,
                Pid: PID
            }
        });
    },
    del: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Product/Delete?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    },
    get: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Product/GetById?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    },
    SaveFailReason: function (productId, FailReason) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/product/SaveFailReason?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                FailReason: FailReason,
                productId: productId
            }
        });

    }
};
exports.wxuser = {
    List: function (page, limit, taskid) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/TaskWXUserMapping/List?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                taskid: taskid
            }
        });
    }
};

exports.Balance = {
    List: function (page, limit, userid) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/BalanceLog/List?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                userid: userid
            }
        });
    }
};
exports.ProductPic = {
    ListAll: function (productId) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/ProductImg/ListAll?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                productId: productId
            }
        });
    }
};
exports.UserPwd = {
    List: function (page, limit, userid) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/UserPwd/List?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                userid: userid
            }
        });
    },
    Save: function (pwd, userid) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/UserPwd/Save?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                pwd: pwd,
                userid: userid
            }
        });
    }
};
//image
exports.image = {
    List: function (page, limit) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Image/List.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit
            }
        });
    },
    save: function (record) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Image/Save.do?timeStamp=' + timenow,
            type: 'post',
            dataType: 'json',
            data: {
                id: record.ID,
                name: record.Name,
                type: record.Type
            }
        });
    },
    del: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Image/Delete.do?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    }
};
//image
exports.message = {
    List: function (page, limit) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Message/List?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit
            }
        });
    },
    del: function (id) {
        var timenow = new Date().getTime();
        return lib.ajax({
            url: '/Service/Message/Delete?timeStamp=' + timenow,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    }
};