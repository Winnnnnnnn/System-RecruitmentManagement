<%--
  Created by IntelliJ IDEA.
  User: 谢晓晓
  Date: 2019/2/20
  Time: 15:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>(管理员)岗位信息管理</title>
</head>
<body>
<div id="admin_posts" class="AdminPostsLay">
    <%--左侧导航栏--%>
    <ul class="AdminPostsLeftLay">
        <li><a id="admin_posts_job">岗位信息</a></li>
        <li><a id="admin_posts_case">投递情况</a></li>
    </ul>
    <%--右侧管理布局--%>
    <div class="AdminPostsRightLay">
        <%--岗位信息管理--%>
        <div id="admin_posts_job_lay" class="AdminPostsRightJobLay">
            <%--新增岗位--%>
            <button class="btn btn-default AdminPostsRightJobAdd" data-toggle="modal" data-target="#admin_posts_job_dialog" onclick="addJob()"><span class="glyphicon glyphicon-plus"></span>&nbsp;新增岗位</button>
            <%--岗位信息表--%>
            <table id="admin_posts_job_table"></table>
        </div>
        <%--岗位信息管理对话框：增加，编辑，删除--%>
        <div class="modal fade" id="admin_posts_job_dialog" tabindex="-1" role="dialog" aria-labelledby="admin_posts_job_dialog_label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <%--顶部标题--%>
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <%--标题内容，在js中填充--%>
                        <h4 class="modal-title" id="admin_posts_job_dialog_label"></h4>
                    </div>
                    <%--中间操作体--%>
                    <div class="modal-body">
                        <%--操作的id--%>
                        <input id="admin_posts_job_dialog_val_id" type="hidden">
                        <%--添加岗位布局--%>
                        <div id="admin_posts_job_dialog_body" class="form-horizontal AdminPostsRightJobDialogBtn">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">岗位名称</label>
                                <div class="col-sm-9">
                                    <%--岗位名称输入框--%>
                                    <input id="admin_posts_job_dialog_val_title" type="text" class="form-control" placeholder="示例：Android开发工程师">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">岗位信息</label>
                                <div class="col-sm-9">
                                    <%--岗位信息输入框--%>
                                    <textarea id="admin_posts_job_dialog_val_description" class="form-control" rows="10"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">岗位标签</label>
                                <div class="col-sm-9">
                                    <%--添加标签按钮--%>
                                    <button class="btn btn-default AdminPostsRightJobDialogNoteBtn" data-toggle="modal" data-target="#admin_posts_job_note_dialog" onclick="addJobNote()"><span class="glyphicon glyphicon-plus"></span></button>
                                    <%--标签内容--%>
                                    <div id="admin_posts_job_dialog_val_note"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">需求人数</label>
                                <div class="col-sm-3">
                                    <%--需求人数输入框--%>
                                    <input id="admin_posts_job_dialog_val_num" type="number" class="form-control" placeholder="示例：20">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">工作地点</label>
                                <div class="col-sm-3">
                                    <%--工作地点输入框--%>
                                    <input id="admin_posts_job_dialog_val_site" type="text" class="form-control" placeholder="示例：福州">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">工资待遇</label>
                                <div class="col-sm-3">
                                    <%--工资待遇输入框--%>
                                    <input id="admin_posts_job_dialog_val_pay" type="text" class="form-control" placeholder="示例：2000">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">经验要求</label>
                                <div class="col-sm-3">
                                    <%--工作经验要求选择--%>
                                    <select id="admin_posts_job_dialog_val_exp" class="form-control">
                                        <option value="无经验">无经验</option>
                                        <option value="1-3年">1-3年</option>
                                        <option value="3-5年">3-5年</option>
                                        <option value="5-10年">5-10年</option>
                                        <option value="10年以上">10年以上</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">学历要求</label>
                                <div class="col-sm-3">
                                    <%--学历要求选择--%>
                                    <select id="admin_posts_job_dialog_val_edu" class="form-control">
                                        <option value="博士">博士</option>
                                        <option value="硕士">硕士</option>
                                        <option value="本科">本科</option>
                                        <option value="大专">大专</option>
                                        <option value="高中/中专/中技">高中/中专/中技</option>
                                        <option value="初中及以下">初中及以下</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">联系方式</label>
                                <div class="col-sm-9">
                                    <%--联系方式输入框--%>
                                    <input id="admin_posts_job_dialog_val_phone" type="tel" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">联系邮箱</label>
                                <div class="col-sm-9">
                                    <%--联系邮箱输入框--%>
                                    <input id="admin_posts_job_dialog_val_email" type="email" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div id="admin_posts_job_dialog_warn" class="AdminPostsRightJobDialogBtn">确认要删除吗？不可恢复哦，建议以编辑的方式修改！</div>
                    </div>
                    <%--底部按钮栏--%>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary AdminPostsRightJobDialogBtn" id="admin_posts_job_dialog_btn_add">新增</button>
                        <button type="button" class="btn btn-primary AdminPostsRightJobDialogBtn" id="admin_posts_job_dialog_btn_edit">修改</button>
                        <button type="button" class="btn btn-danger AdminPostsRightJobDialogBtn" id="admin_posts_job_dialog_btn_open">开放</button>
                        <button type="button" class="btn btn-danger AdminPostsRightJobDialogBtn" id="admin_posts_job_dialog_btn_close">招满</button>
                        <button type="button" class="btn btn-danger AdminPostsRightJobDialogBtn" id="admin_posts_job_dialog_btn_del">删除</button>
                    </div>
                </div>
            </div>
        </div>
        <%--岗位信息管理对话框：增加，编辑，删除--%>

        <%--岗位信息管理：标签编辑对话框--%>
        <div class="modal fade" id="admin_posts_job_note_dialog" tabindex="-1" role="dialog" aria-labelledby="admin_posts_job_note_dialog_label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="admin_posts_job_note_dialog_label">新增标签</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">标签详情</label>
                                <div class="col-sm-9">
                                    <%--便签输入框--%>
                                    <input id="admin_posts_job_note_dialog_val" type="text" class="form-control" placeholder="示例：五险一金">
                                </div>
                            </div>
                        </div>
                    </div>
                    <%--底部按钮栏--%>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" id="admin_posts_job_note_dialog_btn_add">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <%--岗位信息管理：标签编辑对话框--%>

        <%--岗位信息管理--%>

        <%--投递情况管理--%>
        <div id="admin_posts_send_lay" class="AdminPostsRightJobLay">
            <%--岗位信息表--%>
            <table id="admin_posts_send_table"></table>
        </div>
        <%--用户简历--%>
        <div class="modal fade" id="admin_posts_send_dialog" tabindex="-1" role="dialog" aria-labelledby="admin_posts_send_dialog_label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="admin_posts_send_dialog_label"></h4>
                    </div>
                    <div class="modal-body AdminPostsRightSendUserResume">
                        <%--id--%>
                        <input type="hidden" id="admin_posts_send_dialog_id">
                        <%--头像--%>
                        <img id="admin_posts_send_dialog_img" src="../../../image/head/男孩头像.png">
                        <h3 class="AdminPostsRightSendUserResumeName" id="admin_posts_send_dialog_name"></h3>
                        <%--个人资料--%>
                        <div class="AdminPostsRightSendUserResumeInfo">
                            <h4 id="admin_posts_send_dialog_sex"></h4>
                            <h4 id="admin_posts_send_dialog_date"></h4>
                            <h4 id="admin_posts_send_dialog_age"></h4>
                            <h4 id="admin_posts_send_dialog_nation"></h4>
                            <h4 id="admin_posts_send_dialog_birthplace"></h4>
                            <h4 id="admin_posts_send_dialog_politics"></h4>
                            <h4 id="admin_posts_send_dialog_marriage"></h4>
                        </div>
                        <div class="cf"></div>
                        <div class="AdminPostsRightSendUserResumeInfo">
                            <h4 id="admin_posts_send_dialog_phone"></h4>
                            <h4 id="admin_posts_send_dialog_email"></h4>
                        </div>
                        <div class="cf"></div>
                        <div class="AdminPostsRightSendUserResumeItem">
                            <h3>工作经验</h3>
                            <h4 id="admin_posts_send_dialog_exp"></h4>
                            <div id="admin_posts_send_dialog_expdetail"></div>
                            <h3>教育经验</h3>
                            <h4 id="admin_posts_send_dialog_edu"></h4>
                            <div id="admin_posts_send_dialog_edudetail"></div>
                            <h3>项目经验</h3>
                            <div id="admin_posts_send_dialog_project"></div>
                            <h3>在校情况/个人荣誉</h3>
                            <div id="admin_posts_send_dialog_school"></div>
                            <h3>其他信息</h3>
                            <div id="admin_posts_send_dialog_other"></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" id="admin_posts_send_dialog_btn_welcome">面试邀请</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" id="admin_posts_send_dialog_btn_no">不符合</button>
                        <button type="button" class="btn btn-info" data-dismiss="modal" id="admin_posts_send_dialog_btn_ok">录用</button>
                    </div>
                </div>
            </div>
        </div>
        <%--用户简历--%>
        <%--投递情况管理--%>
    </div>
    <%--右侧管理布局--%>
</div>
</body>
</html>
