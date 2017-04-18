define('app/views/task/task', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="task">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th>\r\n              名称\r\n            </th>\r\n            <th>\r\n              规则\r\n            </th>\r\n            <th>\r\n              奖惩制度\r\n            </th>\r\n            <th>\r\n              任务量\r\n            </th>\r\n            <th>\r\n              管理\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList " style="max-height:100px;">\r\n            <td style="max-width:150px;">\r\n              {{obj.Title}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.details}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.author}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.UserNum}}\r\n            </td>\r\n            <td>\r\n              <a class="btn mini blue" ms-href="#!/wxuser/{{obj.ID}}">\r\n                参与用户\r\n              </a>\r\n              <a class="btn mini blue" ms-href="#!/productdetail/{{obj.ID}}">\r\n                查看商品\r\n              </a>\r\n              <a class="btn mini blue" ms-href="javascript:void(0);" ms-click="ShowUpdate(obj)">\r\n                修改\r\n              </a>\r\n              <a class="btn mini blue" ms-href="javascript:void(0);" ms-click="ShowDelete(obj)">\r\n                删除\r\n              </a>\r\n\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <!--新增和修改-->\r\n  <div id="Add_Book_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        <!--{{isAdd?\'新增任务\':\'修改任务信息\'}}-->\r\n        审核通过，发布任务\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="BookFrom"  class="form-horizontal">\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span12 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="Name">\r\n                    任务名称:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <input type="text" name="Name" class="m-wrap span11" placeholder="请填写任务名称"  ms-duplex="Name" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="detail">\r\n                    任务规则:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <textarea type="text" name="detail" class="m-wrap span11" placeholder="请填写任务规则"  ms-duplex="detail" ></textarea>\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="reward">\r\n                    任务奖惩:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <textarea type="text" name="reward" class="m-wrap span11" placeholder="请填写任务奖惩" ms-duplex="reward" >\r\n                    </textarea>\r\n                    <span class="help-block"></span>\r\n\r\n                  </div>\r\n                </div>\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="reward">\r\n                    需要邀请人数:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <input type="text" name="UserNum" class="m-wrap span11" placeholder="请填写邀请人数"  ms-duplex="UserNum" />\r\n                    <span class="help-block"></span>\r\n\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="Savetask()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <!--删除组织机构窗口-->\r\n  <div id="Delete_Organization_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\r\n      <h3 id="deleteDialogLabel">删除任务</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要删除任务吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Delete()">确定</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.task = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "task",
    dataList: {},
    title: '任务管理',
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    BrandID: '', //关联品牌ID
    Name: '', //Title
    detail: '', //规则rule
    reward: '', //奖惩reward
    UserNum: '',
    ID: 0,
    isAdd: true,
    load: function () {
        ajax.task.List(model.limit, model.currentPage).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    $init: function () {

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
    ShowUpdate: function (obj) {
        model.Name = obj.Title;
        model.detail = obj.details;
        model.reward = obj.author;
        model.ID = obj.ID;
        model.BrandId = obj.product.ID;
        model.isAdd = false;
        $("#Add_Book_modal").modal('show');
    },
    ShowDelete: function (obj) {
        model.Name = obj.Name;
        model.ID = obj.ID;
        $("#Delete_Organization_modal").modal('show');
    },
    Delete: function () {
        ajax.task.del(model.ID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', data.msg, 'success');
                $("#Delete_Organization_modal").modal('hide');
                model.load();
            } else {
                rootVm.$alert('提示', data.msg, 'success');
            }
        });
    },
    Savetask: function () {
        if ($.trim(model.Name) == '') {
            rootVm.$alert('提示', '名称不能为空', 'error');
            //$("#Add_Book_modal").modal('hide');
            return;
        }
        if ($.trim(model.detail) == '') {
            rootVm.$alert('提示', '规则不能为空', 'error');
            //$("#Add_Book_modal").modal('hide');
            return;
        }
        if ($.trim(model.reward) == '') {
            rootVm.$alert('提示', '奖惩不能为空', 'error');
            // $("#Add_Book_modal").modal('hide');
            return;
        }
        if ($.trim(model.UserNum) == '') {
            rootVm.$alert('提示', '需要邀请人数不能为空', 'error');
            return;
        }
        if (isNaN(model.UserNum)) {
            rootVm.$alert('提示', '需要邀请人数必须为一个数字', 'error');
            return;
        }
        ajax.task.save(model.ID, model.BrandId, model.Name, model.detail, model.reward, model.UserNum).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', data.msg, 'success');
                $("#Add_Book_modal").modal('hide');
                model.load();
            } else {
                rootVm.$alert('提示', data.msg, 'success');
            }
        });
    }
});
avalon.scan();
model.load();
model.$init();
avalon.vmodels.page.content = "task";

exports.getBooks = function () {
    model.load();
    model.$init();
    avalon.vmodels.page.content = "task";
}
 
});