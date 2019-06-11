<%--
  Created by IntelliJ IDEA.
  User: 谢晓晓
  Date: 2019/2/26
  Time: 13:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>(管理员)用户管理</title>
</head>
<body>
<div id="admin_admin" class="UserJobLay">
    <div id="admin_admin_no_power" class="AdminLayAdminContent" style="text-align: center;">
        <h1>抱歉！您没有权限访问！</h1>
    </div>
    <div id="admin_admin_has_power" class="AdminLayAdminContent">
        <button class="btn btn-default AdminPostsRightJobAdd" data-toggle="modal" data-target="#admin_admin_dialog" onclick="addAdmin()"><span class="glyphicon glyphicon-plus"></span>&nbsp;新增管理员</button>
        <%--管理员信息表--%>
        <table id="admin_admin_table" class="table"></table>
    </div>
    <%--新增管理员--%>
    <div class="modal fade" id="admin_admin_dialog" tabindex="-1" role="dialog" aria-labelledby="admin_admin_dialog_label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="admin_admin_dialog_label"></h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="admin_admin_dialog_id">
                    <div class="form-horizontal AdminPostsRightJobDialogBtn" id="admin_admin_dialog_body">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">名称</label>
                            <div class="col-sm-10">
                                <input id="admin_admin_dialog_name" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">密码</label>
                            <div class="col-sm-10">
                                <input id="admin_admin_dialog_pwd" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">权限</label>
                            <div class="col-sm-10">
                                <select id="admin_admin_dialog_power" class="form-control">
                                    <option value="0">超级管理员</option>
                                    <option value="1">普通管理员</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="AdminPostsRightJobDialogBtn" id="admin_admin_dialog_warn">确认要删除吗？</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary AdminPostsRightJobDialogBtn" id="admin_admin_dialog_btn_add">确认</button>
                    <button type="button" class="btn btn-primary AdminPostsRightJobDialogBtn" id="admin_admin_dialog_btn_edit">修改</button>
                    <button type="button" class="btn btn-primary AdminPostsRightJobDialogBtn" id="admin_admin_dialog_btn_del">删除</button>
                </div>
            </div>
        </div>
    </div>
    <%--新增管理员--%>
</div>
</body>
</html>
