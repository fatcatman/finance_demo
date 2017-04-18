// fis.config.set('modules.postpackager', 'simple');

// fis.config.set('pack', {
//     'pkg/jquery.plugin.js': [
//         '/modules/vendor/jquery/jquery.**.js'
//     ]
// });

//静态资源域名，使用pure release命令时，添加--domains或-D参数即可生效
//fis.config.set('roadmap.domain', 'http://localhost:9471');
fis.config.set('roadmap.domain', '');
//如果要兼容低版本ie显示透明png图片，请使用pngquant作为图片压缩器，
//否则png图片透明部分在ie下会显示灰色背景
//使用spmx release命令时，添加--optimize或-o参数即可生效
//fis.config.set('settings.optimzier.png-compressor.type', 'pngquant');

//设置jshint插件要排除检查的文件，默认不检查lib、jquery、backbone、underscore等文件
//使用pure release命令时，添加--lint或-l参数即可生效
fis.config.set('settings.lint.jshint.ignored', ['/Service/static/lib/**', /jquery|backbone|underscore/i]);

fis.config.merge({
    deploy: {
        local: {
            to: '../../webapp/'
        }
    },
    domian:{
        '**.css':'http://localhost:8080'
    }
});

if (!fis.config.get('roadmap.path')) {
    fis.config.set('roadmap.path', []);
}
fis.config.set('dist', '/Dist');
fis.config.set('settings.postpackager.autoload.useInlineMap', true);
fis.config.get('roadmap.path').unshift({
    reg: '/bin/**',
    release: false
}, {
    reg: '/obj/**',
    release: false
}, {
    reg: '/Properties/**',
    release: false
}, {
    reg: '**.bat',
    release: false
}, {
    reg: 'index.html',
    release: true
}, {
    reg: 'FrontEnd.csproj',
    release: false
}, {
    reg: 'FrontEnd.csproj.user',
    release: false
}, {
    reg: '/Home/index.html',
    isHtmlLike: true,
	release: '/Home/index.html',
	url: '/Service/Home/index.html'
}, {
    reg: '/Manager/login.html',
    isHtmlLike: true,
	release: '/Manager/login.html',
	url: '/Service/Manager/login.html'
}, {
	//modules目录下的其他脚本文件
	reg: /^\/modules\/(.*)\.(js)$/i,
	//是组件化的，会被jswrapper包装
	isMod: true,
	//id是去掉modules和.js后缀中间的部分
	id: '$1',
	release: '${statics}/$&',
	url: '/Service/${statics}/$&'
}, {
	//前端模板
	reg: '**.tmpl',
	//当做类js文件处理，可以识别__inline, __uri等资源定位标识
	isJsLike: true,
	//只是内嵌，不用发布
	release: false
}, {
	reg : /^\/modules\/(.*)/i,
	release: '/static/modules/$1',
	url: '/Service/static/modules/$1'
}, {
	reg : /^\/lib\/(.*)/i,
	release: '/static/lib/$1',
	url: '/Service/static/lib/$1'
});
 