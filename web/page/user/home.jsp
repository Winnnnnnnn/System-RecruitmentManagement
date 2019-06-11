<%--
  Created by IntelliJ IDEA.
  User: 谢晓晓
  Date: 2019/2/23
  Time: 23:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <title>招聘管理系统</title>
        <link rel="stylesheet" href="../../css/libs/bootstrap.css">
        <link rel="stylesheet" href="../../css/libs/bootstrap-datetimepicker.css">
        <link rel="stylesheet" href="../../css/libs/bootstrap-table.css">
        <link rel="stylesheet" href="../../css/base.css">
    </head>
    <body class="UserBg">
        <%--顶部导航栏--%>
        <jsp:include page="../widget/user/navbar.jsp"></jsp:include>
        <%--岗位列表--%>
        <jsp:include page="../widget/user/job.jsp"></jsp:include>
        <%--个人简历--%>
        <jsp:include page="../widget/user/resume.jsp"></jsp:include>
        <%--我的--%>
        <jsp:include page="../widget/user/sends.jsp"></jsp:include>
        <%--导入jquery--%>
        <script src="../../js/libs/jquery-3.3.1.js"></script>
        <%--导入文件上传插件--%>
        <script src="../../js/libs/ajaxfileupload.js"></script>
        <%--导入bootstrap--%>
        <script src="../../js/libs/bootstrap.js"></script>
        <%--导入日期选择器--%>
        <script src="../../js/libs/bootstrap-datetimepicker.js"></script>
        <script src="../../js/libs/locale/bootstrap-datetimepicker.zh-CN.js"></script>
        <%--导入表格工具--%>
        <script src="../../js/libs/bootstrap-table.js"></script>
        <script src="../../js/libs/locale/bootstrap-table-zh-CN.js"></script>
        <%--导入js--%>
        <script src="../../js/user/home.js"></script>
    </body>
</html>
