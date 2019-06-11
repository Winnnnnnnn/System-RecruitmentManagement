package com.main.utils;

/**
 * @author 谢晓晓
 * @date 2019/01/13
 * @describe 静态资源工具汇总
 */
public class ConstUtil {
    //用户登录标记
    public static String USER_LOGIN_KEY = "USER_LOGIN_KEY";
    //用户ID
    public static String USER_ID = "USER_ID";
    //用户手机号
    public static String USER_PHONE = "USER_PHONE";

    /**
     * 前后端交互动作汇总
     */
    //管理员登录动作
    public static final String ACTION_ADMIN_LOGIN = "ACTION_ADMIN_LOGIN";
    //管理员获取全部岗位信息动作
    public static final String ACTION_ADMIN_GET_JOB_INFO = "ACTION_ADMIN_GET_JOB_INFO";
    //管理员添加岗位信息动作
    public static final String ACTION_ADMIN_ADD_JOB_INFO = "ACTION_ADMIN_ADD_JOB_INFO";
    //管理员编辑岗位信息动作
    public static final String ACTION_ADMIN_EDIT_JOB_INFO = "ACTION_ADMIN_EDIT_JOB_INFO";
    //管理员岗位招满/开放动作
    public static final String ACTION_ADMIN_STATE_JOB_INFO = "ACTION_ADMIN_STATE_JOB_INFO";
    //管理员删除岗位动作
    public static final String ACTION_ADMIN_DEL_JOB_INFO = "ACTION_ADMIN_DEL_JOB_INFO";
    //管理员获取全部投递状况
    public static final String ACTION_ADMIN_GET_SEND = "ACTION_ADMIN_GET_SEND";
    //管理员调用用户简历
    public static final String ACTION_ADMIN_GET_RESUME = "ACTION_ADMIN_GET_RESUME";
    //管理员修改投递状况
    public static final String ACTION_ADMIN_EDIT_SEND = "ACTION_ADMIN_EDIT_SEND";
    //管理员获取用户信息
    public static final String ACTION_ADMIN_GET_USER = "ACTION_ADMIN_GET_USER";
    //管理员修改用户密码
    public static final String ACTION_ADMIN_EDIT_USER = "ACTION_ADMIN_EDIT_USER";
    //管理员获取全部管理员信息
    public static final String ACTION_ADMIN_GET_ADMIN = "ACTION_ADMIN_GET_ADMIN";
    //管理员添加
    public static final String ACTION_ADMIN_ADD_ADMIN = "ACTION_ADMIN_ADD_ADMIN";
    //管理员编辑
    public static final String ACTION_ADMIN_EDIT_ADMIN = "ACTION_ADMIN_EDIT_ADMIN";
    //管理员删除
    public static final String ACTION_ADMIN_DEL_ADMIN = "ACTION_ADMIN_DEL_ADMIN";

    //用户登录动作
    public static final String ACTION_USER_LOGIN = "ACTION_USER_LOGIN";
    //用户注册动作
    public static final String ACTION_USER_SIGN_UP = "ACTION_USER_SIGN_UP";
    //用户登出动作
    public static final String ACTION_USER_LOGOUT = "ACTION_USER_LOGOUT";
    //用户获取个人简历动作
    public static final String ACTION_USER_GET_RESUME = "ACTION_USER_GET_RESUME";
    //用户保存个人简历动作
    public static final String ACTION_USER_SAVE_RESUME = "ACTION_USER_SAVE_RESUME";
    //用户获取岗位列表动作
    public static final String ACTION_USER_GET_JOB = "ACTION_USER_GET_JOB";
    //用户获取个人投递情况动作
    public static final String ACTION_USER_GET_SEND = "ACTION_USER_GET_SEND";
    //用户投递简历动作
    public static final String ACTION_USER_SEND_RESUME = "ACTION_USER_SEND_RESUME";
}
