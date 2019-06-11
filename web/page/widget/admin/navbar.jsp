<%--
  Created by IntelliJ IDEA.
  User: 谢晓晓
  Date: 2019/2/20
  Time: 12:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>(管理员)顶部菜单栏布局模板</title>
</head>
<body>
<%--顶部导航栏--%>
<ul class="AdminNavBar">
    <li><img src="../../../image/logo.png"></li>
    <li id="admin_nav_posts"><a><span class="glyphicon glyphicon-home"></span>&nbsp;岗位管理</a></li>
    <li id="admin_nav_user"><a><span class="glyphicon glyphicon-user"></span>&nbsp;用户管理</a></li>
    <li id="admin_nav_admin"><a><span class="glyphicon glyphicon-lock"></span>&nbsp;管理员管理</a></li>
    <li><a><span id="admin_nav_name"></span></a></li>
    <li id="admin_nav_logout"><a>退出登录&nbsp;<span class="glyphicon glyphicon-log-in"></span></a></li>
</ul>
</body>
</html>
