define('app/views/mediaregion/mediaregion', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="mediaregion">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <div class="clearfix">\r\n        \r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="ShowAdd()">\r\n            <i class="icon-plus">\r\n            </i>新增\r\n          </a>\r\n        </div>\r\n      </div>\r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th>\r\n              序号\r\n            </th>\r\n            <th>\r\n              名称\r\n            </th>\r\n            <th>\r\n              区域\r\n            </th>\r\n            <th>\r\n              管理\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList " style="max-height:600px;">\r\n            <td style="max-width:200px;">\r\n              {{$index+1}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.media.name}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.region.name}}\r\n            </td>\r\n            <td>\r\n              <a class="btn mini blue" ms-click="ShowUpdate(obj)">\r\n                修改\r\n              </a>\r\n              <a class="btn mini blue" ms-click="ShowDel(obj)">\r\n                删除\r\n              </a>\r\n            </td>\r\n\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    \r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <!--新增和修改-->\r\n  <div id="Add_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        {{isAdd=true?\'新增图片\':\'修改图片\'}}\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="BookFrom"  class="form-horizontal">\r\n          <div class="alert alert-error hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            请按照规则填写以下信息\r\n          </div>\r\n          <div class="alert alert-success hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            信息已通过验证，正在提交...\r\n          </div>\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="Name">\r\n                    资料名称:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <select ms-each="">\r\n                      <option></option>\r\n                    </select>\r\n                    <input type="text" name="Name" class="m-wrap span11" placeholder="资料名称" ms-duplex="CurrentObj.Name" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class="row-fluid">\r\n              <label for="Name">\r\n                社区：{{Regionname}}\r\n              </label>\r\n              <table class="table table-striped table-hover table-bordered">\r\n                <thead>\r\n                  <tr>\r\n                    <th style="width:102px">\r\n                      序号\r\n                    </th>\r\n                    <th>\r\n                      名称\r\n                    </th>\r\n                    <th style="width:200px">\r\n                      选择\r\n                    </th>\r\n                    <th style="width:200px">\r\n                      管理\r\n                    </th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr ms-if="RegionList.length==0" style="max-height:600px;">\r\n                    <td colspan="2">\r\n                      无数据\r\n                    </td>\r\n                    <td>\r\n                      <a ms-if="level!=1" href="javascript:;" class="btn blue" ms-click="SetPid(0,-1,0,0)">\r\n                        <i class="fa fa-arrow-circle-o-left"></i>上一级\r\n                      </a>\r\n                    </td>\r\n                    <td>\r\n                    </td>\r\n                  </tr>\r\n                  <tr class="" ms-repeat-obj="RegionList " style="max-height:600px;">\r\n                    <td style="max-width:200px;">\r\n                      {{$index+1}}\r\n                    </td>\r\n                    <td style="max-width:200px;">\r\n                      {{obj.name}}\r\n                    </td>\r\n                    <td>\r\n                      <a ms-if="level==1" href="javascript:;" class="btn blue disabled" ms-click="SetPid(obj.name,-1,0,0)">\r\n                        <i class="fa fa-arrow-circle-o-left"></i>上一级\r\n                      </a>\r\n                      <a ms-if="level!=1" href="javascript:;" class="btn blue" ms-click="SetPid(obj.name,-1,0,0)">\r\n                        <i class="fa fa-arrow-circle-o-left"></i>上一级\r\n                      </a>\r\n                      <a ms-if="level==3" href="javascript:;" class="btn green disabled" ms-click="SetPid(obj.name,1,obj.id,obj.pid)">\r\n                        <i class="fa fa-arrow-circle-o-right"></i>下一级\r\n                      </a>\r\n                      <a ms-if="level!=3" href="javascript:;" class="btn green" ms-click="SetPid(obj.name,1,obj.id,obj.pid)">\r\n                        <i class="fa fa-arrow-circle-o-right"></i>下一级\r\n                      </a>\r\n                    </td>\r\n                    <td>\r\n                      <a class="btn mini blue" ms-click="SetRegion(obj.id,obj.name)">\r\n                        选择\r\n                      </a>\r\n                    </td>\r\n\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n\r\n              <div class="clearfix">\r\n                <div class="btn-group">\r\n                  <a class="btn green" ms-click="PreviouPage()">\r\n                    <i class="icon-step-backward">\r\n                    </i>上一页\r\n                  </a>\r\n                  <a class="btn green" ms-click="PreviouPage()">\r\n                    {{RegioncurrentPage}}/{{RegionpageCount}}\r\n                  </a>\r\n                  <a class="btn green" ms-click="NextPage()">\r\n                    <i class="icon-step-forward">\r\n                    </i>下一页\r\n                  </a>\r\n                </div>\r\n              </div>\r\n\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="Save()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <!--删除组织机构窗口-->\r\n  <div id="Delete_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\r\n      <h3 id="deleteDialogLabel">删除</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要删除吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Delete()">确定</button>\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <!--文件上传窗口-->\r\n  <div id="uploadDialog" class="modal modal-large hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\r\n      <h3 id="deleteDialogLabel">上传文件(文件大小不要超过5M)</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <input id="file_upload" name="file_upload" type="file" multiple="true"/>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="ImgUpload()">上传</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.mediaregion = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "mediaregion",
    limit: 100,
    total: '',
    title:'宣传资料分级管理',
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    dataList: [],
    mediaList: [],
    imageId: 0,
    isvideo: false,
    RegionList: [],
    pid: 0,//当前级PID
    p_pid: 0,//上一级PID
    level: 1,
    level_name: '全区',
    p_level_name: '全区',//上级名称
    Regionname: '',
    RegioncurrentPage: 1,
    RegionpageCount: 0,
    Regionlimit: 10,
    RegionId: 0,
    CurrentObj: { ID: 0, Media: 0, Region: 0 },
    isAdd:true,
    load: function () {
        ajax.mediaregion.List(model.currentPage, model.limit, model.isvideo).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.total = data.total;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
        ajax.media.List(0, 0, model.isvideo).done(function (data) {
            model.mediaList = data.items;
        });
    },
    SetRegion: function (id, name) {
        model.CurrentObj.Region = id;
        model.Regionname = name;
        rootVm.$alert('提示', '选择[' + name + ']成功', 'info');
    },
    loadregion: function () {
        ajax.region.List(model.RegioncurrentPage, model.Regionlimit, model.pid).done(function (data) {
            model.RegionList = data.items;
            model.RegioncurrentPage = data.page;
            model.RegionpageCount = data.totalPage;
        });
    },
    SetPid: function (le_name, le, obj, pid) {
        model.level += le;

        if (le == -1) {
            if (model.p_pid != 0) {
                model.pid = model.p_pid;
                model.p_pid = 0;
                ///
                model.level_name = model.p_level_name;
            } else {
                model.pid = model.p_pid;
                model.p_pid = 0;
                model.level_name = '全区';
                model.p_level_name = '全区';
            }

        } else {
            model.p_level_name = model.level_name;
            model.level_name = le_name;
            model.pid = obj;
            model.p_pid = pid;
        }
        console.log(model.pid + "," + model.p_pid);
        model.RegioncurrentPage = 1;
        model.loadregion();
    },
    RegionPreviouPage: function () {
        if (model.RegioncurrentPage == 1) {
            rootVm.$alert('提示', '已经是第一页了', 'error');
        } else {
            model.RegioncurrentPage--;
            model.loadregion();
        }
    },
    RegionNextPage: function () {
        if (model.RegioncurrentPage == model.RegionpageCount) {
            rootVm.$alert('提示', '已经是最后一页了', 'error');
        } else {
            model.RegioncurrentPage++;
            model.loadregion();
        }
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
    ShowAdd: function () {
        model.CurrentObj.ID = 0;
        if (model.mediaList.length <= 0)
        {
            rootVm.$alert('提示', '请先添加新的宣传资料', 'error');
            return;
        }
        model.CurrentObj.Media = 0;
        model.CurrentObj.Region = 0;
        model.isAdd = true;
        $('#Add_modal').modal('show');
    },
    //初始化数据
    ShowUpdate: function (obj) {
        model.CurrentObj.ID = obj.id;
        model.CurrentObj.Name = obj.name;
        model.CurrentObj.Des = obj.des;
        model.isAdd = false;
        $('#Add_modal').modal('show');
    },
    Save: function () {
        if ($.trim(model.CurrentObj.Name) == '') {
            rootVm.$alert('提示', '名称不能为空', 'error');
            return;
        }
        ajax.mediaregion.save(model.CurrentObj.$model).done(function (data) {
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

    },
    updateFile: function (obj) {
        model.uploader[obj.$model.ID].upload();
    },
    ShowDel: function (obj) {
        model.CurrentObj.ID = obj.ID;
        $('#Delete_modal').modal('show');
    },
    Delete: function () {
        ajax.mediaregion.del(model.CurrentObj.ID).done(function (data) {
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
model.load();
model.$init();
avalon.vmodels.page.content = "mediaregion";
exports.setType = function (isvideo) {
    model.load();
    model.$init();
    model.isvideo = isvideo;
    avalon.vmodels.page.content = "mediaregion";
} 
});