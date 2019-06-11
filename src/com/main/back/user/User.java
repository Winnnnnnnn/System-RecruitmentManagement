package com.main.back.user;

import com.main.bean.*;
import com.main.utils.Base64Util;
import com.main.utils.CookieUtil;
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
 * @date 2019/02/23
 * @describe 用户的后台
 */
@WebServlet(name="user",urlPatterns="/user")
public class User extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //判断用户是否已经登录
        String state = CookieUtil.getCookie(req,USER_LOGIN_KEY);
        if (null == state || "" == state) {
            //跳转到登录页
            resp.sendRedirect("/page/user/login.jsp");
        } else {
            String id = CookieUtil.getCookie(req,USER_ID);
            String phone = CookieUtil.getCookie(req,USER_PHONE);
            //跳转到首页
            resp.sendRedirect("/page/user/home.jsp?id=" + id + "&phone=" + phone);
        }
    }

    /**
     * 处理浏览器POST请求
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
                case ACTION_USER_LOGIN:
                    //登录
                    UserBean userBean_login = new UserBean(req.getParameter("phone"),req.getParameter("pwd"));
                    printWriter.print(doUserLogin(resp,userBean_login));
                    break;
                case ACTION_USER_SIGN_UP:
                    //注册
                    UserBean userBean_sign_up = new UserBean(req.getParameter("phone"),req.getParameter("pwd"));
                    printWriter.print(doUserSignUp(userBean_sign_up));
                    break;
                case ACTION_USER_LOGOUT:
                    //登出
                    printWriter.print(doUserLogout(req,resp));
                    break;
                case ACTION_USER_GET_RESUME:
                    //获取个人简历
                    ResumeBean resumeBean_get = new ResumeBean(Integer.parseInt(req.getParameter("id")));
                    printWriter.print(doUserGetResume(resumeBean_get));
                    break;
                case ACTION_USER_SAVE_RESUME:
                    //保存个人简历
                    printWriter.print(doUserSaveResume(req));
                    break;
                case ACTION_USER_GET_JOB:
                    //获取岗位信息
                    printWriter.print(doUserGetJob());
                    break;
                case ACTION_USER_GET_SEND:
                    //获取个人投递情况
                    printWriter.print(doUserGetSend(req));
                    break;
                case ACTION_USER_SEND_RESUME:
                    //用户投递简历
                    printWriter.print(doUserSendResume(req));
                    break;
            }
        }
    }

    /**
     * 执行用户登录动作
     * @param userBean
     * @return
     */
    private String doUserLogin(HttpServletResponse response,UserBean userBean) {
        String sql = "select id,phone from users where phone=? and pwd=?";
        String[] parameters = {userBean.getPhone(), Base64Util.encode(userBean.getPwd())};
        UserBean user = SqlHelper.doObjQuery(sql,parameters,UserBean.class);
        if (user != null) {
            //登录成功
            JSONObject userJson = JSONObject.fromObject(user);
            //保存Cookie
            CookieUtil.addCookie(response,USER_LOGIN_KEY,"true");
            CookieUtil.addCookie(response,USER_ID, String.valueOf(user.getId()));
            CookieUtil.addCookie(response,USER_PHONE,user.getPhone());
            return userJson.toString();
        } else {
            //登录失败
            return "";
        }
    }

    /**
     * 执行用户注册动作
     * @param userBean
     * @return
     */
    private Boolean doUserSignUp(UserBean userBean) {
        //先判断手机号是否被注册
        String check = "select phone from users where phone=?";
        String[] check_p = {userBean.getPhone()};
        UserBean check_r = SqlHelper.doObjQuery(check,check_p,UserBean.class);
        if (null != check_r) {
            //已经被注册
            return false;
        } else {
            String sql = "insert into users(phone,pwd) values(?,?)";
            String[] parameters = {userBean.getPhone(),Base64Util.encode(userBean.getPwd())};
            int result = SqlHelper.doUpdate(sql,parameters);
            if (result > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * 执行用户登出操作
     * @return
     */
    private Boolean doUserLogout(HttpServletRequest request, HttpServletResponse response) {
        //清除Cookie
        CookieUtil.delCookie(request,response,USER_LOGIN_KEY);
        CookieUtil.delCookie(request,response,USER_ID);
        CookieUtil.delCookie(request,response,USER_PHONE);
        return true;
    }

    /**
     * 用户获取个人简历
     * @param resumeBean
     * @return
     */
    private String doUserGetResume(ResumeBean resumeBean) {
        String sql = "select * from resumes where user=?";
        String[] parameters = {String.valueOf(resumeBean.getUser())};
        ResumeBean resume = SqlHelper.doObjQuery(sql,parameters,ResumeBean.class);
        if (resume != null) {
            JSONObject resumeJson = JSONObject.fromObject(resume);
            return resumeJson.toString();
        } else {
            return "";
        }
    }

    /**
     * 用户保存个人简历
     * @param req
     * @return
     */
    private Boolean doUserSaveResume(HttpServletRequest req) {
        //判断是增加还是编辑
        String sql_c = "select * from resumes where user=?";
        String[] parameters_c = {req.getParameter("user")};
        ResumeBean resumeBean_c = SqlHelper.doObjQuery(sql_c,parameters_c,ResumeBean.class);
        ResumeBean resumeBean_save = new ResumeBean(Integer.parseInt(req.getParameter("user")),req.getParameter("title"),req.getParameter("name"),req.getParameter("sex"),req.getParameter("date"),Integer.parseInt(req.getParameter("age")),req.getParameter("nation"),req.getParameter("birthplace"),req.getParameter("politics"),req.getParameter("marriage"),req.getParameter("phone"),req.getParameter("email"),req.getParameter("site"),req.getParameter("img"),req.getParameter("exp"),req.getParameter("expdetail"),req.getParameter("edu"),req.getParameter("edudetail"),req.getParameter("project"),req.getParameter("school"),req.getParameter("other"));
        if (null == resumeBean_c) {
            //增加操作
            String sql = "insert into resumes(user,title,name,sex,date,age,nation,birthplace,politics,marriage,phone,email,site,img,exp,expdetail,edu,edudetail,project,school,other) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            String[] parameters = {
                    String.valueOf(resumeBean_save.getUser()),
                    resumeBean_save.getTitle(),
                    resumeBean_save.getName(),
                    resumeBean_save.getSex(),
                    resumeBean_save.getDate(),
                    String.valueOf(resumeBean_save.getAge()),
                    resumeBean_save.getNation(),
                    resumeBean_save.getBirthplace(),
                    resumeBean_save.getPolitics(),
                    resumeBean_save.getMarriage(),
                    resumeBean_save.getPhone(),
                    resumeBean_save.getEmail(),
                    resumeBean_save.getSite(),
                    resumeBean_save.getImg(),
                    resumeBean_save.getExp(),
                    resumeBean_save.getExpdetail(),
                    resumeBean_save.getEdu(),
                    resumeBean_save.getEdudetail(),
                    resumeBean_save.getProject(),
                    resumeBean_save.getSchool(),
                    resumeBean_save.getOther()
            };
            int result = SqlHelper.doUpdate(sql,parameters);
            if (result > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            //更新操作
            String sql = "update resumes set title=?,name=?,sex=?,date=?,age=?,nation=?,birthplace=?,politics=?,marriage=?,phone=?,email=?,site=?,img=?,exp=?,expdetail=?,edu=?,edudetail=?,project=?,school=?,other=? where user=?";
            String[] parameters = {
                    resumeBean_save.getTitle(),
                    resumeBean_save.getName(),
                    resumeBean_save.getSex(),
                    resumeBean_save.getDate(),
                    String.valueOf(resumeBean_save.getAge()),
                    resumeBean_save.getNation(),
                    resumeBean_save.getBirthplace(),
                    resumeBean_save.getPolitics(),
                    resumeBean_save.getMarriage(),
                    resumeBean_save.getPhone(),
                    resumeBean_save.getEmail(),
                    resumeBean_save.getSite(),
                    resumeBean_save.getImg(),
                    resumeBean_save.getExp(),
                    resumeBean_save.getExpdetail(),
                    resumeBean_save.getEdu(),
                    resumeBean_save.getEdudetail(),
                    resumeBean_save.getProject(),
                    resumeBean_save.getSchool(),
                    resumeBean_save.getOther(),
                    String.valueOf(resumeBean_save.getUser())
            };
            int result = SqlHelper.doUpdate(sql,parameters);
            if (result > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * 用户获取岗位信息
     * @return
     */
    private String doUserGetJob() {
        String sql = "select * from jobs where state=0 order by id desc";
        List<JobBean> jobBeanList = SqlHelper.doListQuery(sql,null,JobBean.class);
        if (jobBeanList != null) {
            JSONArray jsonArray = JSONArray.fromObject(jobBeanList);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 用户获取投递情况
     * @param req
     * @return
     */
    private String doUserGetSend(HttpServletRequest req) {
        String sql = "select sends.id,jobs.title,jobs.description,jobs.pay,jobs.phone,jobs.email,sends.state from jobs,sends where sends.user=? and sends.job=jobs.id order by sends.id desc";
        String[] parameters = {req.getParameter("user")};
        List<MyBean> myBeanList = SqlHelper.doListQuery(sql,parameters,MyBean.class);
        if (myBeanList != null) {
            JSONArray jsonArray = JSONArray.fromObject(myBeanList);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 用户投递简历
     * @param req
     * @return
     */
    private String doUserSendResume(HttpServletRequest req) {
        //数据校验
        String sql_c = "select * from sends where user=? and job=?";
        String[] parameters_c = {req.getParameter("user"),req.getParameter("job")};
        SendBean sendBean_c = SqlHelper.doObjQuery(sql_c,parameters_c,SendBean.class);
        if (null != sendBean_c) {
            //已经投递过
            return "";
        } else {
            //未曾投递，获取用户的简历编号
            String sql_r = "select id from resumes where user=?";
            String[] parameters_r = {req.getParameter("user")};
            ResumeBean resumeBean_r = SqlHelper.doObjQuery(sql_r,parameters_r,ResumeBean.class);
            if (null == resumeBean_r) {
                //简历不存在
                return "false";
            } else {
                String sql = "insert into sends(user,job,resume) values(?,?,?)";
                String[] parameters = {req.getParameter("user"),req.getParameter("job"), String.valueOf(resumeBean_r.getId())};
                int result = SqlHelper.doUpdate(sql,parameters);
                if (result > 0) {
                    return "true";
                } else {
                    return "false";
                }
            }
        }
    }
}
