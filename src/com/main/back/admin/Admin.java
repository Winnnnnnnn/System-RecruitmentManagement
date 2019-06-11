package com.main.back.admin;

import com.main.bean.*;
import com.main.utils.Base64Util;
import com.main.utils.SqlHelper;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static com.main.utils.ConstUtil.*;

/**
 * @author 谢晓晓
 * @date 2019/01/11
 * @describe 管理员的后台
 */
@WebServlet(name="admin",urlPatterns="/admin")
public class Admin extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //跳转到登录页
        resp.sendRedirect("/page/admin/login.jsp");
    }

    /**
     * 处理浏览器post请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //调整编码，防止中文乱码
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        //获取请求来自于哪里，做什么动作
        String action = req.getParameter("action");
        //回调结果
        PrintWriter printWriter = resp.getWriter();
        //判断动作
        if (action != null) {
            switch (action) {
                case ACTION_ADMIN_LOGIN:
                    //管理员登录动作
                    printWriter.print(doAdminLogin(req.getParameter("name"),req.getParameter("pwd")));
                    break;
                case ACTION_ADMIN_GET_JOB_INFO:
                    //管理员获取全部岗位信息动作
                    printWriter.print(doAdminGetJobInfo());
                    break;
                case ACTION_ADMIN_ADD_JOB_INFO:
                    //管理员添加岗位信息动作
                    JobBean jobBean_add = new JobBean(req.getParameter("title"),req.getParameter("description"),Integer.parseInt(req.getParameter("num")),req.getParameter("note"),req.getParameter("site"),req.getParameter("pay"),req.getParameter("exp"),req.getParameter("edu"),req.getParameter("phone"),req.getParameter("email"),req.getParameter("time"));
                    printWriter.print(doAdminAddJobInfo(jobBean_add));
                    break;
                case ACTION_ADMIN_EDIT_JOB_INFO:
                    //管理员编辑岗位信息动作
                    JobBean jobBean_edit = new JobBean(Integer.parseInt(req.getParameter("id")),req.getParameter("title"),req.getParameter("description"),Integer.parseInt(req.getParameter("num")),req.getParameter("note"),req.getParameter("site"),req.getParameter("pay"),req.getParameter("exp"),req.getParameter("edu"),req.getParameter("phone"),req.getParameter("email"));
                    printWriter.print(doAdminEditJobInfo(jobBean_edit));
                    break;
                case ACTION_ADMIN_STATE_JOB_INFO:
                    //管理员修改岗位状态动作
                    JobBean jobBean_state = new JobBean(Integer.parseInt(req.getParameter("id")),Integer.parseInt(req.getParameter("state")));
                    printWriter.print(doAdminStateJobInfo(jobBean_state));
                    break;
                case ACTION_ADMIN_DEL_JOB_INFO:
                    //管理员删除岗位动作
                    JobBean jobBean_del = new JobBean(Integer.parseInt(req.getParameter("id")));
                    printWriter.print(doAdminDelJobInfo(jobBean_del));
                    break;
                case ACTION_ADMIN_GET_SEND:
                    //管理员获取全部投递情况
                    printWriter.print(doAdminGetSend());
                    break;
                case ACTION_ADMIN_GET_RESUME:
                    //管理员获取简历详情
                    printWriter.print(doAdminGetUserResume(req));
                    break;
                case ACTION_ADMIN_EDIT_SEND:
                    //管理员修改投递状况
                    printWriter.print(doAdminEditSendState(req));
                    break;
                case ACTION_ADMIN_GET_USER:
                    //管理员获取用户信息
                    printWriter.print(doAdminGetUser());
                    break;
                case ACTION_ADMIN_EDIT_USER:
                    //管理员修改用户密码
                    printWriter.print(doAdminEditUser(req));
                    break;
                case ACTION_ADMIN_GET_ADMIN:
                    //获取管理员列表
                    printWriter.print(doAdminGetAdmin());
                    break;
                case ACTION_ADMIN_ADD_ADMIN:
                    //添加管理员
                    printWriter.print(doAdminAddAdmin(req));
                    break;
                case ACTION_ADMIN_EDIT_ADMIN:
                    //编辑管理员
                    printWriter.print(doAdminEditAdmin(req));
                    break;
                case ACTION_ADMIN_DEL_ADMIN:
                    //刪除管理员
                    printWriter.print(doAdminDelAdmin(req));
                    break;
            }
        }
    }

    /**
     * 执行管理员登录动作
     * @param name
     * @param pwd
     * @return
     */
    private String doAdminLogin(String name,String pwd) {
        //封装数据
        String sql = "select name,power from admin where name=? and pwd=?";
        String[] parameters = {name,Base64Util.encode(pwd)};
        AdminBean adminBean = SqlHelper.doObjQuery(sql,parameters,AdminBean.class);
        if (adminBean != null) {
            //登录成功
            JSONObject adminJson = JSONObject.fromObject(adminBean);
            return adminJson.toString();
        } else {
            //登录失败
            return "";
        }
    }

    /**
     * 获取岗位信息
     * @return
     */
    private String doAdminGetJobInfo() {
        String sql = "select * from jobs order by id desc";
        List<JobBean> jobBeanList = SqlHelper.doListQuery(sql,null,JobBean.class);
        if (jobBeanList != null) {
            JSONArray jsonArray = JSONArray.fromObject(jobBeanList);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加岗位信息
     * @param jobBean
     * @return
     */
    private Boolean doAdminAddJobInfo(JobBean jobBean) {
        String sql = "insert into jobs(title,description,num,note,site,pay,exp,edu,phone,email,time) values(?,?,?,?,?,?,?,?,?,?,?)";
        String[] parameters = {jobBean.getTitle(),jobBean.getDescription(),String.valueOf(jobBean.getNum()),jobBean.getNote(),jobBean.getSite(),jobBean.getPay(),jobBean.getExp(),jobBean.getEdu(),jobBean.getPhone(),jobBean.getEmail(),jobBean.getTime()};
        //执行sql语句
        int result = SqlHelper.doUpdate(sql,parameters);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 修改岗位信息
     * @param jobBean
     * @return
     */
    private Boolean doAdminEditJobInfo(JobBean jobBean) {
        String sql = "update jobs set title=?,description=?,num=?,note=?,site=?,pay=?,exp=?,edu=?,phone=?,email=? where id=?";
        String[] parameters = {jobBean.getTitle(),jobBean.getDescription(),String.valueOf(jobBean.getNum()),jobBean.getNote(),jobBean.getSite(),jobBean.getPay(),jobBean.getExp(),jobBean.getEdu(),jobBean.getPhone(),jobBean.getEmail(),String.valueOf(jobBean.getId())};
        //执行sql语句
        int result = SqlHelper.doUpdate(sql,parameters);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 修改岗位状态
     * @param jobBean
     * @return
     */
    private Boolean doAdminStateJobInfo(JobBean jobBean) {
        String sql = "update jobs set state=? where id=?";
        String[] parameters = {String.valueOf(jobBean.getState()),String.valueOf(jobBean.getId())};
        //执行sql语句
        int result = SqlHelper.doUpdate(sql,parameters);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除岗位信息
     * @param jobBean
     * @return
     */
    private Boolean doAdminDelJobInfo(JobBean jobBean) {
        String sql = "delete from jobs where id=?";
        String[] parameters = {String.valueOf(jobBean.getId())};
        //执行sql语句
        int result = SqlHelper.doUpdate(sql,parameters);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取全部投递状况
     * @return
     */
    private String doAdminGetSend() {
        String sql = "select sends.id,sends.resume,sends.state,jobs.title,jobs.description,jobs.pay,jobs.exp,jobs.edu,resumes.name,resumes.phone,resumes.email from jobs,sends,resumes where sends.job = jobs.id and sends.resume = resumes.id order by sends.id desc";
        List<SendDetailBean> sendDetailBeanList = SqlHelper.doListQuery(sql,null,SendDetailBean.class);
        if (sendDetailBeanList != null) {
            JSONArray jsonArray = JSONArray.fromObject(sendDetailBeanList);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 获取用户简历
     * @param req
     * @return
     */
    private String doAdminGetUserResume(HttpServletRequest req) {
        String sql = "select * from resumes where id=?";
        String[] p = {req.getParameter("resume")};
        ResumeBean resumeBean = SqlHelper.doObjQuery(sql,p,ResumeBean.class);
        if (resumeBean != null) {
            JSONObject jsonObject = JSONObject.fromObject(resumeBean);
            return jsonObject.toString();
        } else {
            return "";
        }
    }

    /**
     * 修改投递状况
     * @param req
     * @return
     */
    private Boolean doAdminEditSendState(HttpServletRequest req) {
        String sql = "update sends set state=? where id=?";
        String[] p = {req.getParameter("state"),req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取用户信息
     * @return
     */
    private String doAdminGetUser() {
        String sql = "select * from users order by id";
        List<UserBean> userBeanList = SqlHelper.doListQuery(sql,null,UserBean.class);
        if (userBeanList != null) {
            JSONArray jsonArray = JSONArray.fromObject(userBeanList);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 修改用户密码
     * @param req
     * @return
     */
    private Boolean doAdminEditUser(HttpServletRequest req) {
        String sql = "update users set pwd=? where id=?";
        String[] p = {Base64Util.encode(req.getParameter("pwd")),req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取管理员列表
     * @return
     */
    private String doAdminGetAdmin() {
        String sql = "select * from admin order by id desc";
        List<AdminBean> adminBeanList = SqlHelper.doListQuery(sql,null,AdminBean.class);
        if (adminBeanList != null) {
            JSONArray jsonArray = JSONArray.fromObject(adminBeanList);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加管理员
     * @param req
     * @return
     */
    private Boolean doAdminAddAdmin(HttpServletRequest req){
        //判断是否已经注册
        String sql_c = "select * from admin where name=?";
        String[] p_c = {req.getParameter("name")};
        AdminBean adminBean = SqlHelper.doObjQuery(sql_c,p_c,AdminBean.class);
        if (adminBean != null) {
            return false;
        } else {
            String sql = "insert into admin(name,pwd,power) values(?,?,?)";
            String[] p = {req.getParameter("name"),Base64Util.encode(req.getParameter("pwd")),req.getParameter("power")};
            int result = SqlHelper.doUpdate(sql,p);
            if (result > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * 编辑管理
     * @param req
     * @return
     */
    private Boolean doAdminEditAdmin(HttpServletRequest req) {
        String sql = "update admin set name=?,pwd=?,power=? where id=?";
        String[] p = {req.getParameter("name"),Base64Util.encode(req.getParameter("pwd")),req.getParameter("power"),req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除管理员
     * @param req
     * @return
     */
    private Boolean doAdminDelAdmin(HttpServletRequest req) {
        String sql = "delete from admin where id=?";
        String[] p = {req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }
}
