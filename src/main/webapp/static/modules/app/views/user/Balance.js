define('app/views/user/Balance', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="Balance">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <div class="clearfix">\r\n        <table class="table table-striped table-hover table-bordered">\r\n          <thead>\r\n            <tr>\r\n              <th>\r\n                内容\r\n              </th>\r\n              <th>\r\n                资金变动\r\n              </th>\r\n              <th >\r\n                时间\r\n              </th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr class="" ms-repeat-obj="users">\r\n              <td>\r\n                {{obj.Text}}\r\n              </td>\r\n              <td>\r\n                {{obj.Value}}\r\n              </td>\r\n              <td>\r\n                {{obj.CreateTime| datetostring | date("yyyy-MM-dd")}}\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        <div class="clearfix">\r\n          <div class="btn-group">\r\n            <a class="btn green" ms-click="PreviouPage()">\r\n              <i class="icon-step-backward">\r\n              </i>上一页\r\n            </a>\r\n            <a class="btn green" ms-click="PreviouPage()">\r\n              {{currentPage}}/{{pageCount}}\r\n            </a>\r\n            <a class="btn green" ms-click="NextPage()">\r\n              <i class="icon-step-forward">\r\n              </i>下一页\r\n            </a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n     \r\n      <div class="pagination pagination-large">\r\n        <ul>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <div id="Update_User_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        更新用户信息\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="BookFrom"  class="form-horizontal">\r\n          <div class="alert alert-error hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            请按照规则填写以下信息\r\n          </div>\r\n          <div class="alert alert-success hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            信息已通过验证，正在提交...\r\n          </div>\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="Name">\r\n                    用户手机号:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <input type="text" name="Phone" class="m-wrap span11" placeholder="请填写用户手机号" ms-duplex="CurrentUser.Phone" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label span3" for="NumOfPeriod">身份证:</label>\r\n                  <div class="controls span9">\r\n                    <input type="text" name="IDCard" class="m-wrap span11" placeholder="请填写省份证"  ms-duplex="CurrentUser.IDCard" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class="row-fluid">\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="Name">\r\n                    姓名:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <input type="text" name="Name" class="m-wrap span11" placeholder="请填写姓名" ms-duplex="CurrentUser.Name" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label span3" for="NumOfPeriod">学校:</label>\r\n                  <div class="controls span9">\r\n                    <input type="text" name="School" class="m-wrap span11" placeholder="请填写学校"  ms-duplex="CurrentUser.School" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class="row-fluid">\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="Name">\r\n                    地址:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <input type="text" name="Address" class="m-wrap span11" placeholder="请填写地址" ms-duplex="CurrentUser.Address" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="SaveBook()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.Balance = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "Balance",
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    userid: '',
    users: [],
    pageList: 0,
    load: function () {
        ajax.Balance.List(model.currentPage, model.limit, model.userid).done(function (data) {
            model.users = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
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
    }

});
avalon.scan();
exports.setUserId = function (userid) {
    model.userid = userid;
    model.page = 1;
    model.load();
    avalon.vmodels.page.content = "Balance";
}


 
});