define('app/views/evaluate/evaluate', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="evaluate">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <div class="clearfix">\r\n        \r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="ShowAddPic()">\r\n            <i class="icon-plus">\r\n            </i>导出到Excel\r\n          </a>\r\n          <input type="text" ms-duplex="params" style="margin-bottom: 0px;margin-left:30px" placeholder="关键字"/>\r\n          <a class="btn blue" ms-click="Search()" style="margin-left:5px">\r\n            <i class="icon-search">\r\n            </i>查询\r\n          </a>\r\n        </div>\r\n        \r\n      </div>\r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th>\r\n              序号\r\n            </th>\r\n            <th>\r\n              排队号\r\n            </th>\r\n            <th>\r\n              事项ID\r\n            </th>\r\n            <th>\r\n              事项名称\r\n            </th>\r\n            <th>\r\n              员工编号\r\n            </th>\r\n            <th>\r\n              员工姓名\r\n            </th>\r\n            <th>\r\n              评级\r\n            </th>\r\n            <th>\r\n              评语\r\n            </th>\r\n            <th>\r\n              时间\r\n            </th>\r\n            <th>\r\n              外屏序列号\r\n            </th>\r\n            <th>\r\n              管理\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList " style="max-height:600px;">\r\n            <td style="max-width:200px;">\r\n              {{$index+1}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.queueNum}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.EventId}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.EventName}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.userid}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.username}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.level}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.content}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.time}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.PandSN}}\r\n            </td>      \r\n            <td>\r\n              <a class="btn mini blue" ms-click="ShowDel(obj)">\r\n                删除\r\n              </a>\r\n            </td>\r\n\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    \r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <!--新增和修改-->\r\n  <div id="Add_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        {{isAdd=true?\'新增图片\':\'修改图片\'}}\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="BookFrom"  class="form-horizontal">\r\n          <div class="alert alert-error hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            请按照规则填写以下信息\r\n          </div>\r\n          <div class="alert alert-success hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            信息已通过验证，正在提交...\r\n          </div>\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="Name">\r\n                    图片名称:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <input type="text" name="Account" class="m-wrap span11" placeholder="图片名称" ms-duplex="CurrentObj.Name" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class="row-fluid">\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="Name">\r\n                    图片类型:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <select ms-duplex="CurrentObj.Type">\r\n                      <option value="欢迎">欢迎图片</option>\r\n                      <option value="屏保">屏保图片</option>\r\n                    </select>\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="Save()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <!--删除组织机构窗口-->\r\n  <div id="Delete_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\r\n      <h3 id="deleteDialogLabel">删除</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要删除吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Delete()">确定</button>\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <!--文件上传窗口-->\r\n  <div id="uploadDialog" class="modal modal-large hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\r\n      <h3 id="deleteDialogLabel">上传文件(文件大小不要超过5M)</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <input id="file_upload" name="file_upload" type="file" multiple="true"/>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="ImgUpload()">上传</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.evaluate = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "evaluate",
    limit: 20,
    total: '',
    title:'评价管理',
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    dataList: [],
    imageId: 0,
    params:'',
    CurrentObj: { ID: '', Name: '', Type: '' },
    isAdd:true,
    load: function () {
        ajax.evaluate.List(model.currentPage, model.limit,model.params).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.total = data.total;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    Search: function () {
        model.currentPage = 1;
        model.load();
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
    ShowSetActivityGroupWin: function (record) {
        model.CurrentUser = record.$model;
        $("#ShowSetActivityGroupWin").modal('show');
    },
    SetActivityGroup: function (groupId) {
        ajax.user.setActivityGroup(groupId, model.CurrentUser.ID).done(function (data) {
            if (data.success) {
                model.load();
                $("#ShowSetActivityGroupWin").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    ShowAddPic: function () {
        model.CurrentObj.ID = 0;
        model.CurrentObj.Name = '';
        model.CurrentObj.Type = '欢迎';
        model.isAdd = true;
        $('#Add_modal').modal('show');
    },
    //初始化数据
    ShowUpdatePic: function (obj) {
        model.CurrentObj.ID = obj.ID;
        model.CurrentObj.Name = obj.Name;
        model.CurrentObj.Type = obj.Type;
        model.isAdd = false;
        $('#Add_modal').modal('show');
    },
    Save: function () {
        if ($.trim(model.CurrentObj.Name) == '') {
            rootVm.$alert('提示', '名称不能为空', 'error');
            return;
        }
        ajax.evaluate.save(model.CurrentObj.$model).done(function (data) {
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
    Picinit: function (obj) {
        model.imageId = obj.$model.ID;
        $('#uploadDialog').modal('show');
    },
    ImgUpload: function () {
        $.ajaxFileUpload({
            url: '/Image/UploadFile',
            secureuri: false,
            data: { id: model.imageId },
            fileElementId: 'file_upload',
            dataType: 'text',
            success: function (data) {
                if (data == '1') {
                    rootVm.$alert('提示', '请选择合适的图片', 'error');
                } else if (data == '2') {
                    rootVm.$alert('提示', '上传成功', 'success');
                    $('#uploadDialog').modal('hide');
                    model.load();
                } else if (data == '0') {
                    rootVm.$alert('提示', '上传失败', 'error');
                }

            },
            error: function (data) {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    //初始化数据
    $init: function () {
        model.load();
     
    },
    updateFile: function (obj) {
        model.uploader[obj.$model.ID].upload();
    },
    ShowDel: function (obj) {
        model.CurrentObj = obj.$model;
        $('#Delete_modal').modal('show');
    },
    Delete: function () {
        ajax.evaluate.del(model.CurrentObj.ID).done(function (data) {
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
avalon.vmodels.page.content = "evaluate"; 
});