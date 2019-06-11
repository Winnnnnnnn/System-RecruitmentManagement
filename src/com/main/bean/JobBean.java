package com.main.bean;

/**
 * @author 谢晓晓
 * @date 2019/02/20
 * @describe 岗位信息表Bean
 */
public class JobBean {
    private int id;
    private  String title;
    private String description;
    private int num;
    private String note;
    private String site;
    private String pay;
    private String exp;
    private String edu;
    private String phone;
    private String email;
    private int state;
    private String time;

    public JobBean() {
    }

    /**
     * 添加时调用
     * @param title
     * @param description
     * @param num
     * @param note
     * @param site
     * @param pay
     * @param exp
     * @param edu
     * @param phone
     * @param email
     * @param time
     */
    public JobBean(String title, String description, int num, String note, String site, String pay, String exp, String edu, String phone, String email, String time) {
        this.title = title;
        this.description = description;
        this.num = num;
        this.note = note;
        this.site = site;
        this.pay = pay;
        this.exp = exp;
        this.edu = edu;
        this.phone = phone;
        this.email = email;
        this.time = time;
    }

    /**
     * 编辑时调用
     * @param id
     * @param title
     * @param description
     * @param num
     * @param note
     * @param site
     * @param pay
     * @param exp
     * @param edu
     * @param phone
     * @param email
     */
    public JobBean(int id, String title, String description, int num, String note, String site, String pay, String exp, String edu, String phone, String email) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.num = num;
        this.note = note;
        this.site = site;
        this.pay = pay;
        this.exp = exp;
        this.edu = edu;
        this.phone = phone;
        this.email = email;
    }

    /**
     * 修改状态时调用
     * @param id
     * @param state
     */
    public JobBean(int id, int state) {
        this.id = id;
        this.state = state;
    }

    /**
     * 删除时调用
     * @param id
     */
    public JobBean(int id) {
        this.id = id;
    }

    public JobBean(int id, String title, String description, int num, String note, String site, String pay, String exp, String edu, String phone, String email, int state, String time) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.num = num;
        this.note = note;
        this.site = site;
        this.pay = pay;
        this.exp = exp;
        this.edu = edu;
        this.phone = phone;
        this.email = email;
        this.state = state;
        this.time = time;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public String getPay() {
        return pay;
    }

    public void setPay(String pay) {
        this.pay = pay;
    }

    public String getExp() {
        return exp;
    }

    public void setExp(String exp) {
        this.exp = exp;
    }

    public String getEdu() {
        return edu;
    }

    public void setEdu(String edu) {
        this.edu = edu;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
