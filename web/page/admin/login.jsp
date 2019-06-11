<%--
  Created by IntelliJ IDEA.
  User: 谢晓晓
  Date: 2019/1/13
  Time: 15:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <title>招聘管理系统</title>
        <link rel="stylesheet" href="../../css/base.css">
    </head>
    <body class="AdminLoginBody">
        <%--LOGO--%>
        <div class="AdminLoginLogo"></div>
        <div class="AdminLoginBg">
            <h1 class="AdminLoginTitle">管 理 员 登 录</h1>
            <div class="cf" style="margin-bottom: 20px;"></div>
            <%--用户名--%>
            <div class="AdminLoginEditBg">
                <img src="../../image/icon/user.png" width="25px" height="25px">
                <input id="name" type="text" placeholder="请输入用户名" autocomplete="off">
            </div>
            <div class="cf" style="margin-bottom: 20px;"></div>
            <%--密码--%>
            <div class="AdminLoginEditBg">
                <img src="../../image/icon/pwd.png" width="25px" height="25px">
                <input id="pwd" type="password" placeholder="请输入密码" autocomplete="off">
            </div>
            <div class="cf"></div>
            <%--登录按钮--%>
            <div id="login" class="AdminLoginButton"></div>
        </div>
        <%--导入jquery--%>
        <script src="../../js/libs/jquery-3.3.1.js"></script>
        <%--导入js--%>
        <script src="../../js/admin/login.js"></script>
    </body>
</html>
