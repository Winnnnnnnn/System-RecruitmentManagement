<%--
  Created by IntelliJ IDEA.
  User: 谢晓晓
  Date: 2019/1/12
  Time: 20:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <title>招聘管理系统</title>
        <link rel="stylesheet" href="../../css/libs/bootstrap.css">
        <link rel="stylesheet" href="../../css/libs/bootstrap-table.css">
        <link rel="stylesheet" href="../../css/base.css">
    </head>
    <body class="AdminBg">
        <%--顶部导航栏--%>
        <jsp:include page="../widget/admin/navbar.jsp"></jsp:include>
        <%--岗位管理--%>
        <jsp:include page="../widget/admin/posts.jsp"></jsp:include>
        <%--用户管理--%>
        <jsp:include page="../widget/admin/user.jsp"></jsp:include>
        <%--管理员管理--%>
        <jsp:include page="../widget/admin/admin.jsp"></jsp:include>
        <%--导入jquery--%>
        <script src="../../js/libs/jquery-3.3.1.js"></script>
        <%--导入bootstrap--%>
        <script src="../../js/libs/bootstrap.js"></script>
        <script src="../../js/libs/bootstrap-table.js"></script>
        <script src="../../js/libs/locale/bootstrap-table-zh-CN.js"></script>
        <%--导入admin的js--%>
        <script src="../../js/util/base64.js"></script>
        <script src="../../js/admin/admin.js"></script>
    </body>
</html>
