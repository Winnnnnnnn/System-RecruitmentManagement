<%--
  Created by IntelliJ IDEA.
  User: 谢晓晓
  Date: 2019/2/24
  Time: 10:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>(顶部菜单栏布局模板)顶部菜单栏布局模板</title>
</head>
<body>
<%--顶部导航栏--%>
<div class="UserNavBar">
    <li><img src="../../../image/logo.png"></li>
    <li><a id="user_nav_home"><span class="glyphicon glyphicon-home"></span>&nbsp;找工作</a></li>
    <li><a id="user_nav_resume"><span class="glyphicon glyphicon-file"></span>&nbsp;简历</a></li>
    <li><a id="user_nav_user"><span class="glyphicon glyphicon-user"></span>&nbsp;我的</a></li>
    <li><a id="user_nav_name"></a></li>
    <li><a id="user_nav_logout">退出登录&nbsp;<span class="glyphicon glyphicon-log-in"></span></a></li>
</div>
</body>
</html>
