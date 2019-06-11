<%--
  Created by IntelliJ IDEA.
  User: 谢晓晓
  Date: 2019/2/23
  Time: 11:43
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
    <body>
        <%--用户登录/注册页--%>
        <div class="UserLoginBody">
            <%--LOGO--%>
            <div class="UserLoginLogo"></div>
            <%--登录框--%>
            <div id="login_bg" class="UserLoginBg">
                <h1 class="UserLoginTitle">用 户 登 录</h1>
                <div class="cf" style="margin-bottom: 20px;"></div>
                <%--手机号--%>
                <div class="UserLoginEditBg">
                    <img src="../../image/icon/user.png" width="25px" height="25px">
                    <input id="login_phone" type="text" placeholder="请输入手机号" autocomplete="off" onkeyup="value=value.replace(/[^\d]/g,'')">
                </div>
                <div class="cf" style="margin-bottom: 20px;"></div>
                <%--密码--%>
                <div class="UserLoginEditBg">
                    <img src="../../image/icon/pwd.png" width="25px" height="25px">
                    <input id="login_pwd" type="password" placeholder="请输入密码" autocomplete="off">
                </div>
                <div class="cf" style="margin-bottom: 20px;"></div>
                <%--注册--%>
                <div id="open_sign_up" class="UserSignUpLabel">账号注册</div>
                <div class="cf"></div>
                <%--登录按钮--%>
                <div id="login" class="UserLoginButton"></div>
            </div>
            <%--注册框--%>
            <div id="sign_up_bg" class="UserLoginBg UserSignUpBg">
                <h1 class="UserLoginTitle">用 户 注 册</h1>
                <div class="cf" style="margin-bottom: 20px;"></div>
                <%--手机号--%>
                <div class="UserLoginEditBg">
                    <img src="../../image/icon/user.png" width="25px" height="25px">
                    <input id="sign_up_phone" type="text" placeholder="请输入手机号" autocomplete="off" onkeyup="value=value.replace(/[^\d]/g,'')">
                </div>
                <div class="cf" style="margin-bottom: 20px;"></div>
                <%--密码--%>
                <div class="UserLoginEditBg">
                    <img src="../../image/icon/pwd.png" width="25px" height="25px">
                    <input id="sign_up_pwd" type="text" placeholder="请输入密码" autocomplete="off">
                </div>
                <div class="cf" style="margin-bottom: 20px;"></div>
                <%--返回--%>
                <div id="back_login" class="UserSignUpLabel">返回登录</div>
                <div class="cf"></div>
                <%--注册按钮--%>
                <div id="sign_up" class="UserSignUpButton"></div>
            </div>
        </div>
        <%--导入jquery--%>
        <script src="../../js/libs/jquery-3.3.1.js"></script>
        <%--导入JS文件--%>
        <script src="../../js/user/login.js"></script>
    </body>
</html>
