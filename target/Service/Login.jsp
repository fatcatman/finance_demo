<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!--> <html lang="zh"> <!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
	<meta charset="gbk">
	<title>管理员登陆</title>
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<meta content="" name="description" />
	<meta content="" name="author" />
	<!-- BEGIN GLOBAL MANDATORY STYLES -->
	<link href="../../lib/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="../../lib/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
	<link href="../../lib/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="../../lib/css/style-metro.css" rel="stylesheet" type="text/css"/>
	<link href="../../lib/css/style.css" rel="stylesheet" type="text/css"/>
	<link href="../../lib/css/style-responsive.css" rel="stylesheet" type="text/css"/>
	<link href="../../lib/css/default.css" rel="stylesheet" type="text/css" id="style_color"/>
	<link href="../../lib/css/uniform.default.css" rel="stylesheet" type="text/css"/>
    <link href="../../lib/page/themes/blue/pace-theme-loading-bar.css" rel="stylesheet" type="text/css"/>
	<!-- END GLOBAL MANDATORY STYLES -->
	<!-- BEGIN PAGE LEVEL STYLES -->
	<link href="../../lib/css/login-soft.css" rel="stylesheet" type="text/css"/>
	<!-- END PAGE LEVEL STYLES -->
    <!--覆盖字体-->
    <link href="../../lib/css/customize.css" rel="stylesheet" type="text/css" />
    <link href="../../lib/css/drag.css" rel="stylesheet" type="text/css" />
    <script src="../../lib/mod.js" type="text/javascript"></script>

<script type="text/javascript" src="/Service//static//modules/app/layout.js"></script>
<script type="text/javascript" src="/Service//static//modules/app/login.js"></script>

</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="login">
	<!-- BEGIN LOGO -->
	<div class="logo" style="margin-top:40px;">
		<img src="../../lib/image/logo-index.png" alt="" />
	</div>
	<!-- END LOGO -->
    <div class="container-fluid" style="margin-top:30px;">
    <div class=" row-fluid" >
    <div class="span12">
        <div class="span12">
        	<div class="content">
		<!-- BEGIN LOGIN FORM -->
		<form class="form-vertical login-form" method="post" action="/User/Login" onsubmit="return false;">
			<h3 class="form-title"></h3>
			<div class="alert alert-error hide">
				<button class="close" data-dismiss="alert"></button>
				<span>Enter any username and password.</span>
			</div>
			<div class="control-group">
				<!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
				<label class="control-label visible-ie8 visible-ie9">Username</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-user"></i>
						<input class="m-wrap placeholder-no-fix" type="text" placeholder="请输入用户名" name="username"/>
					</div>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label visible-ie8 visible-ie9">Password</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-lock"></i>
						<input class="m-wrap placeholder-no-fix" type="password"  placeholder="请输入密码" name="password"/>
					</div>
				</div>
			</div>
            <div id="drag">
            </div>
			<div class="form-actions">
				<label class="checkbox">
				<input type="checkbox" name="remember" value="1"/> 记住密码
				</label>
				<button type="submit" class="btn green pull-right">
					登录 <i class="m-icon-swapright m-icon-white"></i>
				</button>            
			</div>
		</form>
		<!-- END LOGIN FORM -->        
	</div>
        </div>
    </div>
	</div>
    </div>
    <!-- BEGIN LOGIN -->

	<!-- END LOGIN -->
    <!-- BEGIN INFO -->
    <div class="alert alert-block vanke-alert span3" ms-class="alert-info">
        <h4 class="alert-heading">{{infoBox.title}}</h4>
        <p>{{infoBox.content}}</p>
    </div>
    <!-- END INFO -->
	<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
	<!-- BEGIN CORE PLUGINS -->
	<script src="../../lib/jquery/jquery-1.10.1.min.js" type="text/javascript"></script>
	<script src="../../lib/jquery/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
    <script src="../../lib/jquery/jquery.backstretch.min.js" type="text/javascript"></script>
    <script src="../../lib/jquery/jquery.SuperSlide.2.1.1.js" type="text/javascript"></script>
	<!-- IMPORTANT! Load jquery-ui-1.10.1.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
	<script src="../../lib/jquery/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>      
	<script src="../../lib/jquery/bootstrap.min.js" type="text/javascript"></script>
	<!--[if lt IE 9]>
	<script src="../../lib/jquery/excanvas.min.js"></script>
	<script src="../../lib/jquery/respond.min.js"></script>  
	<![endif]-->   
	<script src="../../lib/jquery/jquery.slimscroll.min.js" type="text/javascript"></script>
	<script src="../../lib/jquery/jquery.blockui.min.js" type="text/javascript"></script>  
	<script src="../../lib/jquery/jquery.cookie.min.js" type="text/javascript"></script>
	<script src="../../lib/jquery/jquery.uniform.min.js" type="text/javascript" ></script>
	<!-- END CORE PLUGINS -->
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script src="../../lib/jquery/jquery.validate.min.js" type="text/javascript"></script>
    <script src="../../lib/jquery/pace.min.js" type="text/javascript"></script>
    <script src="../../lib/drag.js" type="text/javascript"></script>
	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN PAGE LEVEL SCRIPTS -->     
	<!-- END PAGE LEVEL SCRIPTS --> 
    <script type="text/javascript">
        require('app/login');
    </script>
	<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>