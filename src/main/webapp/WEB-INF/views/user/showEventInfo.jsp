<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
	<link href="css/styles.css?v=1.1" rel="stylesheet" type="text/css"/>
	<link href="css/blue.css" rel="stylesheet" type="text/css"/>
	<link href="css/jquery.bigautocomplete.css" rel="stylesheet" type="text/css"/>

	<link href="css/members.css" rel="stylesheet" type="text/css"/>

<title>办事指南</title>
<style>
 .show_zn td{min-width:100px}
</style>
</head>
<body style="    overflow-x: hidden;">
<div class="main" style="margin-top: 10px;overflow-x:hidden">
	<div class="show_zn">
		<c:if test="${html==null}">
			<table><tr><td colspan='2' align='center'>没有查询到结果数据！</td></tr></table>
		</c:if>
		<c:if test="${html!=null}">
			${html}
		</c:if>
	</div>
</div>

</body>
</html>
