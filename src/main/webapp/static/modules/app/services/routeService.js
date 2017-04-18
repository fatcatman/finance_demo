define('app/services/routeService', function(require, exports, module){ 
var avalon = require('vendor/avalon/mmRouter');

function initRoute() {
    var rootVm = avalon.vmodels.root;
    var menuVm = avalon.vmodels.sidebar;

    avalon.router.get('/', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'home',
            title: '首页',
            breads: [{
                icon: 'icon-home',
                title: '首页',
                href: 'javascript:;'
            }]
        });
        require.async('app/views/home/home', function (m) {
            m.reload();
        });
    });

    // 个人中心
    avalon.router.get('/profile', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'userCenter',
            title: '我的信息',
            breads: [{
                icon: 'icon-user',
                title: '个人中心',
                href: 'javascript:;'
            }, {
                icon: 'icon-info-sign',
                title: '我的信息',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/userCenter/userCenter', function () {
            avalon.vmodels.page.content = 'userCenter';
        });
    });
    // 分组管理
    avalon.router.get('/group', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'group',
            title: '分组管理',
            breads: [{
                icon: 'icon-group',
                title: '分组管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/group/group', function () {
            avalon.vmodels.page.content = 'group';
        });
    });
    // 参数管理
    avalon.router.get('/parameter', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'parameter',
            title: '参数管理',
            breads: [{
                icon: 'icon-tags',
                title: '参数管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/parameter/parameter', function () {
            avalon.vmodels.page.content = 'parameter';
        });
    });
    // 员工信息管理
    avalon.router.get('/employee', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'employee',
            title: '员工信息管理',
            breads: [{
                icon: 'icon-group',
                title: '员工信息管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/employee/employee', function () {
            avalon.vmodels.page.content = 'employee';
        });
    });
    // 月度福保处理管理（员工单位）
    avalon.router.get('/reportingData/:employeeId/:employeeName/:idNumber', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'reportingData',
            title: '月度福保处理（员工单位）',
            breads: [{
                icon: 'icon-star',
                title: '月度福保处理（员工单位）',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/reportingData/reportingData', function (m) {
        	m.setEmployeeInfo(params.employeeId, params.employeeName, params.idNumber, params.isHandled);
            avalon.vmodels.page.content = 'reportingData';
        });
    });
    // 月度福保处理管理（全员）
    avalon.router.get('/welfare', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'welfare',
            title: '月度福保处理（全员）',
            breads: [{
                icon: 'icon-star',
                title: '月度福保处理（全员）',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/welfare/welfare', function () {
            avalon.vmodels.page.content = 'welfare';
        });
    });
    // 机构管理
    avalon.router.get('/org/:groupId/:groupName', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'org',
            title: '机构管理',
            breads: [{
                icon: 'icon-group',
                title: '分组管理',
                href: '#!/group'
            }, {
                icon: 'icon-sitemap',
                title: '机构管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/org/org', function (m) {
            m.setGroupId(params.groupId, params.groupName);
            avalon.vmodels.page.content = 'org';
        });
    });
    // 机构管理
    avalon.router.get('/allorg', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'allorg',
            title: '机构管理',
            breads: [{
                icon: 'icon-sitemap',
                title: '机构管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/allorg/allorg', function () {
            avalon.vmodels.page.content = 'allorg';
        });
    });
    // 事项管理
    avalon.router.get('/approval/:orgId/:orgName', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'approval',
            title: '事项管理',
            breads: [{
                icon: 'icon-group',
                title: '分组管理',
                href: '#!/group'
            }, {
                icon: 'icon-sitemap',
                title: '机构管理',
                href: '#!/allorg'
            }, {
                icon: 'icon-tags',
                title: '事项管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/approval/approval', function (m) {
            m.setOrgId(params.orgId, params.orgName);
            avalon.vmodels.page.content = 'approval';
        });
    });
    // 事项管理
    avalon.router.get('/approval_org/:orgId/:orgName/:Type/:group/:groupName', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'approval_org',
            title: '事项管理',
            breads: [{
                icon: 'icon-group',
                title: '分组管理',
                href: '#!/group'
            }, {
                icon: 'icon-sitemap',
                title: '机构管理',
                href: '#!/allorg'
            }, {
                icon: 'icon-tags',
                title: '事项管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/approval_org/approval_org', function (m) {
            m.setOrgId(params.orgId, params.orgName, params.Type, params.group, params.groupName);
            avalon.vmodels.page.content = 'approval_org';
        });
    });
    // 模板管理
    avalon.router.get('/temp/:approvalId/:approvalName/:OrgId/:OrgName/:Type', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'temp',
            title: '模板管理',
            breads: [{
                icon: 'icon-group',
                title: '分组管理',
                href: '#!/group'
            }, {
                icon: 'icon-sitemap',
                title: '机构管理',
                href: '#!/allorg'
            }, {
                icon: 'icon-tags',
                title: '事项管理',
                href: '#!/approval/0/全部'
            }, {
                icon: 'icon-book',
                title: '模板管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/temp/temp', function (m) {
            m.setApprovalId(params.approvalId, params.approvalName, params.OrgId, params.OrgName, params.Type);
            avalon.vmodels.page.content = 'temp';
        });
    });
    // 模板管理
    avalon.router.get('/guide/:approvalId/:approvalName/:OrgId/:OrgName/:Type', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'temp',
            title: '办事指南管理',
            breads: [{
                icon: 'icon-group',
                title: '分组管理',
                href: '#!/group'
            }, {
                icon: 'icon-sitemap',
                title: '机构管理',
                href: '#!/allorg'
            }, {
                icon: 'icon-tags',
                title: '事项管理',
                href: '#!/approval/0/全部'
            }, {
                icon: 'icon-book',
                title: '办事指南管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/guide/guide', function (m) {
            m.setApprovalId(params.approvalId, params.approvalName, params.OrgId, params.OrgName, params.Type);
            avalon.vmodels.page.content = 'guide';
        });
    });
    // 用户密码管理
    avalon.router.get('/UserPwd/:userId', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'UserPwd',
            title: '用户密码管理',
            breads: [{
                icon: 'icon-user',
                title: '用户管理',
                href: 'javascript:;'
            }, {
                icon: 'icon-info-sign',
                title: '用户密码管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/user/UserPwd', function (m) {
            m.setUserId(params.userId);
            avalon.vmodels.page.content = 'UserPwd';
        });
    });

    // 页面模块管理
    avalon.router.get('/module/:pagename', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'module',
            title: '网页模块管理',
            breads: [{
                icon: 'icon-book',
                title: '网页模块管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/module/module', function (m) {
            m.setPageName(params.pagename);
            avalon.vmodels.page.content = 'module';
        });
    });
    // 页面管理
    avalon.router.get('/moduleparent', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'module',
            title: '网页列表',
            breads: [{
                icon: 'icon-book',
                title: '网页列表',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/module/moduleparent', function () {
            avalon.vmodels.page.content = 'moduleparent';
        });
    });
    // 活动管理
    avalon.router.get('/productCategory', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'productCategory',
            title: '分类管理',
            breads: [{
                icon: 'icon-book',
                title: '分类管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/productCategory/productCategory', function (m) {
            m.setPID(0);
            avalon.vmodels.page.content = 'productCategory';
        });
    });
    // 文章管理
    avalon.router.get('/news', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'news',
            title: '文章管理',
            breads: [{
                icon: 'icon-book',
                title: '文章管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/news/news', function () {
            avalon.vmodels.page.content = 'news';
        });
    });
    // 任务管理
    avalon.router.get('/task', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'task',
            title: '任务管理',
            breads: [{
                icon: 'icon-book',
                title: '任务管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/task/task', function () {
            avalon.vmodels.page.content = 'task';
        });
    });
    // 商品管理
    avalon.router.get('/product', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'product',
            title: '产品管理',
            breads: [{
                icon: 'icon-book',
                title: '产品管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/product/product', function () {
            avalon.vmodels.page.content = 'product';
        });
    });

    // 商品管理
    avalon.router.get('/productdetail/:productId', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'product',
            title: '子类产品管理',
            breads: [{
                icon: 'icon-book',
                title: '子类产品列表',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/product/productdetail', function (m) {
            m.setPId(params.productId);
            avalon.vmodels.page.content = 'productdetail';
        });
    });
    // PAD管理
    avalon.router.get('/pad', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'pad',
            title: 'PAD管理',
            breads: [{
                icon: 'icon-book',
                title: 'PAD列表',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/pad/pad', function (m) {
            //m.setType(params.isvideo);
            avalon.vmodels.page.content = 'pad';
        });
    });
    // 多媒体类别管理
    avalon.router.get('/mediatype/:isvideo', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'mediatype',
            title: '多媒体类别管理',
            breads: [{
                icon: 'icon-book',
                title: '多媒体类别列表',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/mediatype/mediatype', function (m) {
            m.setType(params.isvideo);
            avalon.vmodels.page.content = 'media';
        });
    });
    // 多媒体管理
    avalon.router.get('/media/:isvideo', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'media',
            title: '多媒体管理',
            breads: [{
                icon: 'icon-book',
                title: '多媒体列表',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/media/media', function (m) {
            m.setType(params.isvideo);
            avalon.vmodels.page.content = 'media';
        });
    });

    // 参与任务的微信用户
    avalon.router.get('/wxuser/:taskid', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'product',
            title: '参与用户管理',
            breads: [{
                icon: 'icon-book',
                title: '参与用户列表',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/wxuser/wxuser', function (m) {
            m.setTaskId(params.taskid);
            avalon.vmodels.page.content = 'wxuser';
        });
    });

    // 管理员管理
    avalon.router.get('/manager', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'manager',
            title: '管理员管理',
            breads: [{
                icon: 'icon-user',
                title: '管理员管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/manager/manager', function () {
            avalon.vmodels.page.content = 'manager';
        });
    });
    // 图片管理
    avalon.router.get('/image', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'image',
            title: '图片管理',
            breads: [{
                icon: 'icon-picture',
                title: '图片管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/image/image', function () {
            avalon.vmodels.page.content = 'image';
        });
    });
    //留言板
    avalon.router.get('/message', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'message',
            title: '留言板',
            breads: [{
                icon: 'icon-book',
                title: '留言板',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/message/message', function () {
            avalon.vmodels.page.content = 'message';
        });
    });
	 // 新闻
    avalon.router.get('/edit', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'edit',
            title: '新闻列表',
            breads: [{
                icon: 'icon-book',
                title: '新闻列表',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/edit/edit', function () {
            avalon.vmodels.page.content = 'edit';
        });
    });
    avalon.history.start({
        basepath: "/Home/Index"
    });
}

function setParams(rootVm, menuVm, opts) {
    rootVm.currPath = this.path
    var params = this.params
    rootVm.params = params
    rootVm.query = this.query
    //rootVm.args = "[" + [].slice.call(arguments, 0) + "]"

    // 菜单的视图变化
    //menuVm.actived = opts.actived;
    // 标题的变化
    rootVm.title = opts.title;
    // 组装面包屑
    rootVm.breads = opts.breads.length ? opts.breads : rootVm.bread;
}

exports.initRoute = initRoute; 
});