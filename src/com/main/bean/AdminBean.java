package com.main.bean;

/**
 * @author 谢晓晓
 * @date 2019/01/04
 * @describe 管理员信息表Bean
 */
public class AdminBean {
    private int id;
    private String name;
    private String pwd;
    private int power;

    public AdminBean() {
    }

    public AdminBean(String name, String pwd) {
        this.name = name;
        this.pwd = pwd;
    }

    public AdminBean(String name, String pwd, int power) {
        this.name = name;
        this.pwd = pwd;
        this.power = power;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public int getPower() {
        return power;
    }

    public void setPower(int power) {
        this.power = power;
    }
}
