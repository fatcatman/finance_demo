
var App = require('app/layout');
//var Index = require('app/index');
jQuery(document).ready(function() {
    App.init();
    //Index.init(); 
   // initlayout and core plugins
   //Index.initJQVMAP(); // init index page's custom scripts
   //Index.initCalendar(); // init index page's custom scripts
   //Index.initCharts(); // init index page's custom scripts
   //Index.initChat();
  // Index.initMiniCharts();
   //Index.initDashboardDaterange();
   //Index.initIntro();
});

// 开始构建SPA框架
var avalon = require('vendor/avalon/avalon');

avalon.log("加载avalon完毕，开始构建根VM与加载其他模块");
avalon.config({
    loader: false
});

require('app/services/filterService');
var route = require('app/services/routeService')

avalon.templateCache.empty = "&nbsp;";
var vm = avalon.define({
    $id: 'root',
    header: 'empty',
    sidebar: 'empty',
    page: 'empty',
    footer: '页脚消息',
    title: '',
    describe: '',
    breads: [],

    // 路由相关属性
    currPath: '',
    params: {},
    query: {},
    args: '[]',

    // 提示框
    infoBox: {
        title: 'info',
        content: 'blablablabla',
        type: 'info'
    },
    // 确认框
    confirmBox: {
        title: 'confirm',
        content: 'blablablabla'
    },
    // 按钮文字
    okText: '确定',
    cancelText: '取消',
    $timeoutId: 0,

    $alert: function (title, content, type) {
        // 停止上一个动画过程，并初始化
        var box = $('.vanke-alert');
        if (vm.$timeoutId != 0) {
            clearTimeout(vm.$timeoutId);
        }
        box.stop(true, true);
        box.removeAttr('style');
        $('p,h4', box).show().css({opacity: 1});
        // 设置内容
        vm.infoBox.title = title;
        vm.infoBox.content = content;
        vm.infoBox.type = type;
        // 开始动画过程
        box.show().animate({ opacity: 1, left: 20 }, 1000, 'swing', function () {
            var $this = $(this);
            vm.$timeoutId = setTimeout(function () {
                $('p,h4', $this).fadeOut();
                $this.animate({ height: 3, padding: 0 }, 1000).animate({ width: 0 }, 1000, 'swing', function () {
                    $this.removeAttr('style');
                    $('p,h4', $this).show();
                });
            }, 3000);
        });
    },
    $confirm: function (title, content, confirmCb, cancelCb) {
        // 设置内容
        var box = $('.vanke-confirm');
        vm.confirmBox.title = title;
        vm.confirmBox.content = content;
        if (confirmCb != void 0 && avalon.isFunction(confirmCb)) {
            $('.vanke-ok', box).unbind('click').on('click', confirmCb);
        }
        if (cancelCb != void 0 && avalon.isFunction(cancelCb)) {
            box.on('hidden', function () {
                cancelCb();
            });
        }
        box.modal('show');
    }
});

require.async('app/views/header/header', function () {
    avalon.log("加载header完毕");
});

require.async('app/views/sidebar/sidebar', function () {
    avalon.log("加载sidebar完毕");
});

require.async('app/views/page/page', function () {
    avalon.log("加载page完毕");

    // 初始化路由匹配配置
    route.initRoute();

    avalon.scan(document.body);
});