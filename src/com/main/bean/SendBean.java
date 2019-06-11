package com.main.bean;

/**
 * @author 谢晓晓
 * @date 2019/02/23
 * @describe 投递状态信息表Bean
 */
public class SendBean {
    private int id;
    private int user;
    private int job;
    private int resume;
    private int state;

    public SendBean() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser() {
        return user;
    }

    public void setUser(int user) {
        this.user = user;
    }

    public int getJob() {
        return job;
    }

    public void setJob(int job) {
        this.job = job;
    }

    public int getResume() {
        return resume;
    }

    public void setResume(int resume) {
        this.resume = resume;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }
}
