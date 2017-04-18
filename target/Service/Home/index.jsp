 <%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>海淀区综合行政服务系统后台管理1</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="fragment" content="!" />
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<meta content="" name="description" />
	<meta content="" name="author" />
	<!-- BEGIN GLOBAL MANDATORY STYLES -->
	<link href="/Service/static/lib/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="/Service/static/lib/css/bootstrap-fileupload.css" rel="stylesheet" type="text/css"/>
	<link href="/Service/static/lib/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
	<link href="/Service/static/lib/css/bootstrap-modal.css" rel="stylesheet" type="text/css"/>
	<link href="/Service/static/lib/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="/Service/static/lib/css/style-metro.css" rel="stylesheet" type="text/css"/>
	<link href="/Service/static/lib/css/style.css" rel="stylesheet" type="text/css"/>
	<link href="/Service/static/lib/css/style-responsive.css" rel="stylesheet" type="text/css"/>
	<link href="/Service/static/lib/css/blue.css" rel="stylesheet" type="text/css" />
	<link href="/Service/static/lib/css/common.css" rel="stylesheet" type="text/css" />
    <link href="/Service/static/lib/css/attachment.css" rel="stylesheet" type="text/css" />
    <link href="/Service/static/lib/css/attachmenticon.css" rel="stylesheet" type="text/css" />
    <link href="/Service/static/lib/css/uploadify.css" rel="stylesheet" />
    <link href="/Service/static/lib/css/easydialog.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="/Service/static/lib/webuploader/webuploader.css">
	<!-- END GLOBAL MANDATORY STYLES -->
	<!-- BEGIN PAGE LEVEL STYLES --> 
	<link href="/Service/static/lib/css/datepicker.css" rel="stylesheet" type="text/css" />
    <link href="/Service/static/lib/css/select2_metro.css" rel="stylesheet" type="text/css"/>
    <link href="/Service/static/lib/css/multi-select-metro.css" rel="stylesheet" type="text/css" />
    <link href="/Service/static/lib/css/profile.css" rel="stylesheet" type="text/css"/>
    <link href="/Service/static/lib/css/lightbox.css" rel="stylesheet" type="text/css" />
    <!--加载邮件菜单样式-->
    <link href="/Service/static/lib/css/skins/cm_blue/style.css" rel="stylesheet" type="text/css"/>
    <!--覆盖字体-->
    <link href="/Service/static/lib/css/customize.css" rel="stylesheet" type="text/css" />
	<!-- END PAGE LEVEL STYLES -->
    <link href="/Service/static/lib/page/themes/blue/pace-theme-loading-bar.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .ms-controller,.ms-important,[ms-controller],[ms-important]{
            visibility: hidden;
        }
    </style>
    <script src="/Service/static/lib/mod.js" type="text/javascript"></script>
	<script type="text/javascript" >
require.resourceMap({
    "res": {
        "app/services/ajaxService": {
            "url": "/Service//static//modules/app/services/ajaxService.js"
        },
        "app/views/home/home": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/home/home.js"
        },
        "app/views/userCenter/userCenter": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/userCenter/userCenter.js"
        },
        "app/views/group/group": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/group/group.js"
        },
        "app/views/org/org": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/org/org.js"
        },
        "app/views/allorg/allorg": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/allorg/allorg.js"
        },
        "app/views/approval/approval": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/approval/approval.js"
        },
        "app/views/approval_org/approval_org": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/approval_org/approval_org.js"
        },
        "app/views/temp/temp": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/temp/temp.js"
        },
        "app/views/guide/guide": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/guide/guide.js"
        },
        "app/views/user/UserPwd": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/user/UserPwd.js"
        },
        "app/views/module/module": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/module/module.js"
        },
        "app/views/module/moduleparent": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/module/moduleparent.js"
        },
        "app/views/productCategory/productCategory": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/productCategory/productCategory.js"
        },
        "app/views/news/news": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/news/news.js"
        },
        "app/views/task/task": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/task/task.js"
        },
        "app/views/product/product": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/product/product.js"
        },
        "app/views/product/productdetail": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/product/productdetail.js"
        },
        "app/views/pad/pad": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/pad/pad.js"
        },
        "app/views/mediatype/mediatype": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/mediatype/mediatype.js"
        },
        "app/views/media/media": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/media/media.js"
        },
        "app/views/wxuser/wxuser": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/wxuser/wxuser.js"
        },
        "app/views/manager/manager": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/manager/manager.js"
        },
        "app/views/image/image": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/image/image.js"
        },
        "app/views/message/message": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/message/message.js"
        },
        "app/views/edit/edit": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/edit/edit.js"
        },
        "app/views/header/header": {
            "deps": [
                "app/services/ajaxService"
            ],
            "url": "/Service//static//modules/app/views/header/header.js"
        },
        "app/services/tmplService": {
            "url": "/Service//static//modules/app/services/tmplService.js"
        },
        "app/views/sidebar/sidebar": {
            "deps": [
                "app/services/tmplService"
            ],
            "url": "/Service//static//modules/app/views/sidebar/sidebar.js"
        },
        "app/views/page/page": {
            "url": "/Service//static//modules/app/views/page/page.js"
        }
    },
    "pkg": {}
});
</script>

<script type="text/javascript" src="/Service//static//modules/app/layout.js"></script>
<script type="text/javascript" src="/Service//static//modules/vendor/avalon/avalon.js"></script>
<script type="text/javascript" src="/Service//static//modules/app/services/filterService.js"></script>
<script type="text/javascript" src="/Service//static//modules/vendor/avalon/mmHistory.js"></script>
<script type="text/javascript" src="/Service//static//modules/vendor/avalon/mmRouter.js"></script>
<script type="text/javascript" src="/Service//static//modules/app/services/routeService.js"></script>
<script type="text/javascript" src="/Service//static//modules/app/main.js"></script>

</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="page-header-fixed page-footer-fixed" ms-controller="root">

	<!-- BEGIN HEADER -->
	<div class="header navbar navbar-inverse navbar-fixed-top">
		<!-- BEGIN TOP NAVIGATION BAR -->
		<div class="navbar-inner">
			<div ms-include-src="header"></div>
		</div>
		<!-- END TOP NAVIGATION BAR -->
	</div>
	<!-- END HEADER -->
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
		<!-- BEGIN SIDEBAR -->
		<div class="page-sidebar nav-collapse collapse">
			<!-- BEGIN SIDEBAR MENU -->
			<div ms-include-src="sidebar"></div>
			<!-- END SIDEBAR MENU -->
		</div>
		<!-- END SIDEBAR -->
		<!-- BEGIN PAGE -->
		<div class="page-content">
			<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<div id="portlet-config" class="modal hide">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button"></button>
					<h3>Widget Settings</h3>
				</div>
				<div class="modal-body">
					Widget settings form goes here
				</div>
			</div>
			<!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<!-- BEGIN PAGE CONTAINER-->
			<div class="container-fluid">
				<!-- BEGIN PAGE HEADER-->
				<div class="row-fluid">
					<div class="span12">
						<!-- BEGIN STYLE CUSTOMIZER -->

						<!-- END BEGIN STYLE CUSTOMIZER -->    
						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<h3 class="page-title">
							{{title}} <small>{{describe}}</small>
						</h3>
						<ul class="breadcrumb">
							<li ms-repeat-bread="breads">
								<i ms-class="{{bread.icon}}"></i>
								<a ms-href="{{bread.href}}">{{bread.title}}</a>
								<i ms-if="!$last" class="icon-angle-right"></i> 
							</li>
						</ul>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>
				<!-- END PAGE HEADER-->
				<div>
					<!-- BEGIN DASHBOARD STATS -->
					<div ms-include-src="page"></div>
				</div>
			</div>
			<!-- END PAGE CONTAINER-->    
		</div>
		<!-- END PAGE -->
	</div>
	<!-- END CONTAINER -->
	<!-- BEGIN FOOTER -->
	<div class="footer">
		<div class="footer-inner">
			
		</div>
		<div class="footer-tools">
			<span class="go-top">
			<i class="icon-angle-up"></i>
			</span>
		</div>
	</div>
	<!-- END FOOTER -->
    <!-- BEGIN INFO -->
    <div class="alert alert-block vanke-alert span3" ms-class="alert-{{infoBox.type}}">
        <h4 class="alert-heading">{{infoBox.title}}</h4>
        <p>{{infoBox.content}}</p>
    </div>
    <!-- END INFO -->
    <!-- BEGIN CONFIRM -->
    <div class="modal hide fade vanke-confirm">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3>{{confirmBox.title}}</h3>
        </div>
        <div class="modal-body">
            <p>{{confirmBox.content}}</p>
        </div>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">{{cancelText}}</button>
            <button class="btn btn-primary red vanke-ok">{{okText}}</button>
        </div>
    </div>
    <!-- END CONFIRM -->

	<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
	<!-- BEGIN CORE PLUGINS -->
	<script src="/Service/static/lib/jquery/jquery-1.10.1.min.js" type="text/javascript"></script>
	<script src="/Service/static/lib/jquery/bootstrap.min.js" type="text/javascript"></script>
    <script src="/Service/static/lib/jquery/bootstrap-fileupload.js" type="text/javascript"></script>
    <script src="/Service/static/lib/jquery/jquery.uploadify.js" type="text/javascript"></script>
    <script src="/Service/static/lib/jquery/dateUtil.js" type="text/javascript"></script>
    <script src="/Service/static/lib/jquery/jquery.jeegoocontext-2.0.0.min.js" type="text/javascript"></script>
	<!--[if lt IE 9]>
	<script src="/Service/static/lib/excanvas.min.js"></script>
	<script src="/Service/static/lib/respond.min.js"></script>  
	<![endif]-->   
	<!-- END CORE PLUGINS -->
	<!-- BEGIN PAGE LEVEL PLUGINS -->
        <script src="/ueditor/ueditor.config.js" type="text/javascript"></script>
    <script src="/ueditor/ueditor.all.js" type="text/javascript"></script>


    <script src="/Service/static/lib/jquery/bootstrap-datepicker.js" type="text/javascript"></script>
    <script src="/Service/static/lib/jquery/select2.min.js" type="text/javascript"></script>
    <script src="/Service/static/lib/jquery/jquery.validate.min.js" type="text/javascript"></script>
    <script src="/Service/static/lib/jquery/jquery.dataTables.js" type="text/javascript"></script>
    <script src="/Service/static/lib/jquery/bootstrap-modal.js" type="text/javascript"></script>
    <script src="/Service/static/lib/jquery/bootstrap-modalmanager.js" type="text/javascript"></script>
    <script src="/Service/static/lib/jquery/ajaxfileupload.js" type="text/javascript"></script>
    <script src="/Service/static/lib/jquery/easydialog.min.js" type="text/javascript"></script>
    <script src="/Service/static/lib/jquery/pace.min.js" type="text/javascript"></script>
    <script src="/Service/static/lib/lightbox.js" type="text/javascript"></script>
    <script type="text/javascript" src="/Service/static/lib/webuploader/webuploader.js"></script>
    <script src="http://api.map.baidu.com/api?v=2.0&ak=85cPXIQjnGe3CguHl3cTx8qh" type="text/javascript"></script>
	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<!-- END PAGE LEVEL SCRIPTS -->
    <script type="text/javascript">
        require('app/main');
    </script>
	<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>