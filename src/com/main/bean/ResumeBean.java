package com.main.bean;

/**
 * @author 谢晓晓
 * @date 2019/02/23
 * @describe 简历信息表Bean
 */
public class ResumeBean {
    private int id;
    private int user;
    private String title;
    private String name;
    private String sex;
    private String date;
    private int age;
    private String nation;
    private String birthplace;
    private String politics;
    private String marriage;
    private String phone;
    private String email;
    private String site;
    private String img;
    private String exp;
    private String expdetail;
    private String edu;
    private String edudetail;
    private String project;
    private String school;
    private String other;

    public ResumeBean() {
    }

    public ResumeBean(int user) {
        this.user = user;
    }

    public ResumeBean(int user, String title, String name, String sex, String date, int age, String nation, String birthplace, String politics, String marriage, String phone, String email, String site, String img, String exp, String expdetail, String edu, String edudetail, String project, String school, String other) {
        this.user = user;
        this.title = title;
        this.name = name;
        this.sex = sex;
        this.date = date;
        this.age = age;
        this.nation = nation;
        this.birthplace = birthplace;
        this.politics = politics;
        this.marriage = marriage;
        this.phone = phone;
        this.email = email;
        this.site = site;
        this.img = img;
        this.exp = exp;
        this.expdetail = expdetail;
        this.edu = edu;
        this.edudetail = edudetail;
        this.project = project;
        this.school = school;
        this.other = other;
    }

    public ResumeBean(int id, int user, String title, String name, String sex, String date, int age, String nation, String birthplace, String politics, String marriage, String phone, String email, String site, String img, String exp, String expdetail, String edu, String edudetail, String project, String school, String other) {
        this.id = id;
        this.user = user;
        this.title = title;
        this.name = name;
        this.sex = sex;
        this.date = date;
        this.age = age;
        this.nation = nation;
        this.birthplace = birthplace;
        this.politics = politics;
        this.marriage = marriage;
        this.phone = phone;
        this.email = email;
        this.site = site;
        this.img = img;
        this.exp = exp;
        this.expdetail = expdetail;
        this.edu = edu;
        this.edudetail = edudetail;
        this.project = project;
        this.school = school;
        this.other = other;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getBirthplace() {
        return birthplace;
    }

    public void setBirthplace(String birthplace) {
        this.birthplace = birthplace;
    }

    public String getPolitics() {
        return politics;
    }

    public void setPolitics(String politics) {
        this.politics = politics;
    }

    public String getMarriage() {
        return marriage;
    }

    public void setMarriage(String marriage) {
        this.marriage = marriage;
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

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getExp() {
        return exp;
    }

    public void setExp(String exp) {
        this.exp = exp;
    }

    public String getExpdetail() {
        return expdetail;
    }

    public void setExpdetail(String expdetail) {
        this.expdetail = expdetail;
    }

    public String getEdu() {
        return edu;
    }

    public void setEdu(String edu) {
        this.edu = edu;
    }

    public String getEdudetail() {
        return edudetail;
    }

    public void setEdudetail(String edudetail) {
        this.edudetail = edudetail;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getOther() {
        return other;
    }

    public void setOther(String other) {
        this.other = other;
    }

    @Override
    public String toString() {
        return "ResumeBean{" +
                "id=" + id +
                ", user=" + user +
                ", title='" + title + '\'' +
                ", name='" + name + '\'' +
                ", sex='" + sex + '\'' +
                ", date='" + date + '\'' +
                ", age=" + age +
                ", nation='" + nation + '\'' +
                ", birthplace='" + birthplace + '\'' +
                ", politics='" + politics + '\'' +
                ", marriage='" + marriage + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", site='" + site + '\'' +
                ", img='" + img + '\'' +
                ", exp='" + exp + '\'' +
                ", expdetail='" + expdetail + '\'' +
                ", edu='" + edu + '\'' +
                ", edudetail='" + edudetail + '\'' +
                ", project='" + project + '\'' +
                ", school='" + school + '\'' +
                ", other='" + other + '\'' +
                '}';
    }
}
