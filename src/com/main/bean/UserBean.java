package com.main.bean;

/**
 * @author 谢晓晓
 * @date 2019/02/23
 * @describe 用户信息表Bean
 */
public class UserBean {
    private int id;
    private String phone;
    private String pwd;

    public UserBean() {
    }

    public UserBean(String phone, String pwd) {
        this.phone = phone;
        this.pwd = pwd;
    }

    public UserBean(int id, String phone, String pwd) {
        this.id = id;
        this.phone = phone;
        this.pwd = pwd;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}
