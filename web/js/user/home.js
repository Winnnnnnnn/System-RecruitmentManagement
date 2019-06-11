//简历编辑时计数器
var resume_item_count = 0;
//简历数据
var resume_data = null;

$(function () {
    //初始化状态栏
    initNav();
    //路由分发
    var menu = getUrlParam('menu');
    if (null == menu) {
        $('#user_nav_home').css('color','#f39800');
        initHome();
    } else {
        switch (menu) {
            case 'home':
                $('#user_nav_home').css('color','#f39800');
                initHome();
                break;
            case 'resume':
                $('#user_nav_resume').css('color','#f39800');
                initResume();
                break;
            case 'user':
                $('#user_nav_user').css('color','#f39800');
                initMy();
                break;
            default :
                $('#user_nav_home').css('color','#f39800');
                initHome();
                break;
        }
    }
});

/**
 * 初始化导航栏
 */
function initNav() {
    var id = getUrlParam('id');
    var phone = getUrlParam('phone');
    $('#user_nav_name').html('用户：' + phone);
    $('#user_nav_home').click(function () {
        window.location = '/page/user/home.jsp?id=' + id + '&phone=' + phone + '&menu=home';
    });
    $('#user_nav_resume').click(function () {
        window.location = '/page/user/home.jsp?id=' + id + '&phone=' + phone + '&menu=resume';
    });
    $('#user_nav_user').click(function () {
        window.location = '/page/user/home.jsp?id=' + id + '&phone=' + phone + '&menu=user';
    });
    $('#user_nav_logout').click(function () {
        //退出登录
        var data = {
            action:'ACTION_USER_LOGOUT'
        };
        $.ajax({
            type: 'post',
            url: '/user',
            dataType: "json",
            data: data,
            success: function (data) {
                //登出回登录页
                window.location = '/page/user/login.jsp';
            },
            error: function () {
                //登出回登录页
                window.location = '/page/user/login.jsp';
            }
        });
    });
}

/**
 * 初始化个人简历页
 */
function initResume() {
    $('#user_resume').show(1000);
    //请求获取个人简历
    var data = {
        action:'ACTION_USER_GET_RESUME',
        id:getUrlParam('id')
    };
    $.ajax({
        type: 'post',
        url: '/user',
        dataType: "json",
        data: data,
        success: function (data) {
            //填充简历数据
            resume_data = data;
            //有简历
            $('#user_resume_lay_has').show();
            //填充数据
            $('#user_resume_lay_title').html(data.title);
            $("#user_resume_lay_img").attr("src", "/image/head/" + data.img);
            $('#user_resume_lay_name').html(data.name);
            $('#user_resume_lay_sex').html(data.sex);
            $('#user_resume_lay_date').html(data.date);
            $('#user_resume_lay_age').html(data.age + '岁');
            $('#user_resume_lay_nation').html(data.nation);
            $('#user_resume_lay_birthplace').html(data.birthplace);
            $('#user_resume_lay_politics').html(data.politics);
            $('#user_resume_lay_marriage').html(data.marriage);
            $('#user_resume_lay_phone').html(data.phone);
            $('#user_resume_lay_email').html(data.email);
            $('#user_resume_lay_site').html(data.site);
            $('#user_resume_lay_exp').html(data.exp);
            var expdetail = data.expdetail.split(',');
            $.each(expdetail,function () {
                if (this != '') {
                    $('#user_resume_lay_expdetail').append('<div class="UserHasResumeDetailItem">' + this + '</div>');
                }
            });
            $('#user_resume_lay_edu').html(data.edu);
            var edudetail = data.edudetail.split(',');
            $.each(edudetail,function () {
                if (this != '') {
                    $('#user_resume_lay_edudetail').append('<div class="UserHasResumeDetailItem">' + this + '</div>');
                }
            });
            var project = data.project.split(',');
            $.each(project,function () {
                if (this != '') {
                    $('#user_resume_lay_project').append('<div class="UserHasResumeDetailItem">' + this + '</div>');
                }
            });
            var school = data.school.split(',');
            $.each(school,function () {
                if (this != '') {
                    $('#user_resume_lay_school').append('<div class="UserHasResumeDetailItem">' + this + '</div>');
                }
            });
            var other = data.other.split(',');
            $.each(other,function () {
                if (this != '') {
                    $('#user_resume_lay_other').append('<div class="UserHasResumeDetailItem">' + this + '</div>');
                }
            });
        },
        error: function () {
            //没有简历
            $('#user_resume_lay_no').show();
        }
    });
    //绑定立即创建简历按钮
    $('#user_resume_add').click(function () {
       $('#user_resume_lay_no').hide();
       $('#user_resume_lay_edit').show();
       resume_item_count = 0;
    });
    //绑定日期选择组件
    $('#user_resume_date').datetimepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        startView: 2,
        minView: 2,
        initialDate: new Date(),
        forceParse: true,
        bootcssVer:3,
        language: 'zh-CN'
    });
    //实时自动计算年龄
    $('#user_resume_date').change(function () {
       $('#user_resume_age').val(jsGetAge($(this).val()));
    });
    //绑定头像选择
    $('#user_resume_img').click(function () {
        $('#user_resume_file').click();
        $('#user_resume_file').on('change',function () {
            var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
            if (objUrl) {
                $("#user_resume_img").attr("src", objUrl); //将图片路径存入src中，显示出图片
            }
        });
    });
    //绑定开始时间组件
    $('#user_resume_dialog_start_time').datetimepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        startView: 2,
        minView: 2,
        initialDate: new Date(),
        forceParse: true,
        bootcssVer:3,
        language: 'zh-CN'
    });
    //绑定结束时间组件
    $('#user_resume_dialog_end_time').datetimepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        startView: 2,
        minView: 2,
        initialDate: new Date(),
        forceParse: true,
        bootcssVer:3,
        language: 'zh-CN'
    });
    //绑定对话框确认按钮
    $('#user_resume_dialog_btn_add').click(function () {
       //获取数据
       var start_time = $('#user_resume_dialog_start_time').val();
       var end_time = $('#user_resume_dialog_end_time').val();
       var content = $('#user_resume_dialog_content').val();
       var id = $('#user_resume_dialog_id').val();
       //数据校验
        if ('' == start_time || '' == end_time || '' == content) {
            alert('数据无效');
        } else {
             var item_id = 'item_id' + resume_item_count;
             var item = '<div id="' + item_id + '" class="UserCreateResumeItem" onclick="delElemt(\'' + item_id + '\')">' + start_time + '至' + end_time + '<br/>' + content + '</div>';
             //添加到容器
            $('#' + id).append(item);
            //让id加一
            resume_item_count++;
            $('#user_resume_dialog').modal('hide');
        }
    });
    //绑定保存简历按钮
    $('#user_resume_save').click(function () {
        //获取数据
        var title = $('#user_resume_title').val();
        var name = $('#user_resume_name').val();
        var sex = $('#user_resume_sex').val();
        var date = $('#user_resume_date').val();
        var age = $('#user_resume_age').val();
        var nation = $('#user_resume_nation').val();
        var birthplace = $('#user_resume_birthplace').val();
        var politics = $('#user_resume_politics').val();
        var marriage = $('#user_resume_marriage').val();
        var phone = $('#user_resume_phone').val();
        var email = $('#user_resume_email').val();
        var site = $('#user_resume_site').val();
        var exp = $('#user_resume_exp').val();
        var edu = $('#user_resume_edu').val();
        var expdetail = '';
        var edudetail = '';
        var project = '';
        var school = '';
        var other = '';
        //数据校验
        if ('' == title || '' == name || '' == sex || '' == date || '' == age || '' == nation || '' == birthplace || '' == politics || '' == marriage || '' == phone || '' == email || '' == site || '' == exp || '' == edu) {
            alert('数据无效!');
        } else {
            $('#user_resume_expdetail div').each(function () {
                expdetail += $(this).html() + ',';
            });
            $('#user_resume_edudetail div').each(function () {
                edudetail += $(this).html() + ',';
            });
            $('#user_resume_project div').each(function () {
                project += $(this).html() + ',';
            });
            $('#user_resume_school div').each(function () {
                school += $(this).html() + ',';
            });
            $('#user_resume_other div').each(function () {
                other += $(this).html() + ',';
            });
            //数据整理
            expdetail = expdetail.substr(0,expdetail.length-1);
            edudetail = edudetail.substr(0,edudetail.length-1);
            project = project.substr(0,project.length-1);
            school = school.substr(0,school.length-1);
            other = other.substr(0,other.length-1);
            //判断头像是否需要上传
            if ('' == $('#user_resume_file').val()) {
                //判断是否为编辑
                var img = '男孩头像.png';
                if (null == resume_data) {
                    img = '男孩头像.png';
                } else {
                    img = resume_data.img;
                }
                //封装数据
                var data = {
                    action:'ACTION_USER_SAVE_RESUME',
                    user:getUrlParam('id'),
                    title:title,
                    name:name,
                    sex:sex,
                    date:date,
                    age:age,
                    nation:nation,
                    birthplace:birthplace,
                    politics:politics,
                    marriage:marriage,
                    phone:phone,
                    email:email,
                    site:site,
                    img:img,
                    exp:exp,
                    expdetail:expdetail,
                    edu:edu,
                    edudetail:edudetail,
                    project:project,
                    school:school,
                    other:other
                };
                //提交数据到后台
                $.ajax({
                    type: 'post',
                    url: '/user',
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        if (data) {
                            //保存成功，刷新一遍页面
                            window.location = window.location.href;
                        } else {
                            alert('保存失败!');
                        }
                    },
                    error: function () {
                        alert('保存失败!');
                    }
                });
            } else {
                //上传图片
                $.ajax({
                    url:'/img',
                    type:'post',
                    cache:false,
                    data:new FormData($('#user_resume_form')[0]),
                    processData: false,
                    contentType: false,
                    dataType:"json",
                    complete: function (res) {
                        //图片名称
                        var img = res.responseText;
                        //封装数据
                        var data = {
                            action:'ACTION_USER_SAVE_RESUME',
                            user:getUrlParam('id'),
                            title:title,
                            name:name,
                            sex:sex,
                            date:date,
                            age:age,
                            nation:nation,
                            birthplace:birthplace,
                            politics:politics,
                            marriage:marriage,
                            phone:phone,
                            email:email,
                            site:site,
                            img:img,
                            exp:exp,
                            expdetail:expdetail,
                            edu:edu,
                            edudetail:edudetail,
                            project:project,
                            school:school,
                            other:other
                        };
                        //提交数据到后台
                        $.ajax({
                            type: 'post',
                            url: '/user',
                            dataType: "json",
                            data: data,
                            success: function (data) {
                                if (data) {
                                    //保存成功，刷新一遍页面
                                    window.location = window.location.href;
                                } else {
                                    alert('保存失败!');
                                }
                            },
                            error: function () {
                                alert('保存失败!');
                            }
                        });
                    }
                });
            }
        }
    });
    /**
     * 绑定修改简历按钮
     */
    $('#user_resume_edit').click(function () {
        //重置ID
        resume_item_count = 0;
        //打开编辑页
        $('#user_resume_lay_has').hide();
        $('#user_resume_lay_edit').show();
        //数据填充
        $('#user_resume_title').val(resume_data.title);
        $("#user_resume_img").attr("src", "/image/head/" + resume_data.img);
        $('#user_resume_name').val(resume_data.name);
        $('#user_resume_sex').val(resume_data.sex);
        $('#user_resume_date').val(resume_data.date);
        $('#user_resume_age').val(resume_data.age);
        $('#user_resume_nation').val(resume_data.nation);
        $('#user_resume_birthplace').val(resume_data.birthplace);
        $('#user_resume_politics').val(resume_data.politics);
        $('#user_resume_marriage').val(resume_data.marriage);
        $('#user_resume_phone').val(resume_data.phone);
        $('#user_resume_email').val(resume_data.email);
        $('#user_resume_site').val(resume_data.site);
        $('#user_resume_exp').val(resume_data.exp);
        var expdetail = resume_data.expdetail.split(',');
        $.each(expdetail,function () {
            if (this != '') {
                var item_id = 'item_id' + resume_item_count;
                $('#user_resume_expdetail').append('<div id="' + item_id + '" class="UserCreateResumeItem" onclick="delElemt(\'' + item_id + '\')">' + this + '</div>');
                resume_item_count++;
            }
        });
        $('#user_resume_edu').val(resume_data.edu);
        var edudetail = resume_data.edudetail.split(',');
        $.each(edudetail,function () {
            if (this != '') {
                var item_id = 'item_id' + resume_item_count;
                $('#user_resume_edudetail').append('<div id="' + item_id + '" class="UserCreateResumeItem" onclick="delElemt(\'' + item_id + '\')">' + this + '</div>');
            }
        });
        var project = resume_data.project.split(',');
        $.each(project,function () {
            if (this != '') {
                var item_id = 'item_id' + resume_item_count;
                $('#user_resume_project').append('<div id="' + item_id + '" class="UserCreateResumeItem" onclick="delElemt(\'' + item_id + '\')">' + this + '</div>');
                resume_item_count++;
            }
        });
        var school = resume_data.school.split(',');
        $.each(school,function () {
            if (this != '') {
                var item_id = 'item_id' + resume_item_count;
                $('#user_resume_school').append('<div id="' + item_id + '" class="UserCreateResumeItem" onclick="delElemt(\'' + item_id + '\')">' + this + '</div>');
                resume_item_count++;
            }
        });
        var other = resume_data.other.split(',');
        $.each(other,function () {
            if (this != '') {
                var item_id = 'item_id' + resume_item_count;
                $('#user_resume_other').append('<div id="' + item_id + '" class="UserCreateResumeItem" onclick="delElemt(\'' + item_id + '\')">' + this + '</div>');
                resume_item_count++;
            }
        });
    });
}

/**
 * 初始化首页
 */
function initHome() {
    $('#user_job').show(1000);
    //获取岗位列表
    var table = new JobTableInit();
    table.Init(1);
}

/**
 * 投递简历
 * @param id
 */
function sendResume(id) {
    //数据封装
    var data = {
        action:'ACTION_USER_SEND_RESUME',
        user:getUrlParam('id'),
        job:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/user',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                alert('投递成功');
            } else {
                alert('您还没有创建简历哦!');
            }
        },
        error: function () {
            alert('您已经投递过啦!');
        }
    });
}

/**
 * 岗位表初始化
 * @returns {Object}
 * @constructor
 */
var JobTableInit = function () {
    var jobTableInit = new Object();
    /**
     * 初始化构造
     * @param pageNumber
     * @constructor
     */
    jobTableInit.Init = function (pageNumber) {
        var data = {action:"ACTION_USER_GET_JOB"};
        $.ajax({
            type: 'post',
            url: '/user',
            dataType: "json",
            data: data,
            success: function (data) {
                $("#user_job_table").bootstrapTable('destroy');
                $('#user_job_table').bootstrapTable({
                    pagination: true,
                    sortable: false,
                    pageNumber: pageNumber,
                    striped: true,
                    search: true,
                    pageSize: 20,
                    pageList: [10, 25, 50, 100],
                    uniqueId: "id",
                    data: data,
                    columns: [{
                        field: 'title',
                        title: '岗位',
                        align: 'center'
                    }, {
                        field: 'description',
                        title: '信息',
                        align: 'center'
                    }, {
                        field: 'num',
                        title: '人数',
                        align: 'center'
                    }, {
                        field: 'note',
                        title: '标签',
                        align: 'center',
                        formatter: function (value, row, index) {
                            var result = '<div>';
                            var label = value.split(',');
                            $.each(label,function () {
                                if ('' != this)
                                    result += '<div class="AdminPostsRightJobDialogNote">' + this + '</div>';
                            });
                            result += '</div>';
                            return result;
                        }
                    }, {
                        field: 'site',
                        title: '地点',
                        align: 'center'
                    }, {
                        field: 'pay',
                        title: '薪酬',
                        align: 'center'
                    }, {
                        field: 'exp',
                        title: '经验要求',
                        align: 'center'
                    }, {
                        field: 'edu',
                        title: '学历要求',
                        align: 'center'
                    }, {
                        field: 'phone',
                        title: '联系方式',
                        align: 'center'
                    }, {
                        field: 'email',
                        title: '联系邮箱',
                        align: 'center'
                    }, {
                        field: 'time',
                        title: '发布日期',
                        align: 'center'
                    }, {
                        field: 'id',
                        title: '操作',
                        align: 'center',
                        formatter: function (value, row, index) {
                            return '<button class="UserJobLayTableBtn UserJobLayTableNoWrap" onclick="sendResume(\'' + value + '\')">投递简历</button>';
                        }
                    }]
                });
            },
            error: function () {
                console.log('失败');
            }
        });
    };
    return jobTableInit;
};

/**
 * 初始化我的
 */
function initMy() {
    $('#user_sends').show();
    //初始化个人投递表
    var table = new MyTableInit();
    table.Init(1);
}

/**
 * 投递表初始化
 * @returns {Object}
 * @constructor
 */
var MyTableInit = function () {
    var myTableInit = new Object();
    /**
     * 初始化构造
     * @param pageNumber
     * @constructor
     */
    myTableInit.Init = function (pageNumber) {
        var data = {action:"ACTION_USER_GET_SEND",user:getUrlParam('id')};
        $.ajax({
            type: 'post',
            url: '/user',
            dataType: "json",
            data: data,
            success: function (data) {
                console.log(data);
                $("#user_sends_table").bootstrapTable('destroy');
                $('#user_sends_table').bootstrapTable({
                    pagination: true,
                    sortable: false,
                    pageNumber: pageNumber,
                    striped: true,
                    search: true,
                    pageSize: 20,
                    pageList: [10, 25, 50, 100],
                    uniqueId: "id",
                    data: data,
                    columns: [{
                        field: 'title',
                        title: '岗位',
                        align: 'center'
                    }, {
                        field:'description',
                        title:'信息',
                        align:'center'
                    }, {
                        field:'pay',
                        title:'薪酬',
                        align:'center'
                    }, {
                        field:'phone',
                        title:'联系方式',
                        align:'center'
                    }, {
                        field:'email',
                        title:'联系邮箱',
                        align:'center'
                    }, {
                        field:'state',
                        title:'当前状态',
                        align:'center',
                        formatter: function (value, row, index) {
                            switch (value) {
                                case 0:
                                    return '等待HR查阅';
                                case 1:
                                    return '面试邀请';
                                case 2:
                                    return '录取';
                                case 3:
                                    return '不符合';
                            }
                        }
                    }]
                });
            },
            error: function () {
                console.log('失败');
            }
        });
    };
    return myTableInit;
};

/**
 * 绑定添加工作经验按钮
 */
function openExpDialog() {
    $('#user_resume_dialog_label').html('添加工作经验');
    $('#user_resume_dialog_id').val('user_resume_expdetail');
    $('#user_resume_dialog_start_time').val('');
    $('#user_resume_dialog_end_time').val('');
    $('#user_resume_dialog_content').val('');
}

/**
 * 绑定添加教育经历按钮
 */
function openEduDialog() {
    $('#user_resume_dialog_label').html('添加教育经历');
    $('#user_resume_dialog_id').val('user_resume_edudetail');
    $('#user_resume_dialog_start_time').val('');
    $('#user_resume_dialog_end_time').val('');
    $('#user_resume_dialog_content').val('');
}

/**
 * 绑定添加项目经验按钮
 */
function openProjectDialog() {
    $('#user_resume_dialog_label').html('添加项目经验');
    $('#user_resume_dialog_id').val('user_resume_project');
    $('#user_resume_dialog_start_time').val('');
    $('#user_resume_dialog_end_time').val('');
    $('#user_resume_dialog_content').val('');
}

/**
 * 绑定添加在校情况/个人情况按钮
 */
function openSchoolDialog() {
    $('#user_resume_dialog_label').html('添加在校情况/个人情况');
    $('#user_resume_dialog_id').val('user_resume_school');
    $('#user_resume_dialog_start_time').val('');
    $('#user_resume_dialog_end_time').val('');
    $('#user_resume_dialog_content').val('');
}

/**
 * 绑定添加其他信息按钮
 */
function openOtherDialog() {
    $('#user_resume_dialog_label').html('添加其他信息');
    $('#user_resume_dialog_id').val('user_resume_other');
    $('#user_resume_dialog_start_time').val('');
    $('#user_resume_dialog_end_time').val('');
    $('#user_resume_dialog_content').val('');
}

/**
 * 删除指定标签
 * @param id
 */
function delElemt(id) {
    $('#' + id).remove();
}

/**
 * 获取url中的指定参数
 * @param {any} name
 */
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    //返回参数值
    if (r != null)
        return decodeURI(r[2]);
    return null;
}

/**
 * 自动计算年龄
 * @param strBirthday
 * @returns {number}
 */
function jsGetAge(strBirthday){
    var returnAge;
    var strBirthdayArr=strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();
    if(nowYear == birthYear){
        returnAge = 0;//同年 则为0岁
    }
    else{
        var ageDiff = nowYear - birthYear ; //年之差
        if(ageDiff > 0){
            if(nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差
                if(dayDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
            else
            {
                var monthDiff = nowMonth - birthMonth;//月之差
                if(monthDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
        }
        else
        {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge;//返回周岁年龄
}

/**
 * 获取图片的url
 * @param file
 * @returns {*}
 */
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) {
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) {
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { 
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}
