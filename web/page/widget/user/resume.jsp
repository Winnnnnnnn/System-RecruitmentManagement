<%--
  Created by IntelliJ IDEA.
  User: 谢晓晓
  Date: 2019/2/24
  Time: 12:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>个人简历</title>
</head>
<body>
<div id="user_resume" class="UserResumeLay">
    <%--用户无简历--%>
    <div id="user_resume_lay_no" class="UserNoResumeLay">
        <h1>暂无简历!</h1>
        <button id="user_resume_add">立即创建简历</button>
    </div>

    <%--用户简历--%>
    <div id="user_resume_lay_has" class="UserHasResumeLay container">
        <%--简历标题--%>
        <h1 id="user_resume_lay_title"></h1>
        <%--个人信息--%>
        <div class="UserHasResumeInfo">
            <%--头像--%>
            <img id="user_resume_lay_img" src="../../../image/head/男孩头像.png">
            <div style="float: left;">
                <div>
                    <h2 id="user_resume_lay_name" class="UserHasResumeInfoFl"></h2>
                    <h3 id="user_resume_lay_sex" class="UserHasResumeInfoFl"></h3>
                    <h3 id="user_resume_lay_date" class="UserHasResumeInfoFl"></h3>
                    <h3 id="user_resume_lay_age" class="UserHasResumeInfoFl"></h3>
                    <h3 id="user_resume_lay_nation" class="UserHasResumeInfoFl"></h3>
                    <h3 id="user_resume_lay_birthplace" class="UserHasResumeInfoFl"></h3>
                    <h3 id="user_resume_lay_politics" class="UserHasResumeInfoFl"></h3>
                    <h3 id="user_resume_lay_marriage" class="UserHasResumeInfoFl"></h3>
                    <div class="cf"></div>
                </div>
                <div>
                    <h3 id="user_resume_lay_phone" class="UserHasResumeInfoFl"></h3>
                    <h3 id="user_resume_lay_email" class="UserHasResumeInfoFl"></h3>
                    <h3 id="user_resume_lay_site" class="UserHasResumeInfoFl"></h3>
                </div>
            </div>
        </div>
        <div class="cf"></div>
        <div class="UserHasResumeDetail">
            <div class="UserHasResumeDetailMain">
                <h2><span class="glyphicon glyphicon-calendar"></span>&nbsp;工作经验</h2>
                <h3 id="user_resume_lay_exp"></h3>
                <div id="user_resume_lay_expdetail"></div>
                <h2><span class="glyphicon glyphicon-education"></span>&nbsp;教育经历</h2>
                <h3 id="user_resume_lay_edu"></h3>
                <div id="user_resume_lay_edudetail"></div>
                <h2><span class="glyphicon glyphicon-list-alt"></span>&nbsp;项目经验</h2>
                <div id="user_resume_lay_project"></div>
                <h2><span class="glyphicon glyphicon-king"></span>&nbsp;在校情况/个人荣誉</h2>
                <div id="user_resume_lay_school"></div>
                <h2><span class="glyphicon glyphicon-duplicate"></span>&nbsp;其他信息</h2>
                <div id="user_resume_lay_other"></div>
            </div>
        </div>
        <div class="cf"></div>
        <button id="user_resume_edit" class="UserCreateResumeBtn"><span class="glyphicon glyphicon-edit"></span>&nbsp;修改简历</button>
    </div>
    <%--用户简历--%>

    <%--创建/编辑简历--%>
    <div id="user_resume_lay_edit" class="UserCreateResumeLay container">
        <div class="form-horizontal">
            <h2><span class="glyphicon glyphicon-pencil"></span>&nbsp;<span>个人简历</span></h2>
            <%--简历标题--%>
            <div class="form-group">
                <div class="col-sm-2"></div>
                <label class="col-sm-2 control-label">简历名称</label>
                <div class="col-sm-5">
                    <input id="user_resume_title" type="text" class="form-control">
                </div>
                <div class="col-sm-1"></div>
            </div>
            <%--个人信息--%>
            <div>
                <h3><span class="glyphicon glyphicon-user"></span>&nbsp;个人信息</h3>
            </div>
            <%--头像--%>
            <div class="form-group UserCreateResumeImg">
                <img id="user_resume_img" src="../../../image/head/男孩头像.png">
                <form id="user_resume_form" enctype="multipart/form-data">
                    <input id="user_resume_file" name="file" type="file" accept="image/gif, image/png, image/jpg, image/jpeg">
                </form>
            </div>
            <%--姓名--%>
            <div class="form-group">
                <div class="col-sm-2"></div>
                <label class="col-sm-2 control-label">姓名</label>
                <div class="col-sm-5">
                    <input id="user_resume_name" type="text" class="form-control">
                </div>
                <div class="col-sm-1"></div>
            </div>
            <%--性别--%>
            <div class="form-group">
                <div class="col-sm-2"></div>
                <label class="col-sm-2 control-label">性别</label>
                <div class="col-sm-5">
                    <select id="user_resume_sex" class="form-control">
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                </div>
                <div class="col-sm-1"></div>
            </div>
            <%--生日--%>
            <div class="form-group">
                <div class="col-sm-2"></div>
                <label class="col-sm-2 control-label">生日</label>
                <div class="col-sm-5">
                    <input id="user_resume_date" class="form-control">
                </div>
                <div class="col-sm-1"></div>
            </div>
            <%--年龄--%>
            <div class="form-group">
                <div class="col-sm-2"></div>
                <label class="col-sm-2 control-label">年龄</label>
                <div class="col-sm-5">
                    <input id="user_resume_age" class="form-control" disabled>
                </div>
                <div class="col-sm-1"></div>
            </div>
            <%--民族--%>
            <div class="form-group">
                <div class="col-sm-2"></div>
                <label class="col-sm-2 control-label">民族</label>
                <div class="col-sm-5">
                    <input id="user_resume_nation" type="text" class="form-control">
                </div>
                <div class="col-sm-1"></div>
            </div>
            <%--籍贯--%>
            <div class="form-group">
                <div class="col-sm-2"></div>
                <label class="col-sm-2 control-label">籍贯</label>
                <div class="col-sm-5">
                    <input id="user_resume_birthplace" type="text" class="form-control">
                </div>
                <div class="col-sm-1"></div>
            </div>
            <%--面貌--%>
            <div class="form-group">
                <div class="col-sm-2"></div>
                <label class="col-sm-2 control-label">面貌</label>
                <div class="col-sm-5">
                    <select id="user_resume_politics" class="form-control">
                        <option value="中共党员">中共党员</option>
                        <option value="中共预备党员">中共预备党员</option>
                        <option value="共青团员">共青团员</option>
                        <option value="民革党员">民革党员</option>
                        <option value="民盟盟员">民盟盟员</option>
                        <option value="民建会员">民建会员</option>
                        <option value="民进会员">民进会员</option>
                        <option value="农工党党员">农工党党员</option>
                        <option value="致公党党员">致公党党员</option>
                        <option value="九三学社社员">九三学社社员</option>
                        <option value="台盟盟员">台盟盟员</option>
                        <option value="无党派人士">无党派人士</option>
                        <option value="群众">群众</option>
                    </select>
                </div>
                <div class="col-sm-1"></div>
            </div>
            <%--婚姻--%>
            <div class="form-group">
                <div class="col-sm-2"></div>
                <label class="col-sm-2 control-label">婚姻</label>
                <div class="col-sm-5">
                    <select id="user_resume_marriage" class="form-control">
                        <option value="未婚">未婚</option>
                        <option value="已婚">已婚</option>
                        <option value="丧偶">丧偶</option>
                        <option value="离婚">离婚</option>
                    </select>
                </div>
                <div class="col-sm-1"></div>
            </div>
            <%--手机--%>
            <div class="form-group">
                <div class="col-sm-2"></div>
                <label class="col-sm-2 control-label">手机</label>
                <div class="col-sm-5">
                    <input id="user_resume_phone" type="text" class="form-control" onkeyup="value=value.replace(/[^\d]/g,'')">
                </div>
                <div class="col-sm-1"></div>
            </div>
            <%--邮箱--%>
            <div class="form-group">
                <div class="col-sm-2"></div>
                <label class="col-sm-2 control-label">邮箱</label>
                <div class="col-sm-5">
                    <input id="user_resume_email" type="email" class="form-control">
                </div>
                <div class="col-sm-1"></div>
            </div>
            <%--地区--%>
            <div class="form-group">
                <div class="col-sm-2"></div>
                <label class="col-sm-2 control-label">地区</label>
                <div class="col-sm-5">
                    <input id="user_resume_site" type="text" class="form-control">
                </div>
                <div class="col-sm-1"></div>
            </div>
            <%--工作经验--%>
            <div>
                <h3><span class="glyphicon glyphicon-calendar"></span>&nbsp;工作经验</h3>
            </div>
            <%--工作经验--%>
            <div class="form-group">
                <div class="col-sm-2"></div>
                <label class="col-sm-2 control-label">工作经验</label>
                <div class="col-sm-5">
                    <select id="user_resume_exp" class="form-control">
                        <option value="无经验">无经验</option>
                        <option value="1-3年">1-3年</option>
                        <option value="3-5年">3-5年</option>
                        <option value="5-10年">5-10年</option>
                        <option value="10年以上">10年以上</option>
                    </select>
                </div>
                <div class="col-sm-1"></div>
            </div>
            <%--添加工作经验--%>
            <div>
                <button class="btn btn-default" data-toggle="modal" data-target="#user_resume_dialog" onclick="openExpDialog()"><span class="glyphicon glyphicon-plus"></span></button>
            </div>
            <%--工作经验填充区--%>
            <div class="form-group">
                <div class="col-sm-4"></div>
                <div class="col-sm-5" id="user_resume_expdetail"></div>
                <div class="col-sm-2"></div>
            </div>
            <%--教育经历--%>
            <div>
                <h3><span class="glyphicon glyphicon-education"></span>&nbsp;教育经历</h3>
            </div>
            <%--教育经历--%>
            <div class="form-group">
                <div class="col-sm-2"></div>
                <label class="col-sm-2 control-label">最高学历</label>
                <div class="col-sm-5">
                    <select id="user_resume_edu" class="form-control">
                        <option value="博士">博士</option>
                        <option value="硕士">硕士</option>
                        <option value="本科">本科</option>
                        <option value="大专">大专</option>
                        <option value="高中/中专/中技">高中/中专/中技</option>
                        <option value="初中及以下">初中及以下</option>
                    </select>
                </div>
                <div class="col-sm-1"></div>
            </div>
            <%--添加教育经历--%>
            <div>
                <button class="btn btn-default" data-toggle="modal" data-target="#user_resume_dialog" onclick="openEduDialog()"><span class="glyphicon glyphicon-plus"></span></button>
            </div>
            <%--教育经历填充区--%>
            <div class="form-group">
                <div class="col-sm-4"></div>
                <div class="col-sm-5" id="user_resume_edudetail"></div>
                <div class="col-sm-2"></div>
            </div>
            <%--项目经验--%>
            <div>
                <h3><span class="glyphicon glyphicon-list-alt"></span>&nbsp;项目经验</h3>
            </div>
            <%--添加项目经验--%>
            <div>
                <button class="btn btn-default" data-toggle="modal" data-target="#user_resume_dialog" onclick="openProjectDialog()"><span class="glyphicon glyphicon-plus"></span></button>
            </div>
            <%--项目经验填充区--%>
            <div class="form-group">
                <div class="col-sm-4"></div>
                <div class="col-sm-5" id="user_resume_project"></div>
                <div class="col-sm-2"></div>
            </div>
            <%--在校情况--%>
            <div>
                <h3><span class="glyphicon glyphicon-king"></span>&nbsp;在校情况/个人荣誉</h3>
            </div>
            <%--添加在校情况--%>
            <div>
                <button class="btn btn-default" data-toggle="modal" data-target="#user_resume_dialog" onclick="openSchoolDialog()"><span class="glyphicon glyphicon-plus"></span></button>
            </div>
            <%--在校情况填充区--%>
            <div class="form-group">
                <div class="col-sm-4"></div>
                <div class="col-sm-5" id="user_resume_school"></div>
                <div class="col-sm-2"></div>
            </div>
            <%--其他信息--%>
            <div>
                <h3><span class="glyphicon glyphicon-duplicate"></span>&nbsp;其他信息</h3>
            </div>
            <%--添加其他信息--%>
            <div>
                <button class="btn btn-default" data-toggle="modal" data-target="#user_resume_dialog" onclick="openOtherDialog()"><span class="glyphicon glyphicon-plus"></span></button>
            </div>
            <%--其他信息填充区--%>
            <div class="form-group">
                <div class="col-sm-4"></div>
                <div class="col-sm-5" id="user_resume_other"></div>
                <div class="col-sm-2"></div>
            </div>
            <%--底部保存按钮--%>
            <button id="user_resume_save" class="UserCreateResumeBtn">保存简历</button>
        </div>
    </div>
    <%--创建/编辑简历--%>

    <%--简历编辑时弹出对话框--%>
    <div class="modal fade" id="user_resume_dialog" tabindex="-1" role="dialog" aria-labelledby="user_resume_dialog_label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <%--顶部标题--%>
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <%--标题内容，在js中填充--%>
                    <h4 class="modal-title" id="user_resume_dialog_label"></h4>
                </div>
                <div class="modal-body">
                    <%--填充的ID--%>
                    <input id="user_resume_dialog_id" type="hidden">
                    <div class="form-horizontal">
                        <%--开始时间--%>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">开始时间</label>
                            <div class="col-sm-10">
                                <input id="user_resume_dialog_start_time" class="form-control">
                            </div>
                        </div>
                        <%--结束时间--%>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">结束时间</label>
                            <div class="col-sm-10">
                                <input id="user_resume_dialog_end_time" class="form-control">
                            </div>
                        </div>
                        <%--结束时间--%>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">内容描述</label>
                            <div class="col-sm-10">
                                <textarea id="user_resume_dialog_content" class="form-control" rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button id="user_resume_dialog_btn_add" type="button" class="btn btn-primary">确认</button>
                </div>
            </div>
        </div>
    </div>
    <%--简历编辑时弹出对话框--%>
</div>
</body>
</html>
