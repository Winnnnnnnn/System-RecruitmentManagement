<%--
  Created by IntelliJ IDEA.
  User: 谢晓晓
  Date: 2019/2/26
  Time: 12:00
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
<div id="admin_user" class="UserJobLay">
    <div class="UserJobLayContent">
        <%--用户信息表--%>
        <table id="admin_user_table" class="table"></table>
    </div>
    <%--修改密码--%>
    <div class="modal fade" id="admin_user_dialog" tabindex="-1" role="dialog" aria-labelledby="admin_user_dialog_label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="admin_user_dialog_label">修改密码</h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="admin_user_dialog_id">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">新密码</label>
                            <div class="col-sm-10">
                                <input id="admin_user_dialog_pwd" type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" id="admin_user_dialog_btn">确认</button>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
