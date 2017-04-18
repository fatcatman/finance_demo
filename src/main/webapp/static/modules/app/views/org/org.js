define('app/views/org/org', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="org">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        [{{groupName}}] {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <div class="clearfix">\r\n        \r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="ShowAdd()">\r\n            <i class="icon-plus">\r\n            </i>添加机构\r\n          </a>\r\n        </div>\r\n      </div>\r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th style="width:50px">\r\n              序号\r\n            </th>\r\n            <th>\r\n              名称\r\n            </th>\r\n            <th style="width:150px">\r\n              创建时间\r\n            </th>\r\n            <th>\r\n              管理\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList " style="max-height:600px;">\r\n            <td >\r\n              {{$index+1}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.Name}}\r\n\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.CreateTime  | date("yyyy-MM-dd:HH:mm:ss")}}\r\n            </td>\r\n            <td>\r\n              <a class="btn mini green" ms-href="#!/approval_org/{{obj.ID}}/{{obj.Name}}/1/{{groupId}}/{{groupName}}">\r\n                查看事项\r\n              </a>\r\n              <a class="btn mini red" ms-click="ShowDel(obj)">\r\n                移除\r\n              </a>\r\n            </td>\r\n\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    \r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <!--新增和修改-->\r\n  <div id="Add_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        {{isAdd=true?\'新增机构\':\'修改机构\'}}\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="BookFrom"  class="form-horizontal">\r\n          <div class="alert alert-error hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            请按照规则填写以下信息\r\n          </div>\r\n          <div class="alert alert-success hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            信息已通过验证，正在提交...\r\n          </div>\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <label class="control-label  span3" for="Name">\r\n                当前选择:<span style="color:red">{{currentName}}</span>\r\n              </label>\r\n              <table class="table table-striped table-hover table-bordered">\r\n                <thead>\r\n                  <tr>\r\n                    <th style="width:50px">\r\n                      序号\r\n                    </th>\r\n                    <th>\r\n                      名称\r\n                    </th>\r\n                    <th style="width:150px">\r\n                      创建时间\r\n                    </th>\r\n                    <th>\r\n                      管理\r\n                    </th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr class="" ms-repeat-obj="unclickList" style="max-height:600px;">\r\n                    <td >\r\n                      {{$index}}\r\n                    </td>\r\n                    <td style="max-width:200px;">\r\n                      {{obj.Name}}\r\n                      <td style="max-width:200px;">\r\n                        {{obj.CreateTime  | date("yyyy-MM-dd:HH:mm:ss")}}\r\n                      </td>\r\n                    </td>\r\n                    <td>\r\n                      <a class="btn mini blue" ms-click="Setclick(obj)">\r\n                        选择\r\n                      </a>\r\n                    </td>\r\n\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n\r\n              <div class="clearfix">\r\n                <div class="btn-group">\r\n                  <a class="btn green" ms-click="OrgPreviouPage()">\r\n                    <i class="icon-step-backward">\r\n                    </i>上一页\r\n                  </a>\r\n                  <a class="btn green" ms-click="OrgPreviouPage()">\r\n                    {{OrgcurrentPage}}/{{OrgpageCount}}\r\n                  </a>\r\n                  <a class="btn green" ms-click="OrgNextPage()">\r\n                    <i class="icon-step-forward">\r\n                    </i>下一页\r\n                  </a>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="Save()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <!--删除组织机构窗口-->\r\n  <div id="Delete_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\r\n      <h3 id="deleteDialogLabel">移除</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要移除吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Delete()">确定</button>\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <!--文件上传窗口-->\r\n  <div id="uploadDialog" class="modal modal-large hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\r\n      <h3 id="deleteDialogLabel">上传文件(文件大小不要超过5M)</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n\r\n      <div class="row-fluid">\r\n        <div class="span12">\r\n          <div class="control-group">\r\n            <label class="control-label " for="Name">\r\n              图片链接:<span class="required">*</span>\r\n            </label>\r\n            <div class="controls">\r\n              <input type="text" name="Name" class="m-wrap span12" placeholder="请填写图片链接" ms-duplex="CurrentObj.Link" />\r\n              <span class="help-block"></span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="row-fluid">\r\n        <div class="span12 ">\r\n          <div class="control-group">\r\n            <label class="control-label " for="Name">\r\n              图片文件【宽与高比例为2:1】:<span class="required">*</span>\r\n            </label>\r\n            <div class="controls">\r\n              <input id="file_upload" name="file_upload" type="file" multiple="true"/>\r\n              <span class="help-block"></span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="ImgUpload()">上传</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.org = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "org",
    limit: 10,
    total: '',
    title: '机构列表',
    groupId: 0,
    groupName: '',
    currentPage: 1,
    pageCount: 0,
    OrgcurrentPage: 1,
    OrgpageCount: 0,
    pageList: 0,
    allorgList: [],
    dataList: [],
    currentName: '',
    unclickList: [],
    isAdd: true,
    CurrentObj: { ID: '', groupId: '' },
    load: function () {
        ajax.org.List(model.currentPage, model.limit, model.groupId).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.total = data.total;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
        model.loadunclickList();
    },
    loadunclickList: function () {
        ajax.org.AllNotList(model.OrgcurrentPage, model.limit, model.groupId).done(function (data) {
            model.unclickList = data.items;
            model.OrgcurrentPage = data.page;
            model.OrgpageCount = data.totalPage;
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
    OrgPreviouPage: function () {
        if (model.OrgcurrentPage == 1) {
            rootVm.$alert('提示', '已经是第一页了', 'error');
        } else {
            model.OrgcurrentPage--;
            model.loadunclickList();
        }
    },
    OrgNextPage: function () {
        if (model.OrgcurrentPage == model.OrgpageCount) {
            rootVm.$alert('提示', '已经是最后一页了', 'error');
        } else {
            model.OrgcurrentPage++;
            model.loadunclickList();
        }
    },
    ShowAdd: function () {
        model.CurrentObj.ID = 0;
        model.CurrentObj.groupId = model.groupId;
        model.isAdd = true;
        $('#Add_modal').modal('show');
    },
    Setclick: function (obj) {
        rootVm.$alert('提示', '选择[' + obj.Name + ']成功', 'info');
        model.CurrentObj.ID = obj.ID;
        model.currentName = obj.Name;
    },
    Save: function () {
        if (model.CurrentObj.ID == 0) {
            rootVm.$alert('提示', '请选择机构', 'error');
            return;
        }
        ajax.org.saveGroup(model.CurrentObj.$model).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '保存成功', 'success');
                model.load();
                model.CurrentObj.ID = 0;
                model.currentName = '';
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
        model.CurrentObj.ID = obj.ID;
        $('#Delete_modal').modal('show');
    },
    Delete: function () {
        ajax.org.delgroup(model.CurrentObj.ID, model.groupId).done(function (data) {
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
exports.setGroupId = function (groupId, groupName) {
    model.groupId = groupId
    model.groupName = groupName;
    model.load();
    model.$init();
    avalon.vmodels.page.content = "org";
}
 
});