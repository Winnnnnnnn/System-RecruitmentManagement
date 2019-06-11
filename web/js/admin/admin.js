//岗位管理：标签计数器
var admin_job_note_count = 0;

//启动路口
$(function () {
    initNav();
    //路由分发
    var menu = getUrlParam('menu');
    if (null == menu) {
        //岗位管理
        initPosts();
    } else {
        switch (menu) {
            case 'posts':
                //岗位管理
                initPosts();
                break;
            case 'user':
                //用户管理
                initUser();
                break;
            case 'admin':
                //管理员管理
                initAdmin();
                break;
            default:
                //岗位管理
                initPosts();
                break;
        }
    }
});

/**
 * 初始化导航栏、以及其路由分发
 */
function initNav() {
    var name = getUrlParam('name');
    var power = getUrlParam('power');
    $('#admin_nav_name').html('欢迎您:' + name);
    //绑定路由
    $('#admin_nav_posts').click(function () {
        window.location = '/page/admin/admin.jsp?name=' + name + '&power=' + power + '&menu=posts';
    });
    $('#admin_nav_user').click(function () {
        window.location = '/page/admin/admin.jsp?name=' + name + '&power=' + power + '&menu=user';
    });
    $('#admin_nav_admin').click(function () {
        window.location = '/page/admin/admin.jsp?name=' + name + '&power=' + power + '&menu=admin';
    });
    $('#admin_nav_logout').click(function () {
        window.location = '/page/admin/login.jsp';
    });
}

/**
 * 初始化岗位管理
 */
function initPosts() {
    //弹出布局
    $('#admin_posts').show(1000);
    //绑定路由
    var name = getUrlParam('name');
    var power = getUrlParam('power');
    $('#admin_posts_job').click(function () {
        window.location = '/page/admin/admin.jsp?name=' + name + '&power=' + power + '&menu=posts&posts=0';
    });
    $('#admin_posts_case').click(function () {
        window.location = '/page/admin/admin.jsp?name=' + name + '&power=' + power + '&menu=posts&posts=1';
    });
    //获取左侧菜单的路由
    var posts = getUrlParam('posts');
    if (null == posts) {
        $('#admin_posts_job').css('color','#f39800');
        $('#admin_posts_job_lay').show();
        //填充岗位信息数据
        var jobTable = new JobTableInit();
        jobTable.Init(1);
    } else {
        switch (posts) {
            case '0':
                $('#admin_posts_job').css('color','#f39800');
                $('#admin_posts_job_lay').show();
                //填充岗位信息数据
                var jobTable = new JobTableInit();
                jobTable.Init(1);
                break;
            case '1':
                $('#admin_posts_case').css('color','#f39800');
                //显示投递情况信息数据
                $('#admin_posts_send_lay').show();
                var sendTable = new SendTableInit();
                sendTable.Init(1);
                break;
            default :
                $('#admin_posts_job').css('color','#f39800');
                $('#admin_posts_job_lay').show();
                //填充岗位信息数据
                var jobTable = new JobTableInit();
                jobTable.Init(1);
                break;
        }
    }
    //防止对话框滚动条失效的
    $('#admin_posts_job_note_dialog').on("hidden.bs.modal",function(){
        $(document.body).addClass("modal-open");
    });
}

/**
 * 初始化投递情况信息表
 * @returns {Object}
 * @constructor
 */
var SendTableInit = function () {
    var sendTableInit = new Object();
    /**
     * 初始化构造
     * @param pageNumber
     * @constructor
     */
    sendTableInit.Init = function (pageNumber) {
        var data = {action:"ACTION_ADMIN_GET_SEND"};
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                $("#admin_posts_send_table").bootstrapTable('destroy');
                $('#admin_posts_send_table').bootstrapTable({
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
                        field:'exp',
                        title:'经验要求',
                        align:'center'
                    }, {
                        field:'edu',
                        title:'学历要求',
                        align:'center'
                    }, {
                        field:'name',
                        title:'投递人',
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
                    }, {
                        field:'resume',
                        title:'详情',
                        align:'center',
                        formatter: function (value, row, index) {
                            return '<button class="UserJobLayTableBtn UserJobLayTableNoWrap" data-toggle="modal" data-target="#admin_posts_send_dialog" onclick="seeUserResume(\'' + row.id + '\',\'' + value + '\')">查看简历</button>';
                        }
                    }]
                });
            },
            error: function () {
                console.log('失败');
            }
        });
    };
    return sendTableInit;
};

/**
 * 查看用户简历详情
 * @param id
 * @param resume
 */
function seeUserResume(id,resume) {
    $('#admin_posts_send_dialog_id').val(id);
    //请求用户简历
    var data = {
        action:'ACTION_ADMIN_GET_RESUME',
        resume:resume
    };
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (data) {
            //填充简历数据
            $('#admin_posts_send_dialog_label').html(data.title);
            $("#admin_posts_send_dialog_img").attr("src", "/image/head/" + data.img);
            $('#admin_posts_send_dialog_name').html(data.name);
            $('#admin_posts_send_dialog_sex').html(data.sex);
            $('#admin_posts_send_dialog_date').html(data.date);
            $('#admin_posts_send_dialog_age').html(data.age + '岁');
            $('#admin_posts_send_dialog_nation').html(data.nation);
            $('#admin_posts_send_dialog_birthplace').html(data.birthplace);
            $('#admin_posts_send_dialog_politics').html(data.politics);
            $('#admin_posts_send_dialog_marriage').html(data.marriage);
            $('#admin_posts_send_dialog_phone').html(data.phone);
            $('#admin_posts_send_dialog_email').html(data.email);
            $('#admin_posts_send_dialog_exp').html(data.exp);
            var expdetail = data.expdetail.split(',');
            $.each(expdetail,function () {
               $('#admin_posts_send_dialog_expdetail').append('<div class="AdminPostsRightSendUserResumeItemDetail">'+ this + '</div>');
            });
            $('#admin_posts_send_dialog_edu').html(data.edu);
            var edudetail = data.edudetail.split(',');
            $.each(edudetail,function () {
                $('#admin_posts_send_dialog_edudetail').append('<div class="AdminPostsRightSendUserResumeItemDetail">'+ this + '</div>');
            });
            var project = data.project.split(',');
            $.each(project,function () {
                $('#admin_posts_send_dialog_project').append('<div class="AdminPostsRightSendUserResumeItemDetail">'+ this + '</div>');
            });
            var school = data.school.split(',');
            $.each(school,function () {
                $('#admin_posts_send_dialog_school').append('<div class="AdminPostsRightSendUserResumeItemDetail">'+ this + '</div>');
            });
            var other = data.other.split(',');
            $.each(other,function () {
                $('#admin_posts_send_dialog_other').append('<div class="AdminPostsRightSendUserResumeItemDetail">'+ this + '</div>');
            });
        },
        error: function () {
            console.log('失败!');
        }
    });
}

/**
 * 绑定面试邀请按钮
 */
$('#admin_posts_send_dialog_btn_welcome').click(function () {
    var id = $('#admin_posts_send_dialog_id').val();
    var data = {
        action:'ACTION_ADMIN_EDIT_SEND',
        id:id,
        state:1
    };
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                $('#admin_posts_send_dialog').modal('hide');
                //刷新表
                var table = new SendTableInit();
                table.Init($('#admin_posts_send_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('发生错误!');
            }
        },
        error: function () {
            alert('发生错误!');
        }
    });
});

/**
 * 绑定不符合按钮
 */
$('#admin_posts_send_dialog_btn_no').click(function () {
    var id = $('#admin_posts_send_dialog_id').val();
    var data = {
        action:'ACTION_ADMIN_EDIT_SEND',
        id:id,
        state:3
    };
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                $('#admin_posts_send_dialog').modal('hide');
                //刷新表
                var table = new SendTableInit();
                table.Init($('#admin_posts_send_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('发生错误!');
            }
        },
        error: function () {
            alert('发生错误!');
        }
    });
});

/**
 * 绑定录用按钮
 */
$('#admin_posts_send_dialog_btn_ok').click(function () {
    var id = $('#admin_posts_send_dialog_id').val();
    var data = {
        action:'ACTION_ADMIN_EDIT_SEND',
        id:id,
        state:2
    };
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                $('#admin_posts_send_dialog').modal('hide');
                //刷新表
                var table = new SendTableInit();
                table.Init($('#admin_posts_send_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('发生错误!');
            }
        },
        error: function () {
            alert('发生错误!');
        }
    });
});

/**
 * 初始化岗位信息表
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
        var data = {action:"ACTION_ADMIN_GET_JOB_INFO"};
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                $("#admin_posts_job_table").bootstrapTable('destroy');
                $('#admin_posts_job_table').bootstrapTable({
                    pagination: true,
                    sortable: false,
                    pageNumber: pageNumber,
                    striped: true,
                    pageSize: 10,
                    pageList: [10, 25, 50, 100],
                    uniqueId: "id",
                    data: data,
                    columns: [{
                        field: 'title',
                        title: '岗位名称',
                        align: 'center'
                    }, {
                        field: 'description',
                        title: '岗位信息',
                        align: 'center'
                    }, {
                        field: 'num',
                        title: '需求人数',
                        align: 'center'
                    }, {
                        field: 'note',
                        title: '标签',
                        align: 'center'
                    }, {
                        field: 'site',
                        title: '工作地点',
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
                    },{
                        field:'state',
                        title:'岗位状态',
                        align:'center',
                        formatter: function (value, row, index) { 
                            if (0 == value) {
                                return '在招';
                            } else {
                                return '招满';
                            }
                        }
                    }, {
                        field: 'time',
                        title: '发布日期',
                        align: 'center'
                    }, {
                        field: 'id',
                        title: '操作',
                        align: 'center',
                        formatter: function (value, row, index) {
                            var job = escape(JSON.stringify(row));
                            return "<div class=\"btn-group-vertical\"><button class=\"btn btn-primary\" onclick='editJob(\"" + job + "\")' data-toggle=\"modal\" data-target=\"#admin_posts_job_dialog\"><span class=\"glyphicon glyphicon-edit\"></span></button><button class=\"btn btn-danger\" onclick='delJob(\"" + value + "\")' data-toggle=\"modal\" data-target=\"#admin_posts_job_dialog\"><span class=\"glyphicon glyphicon-remove\"></span></button></div>";
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
 * 岗位信息管理：新增岗位
 */
function addJob() {
    initJobDialogBtn();
    admin_job_note_count = 0;
    $('#admin_posts_job_dialog_label').html('新增岗位');
    $('#admin_posts_job_dialog_body').show();
    $('#admin_posts_job_dialog_btn_add').show();
    //清除数据
    $('#admin_posts_job_dialog_val_title').val('');
    $('#admin_posts_job_dialog_val_description').val('');
    $('#admin_posts_job_dialog_val_num').val('');
    $('#admin_posts_job_dialog_val_site').val('');
    $('#admin_posts_job_dialog_val_pay').val('');
    $('#admin_posts_job_dialog_val_exp').val('无经验');
    $('#admin_posts_job_dialog_val_edu').val('博士');
    $('#admin_posts_job_dialog_val_phone').val('');
    $('#admin_posts_job_dialog_val_email').val('');
    $('#admin_posts_job_dialog_val_note').empty();
}

/**
 * 岗位信息管理：绑定确认新增岗位按钮
 */
$('#admin_posts_job_dialog_btn_add').click(function () {
    //获取数据
    var title = $('#admin_posts_job_dialog_val_title').val();
    var description = $('#admin_posts_job_dialog_val_description').val();
    var num = $('#admin_posts_job_dialog_val_num').val();
    var site = $('#admin_posts_job_dialog_val_site').val();
    var pay = $('#admin_posts_job_dialog_val_pay').val();
    var exp = $('#admin_posts_job_dialog_val_exp').val();
    var edu = $('#admin_posts_job_dialog_val_edu').val();
    var phone = $('#admin_posts_job_dialog_val_phone').val();
    var email = $('#admin_posts_job_dialog_val_email').val();
    //数据校验
    if ('' == title || '' == description || '' == num || '' == site || '' == pay || '' == phone || '' == email) {
        alert('数据无效!');
    } else {
        //获取标签数据
        var note = '';
        $('#admin_posts_job_dialog_val_note div').each(function () {
            note += $(this).html() + ',';
        });
        note = note.substr(0,note.length-1);
        var date = new Date();
        var time = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
        //封装数据
        var data = {
            action:"ACTION_ADMIN_ADD_JOB_INFO",
            title:title,
            description:description,
            num:num,
            note:note,
            site:site,
            pay:pay,
            exp:exp,
            edu:edu,
            phone:phone,
            email:email,
            time:time
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('添加成功!');
                    $('#admin_posts_job_dialog').modal('hide');
                    //刷新表格
                    var jobTable = new JobTableInit();
                    jobTable.Init(1);
                } else {
                    alert('添加失败!');
                }
            },
            error: function () {
                alert('添加失败!');
            }
        });
    }
});

/**
 * 岗位信息管理：编辑岗位
 * @param data
 */
function editJob(data) {
    initJobDialogBtn();
    //填充编辑数据
    var job = JSON.parse(unescape(data));
    admin_job_note_count = 0;
    $('#admin_posts_job_dialog_label').html('编辑岗位');
    $('#admin_posts_job_dialog_body').show();
    $('#admin_posts_job_dialog_btn_edit').show();
    if (0 == job.state) {
        $('#admin_posts_job_dialog_btn_close').show();
    } else {
        $('#admin_posts_job_dialog_btn_open').show();
    }
    $('#admin_posts_job_dialog_val_id').val(job.id);
    $('#admin_posts_job_dialog_val_title').val(job.title);
    $('#admin_posts_job_dialog_val_description').val(job.description);
    $('#admin_posts_job_dialog_val_num').val(job.num);
    $('#admin_posts_job_dialog_val_site').val(job.site);
    $('#admin_posts_job_dialog_val_pay').val(job.pay);
    $('#admin_posts_job_dialog_val_exp').val(job.exp);
    $('#admin_posts_job_dialog_val_edu').val(job.edu);
    $('#admin_posts_job_dialog_val_phone').val(job.phone);
    $('#admin_posts_job_dialog_val_email').val(job.email);
    $('#admin_posts_job_dialog_val_note').empty();
    //遍历标签
    var note = job.note.split(',');
    $.each(note,function () {
        if ('' != this) {
            //配置当前id
            var note_id = "note_" + admin_job_note_count;
            //添加数据到标签栏
            var note_html = '<div id="' + note_id + '" class="AdminPostsRightJobDialogNote" onclick="delJobNote(\'' + note_id +'\')">' + this + '</div>';
            $('#admin_posts_job_dialog_val_note').append(note_html);
            admin_job_note_count++;
        }
    });
}

/**
 * 岗位信息管理：绑定确认编辑岗位信息按钮
 */
$('#admin_posts_job_dialog_btn_edit').click(function () {
    //获取数据
    var id = $('#admin_posts_job_dialog_val_id').val();
    var title = $('#admin_posts_job_dialog_val_title').val();
    var description = $('#admin_posts_job_dialog_val_description').val();
    var num = $('#admin_posts_job_dialog_val_num').val();
    var site = $('#admin_posts_job_dialog_val_site').val();
    var pay = $('#admin_posts_job_dialog_val_pay').val();
    var exp = $('#admin_posts_job_dialog_val_exp').val();
    var edu = $('#admin_posts_job_dialog_val_edu').val();
    var phone = $('#admin_posts_job_dialog_val_phone').val();
    var email = $('#admin_posts_job_dialog_val_email').val();
    //数据校验
    if ('' == title || '' == description || '' == num || '' == site || '' == pay || '' == phone || '' == email) {
        alert('数据无效!');
    } else {
        //获取标签数据
        var note = '';
        $('#admin_posts_job_dialog_val_note div').each(function () {
            note += $(this).html() + ',';
        });
        note = note.substr(0,note.length-1);
        //封装数据
        var data = {
            action:"ACTION_ADMIN_EDIT_JOB_INFO",
            id:id,
            title:title,
            description:description,
            num:num,
            note:note,
            site:site,
            pay:pay,
            exp:exp,
            edu:edu,
            phone:phone,
            email:email
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('修改成功!');
                    $('#admin_posts_job_dialog').modal('hide');
                    //刷新表格
                    var jobTable = new JobTableInit();
                    jobTable.Init($('#admin_posts_job_table').bootstrapTable('getOptions').pageNumber);
                } else {
                    alert('修改失败!');
                }
            },
            error: function () {
                alert('修改失败!');
            }
        });
    }
});

/**
 * 岗位信息管理：绑定招满按钮
 */
$('#admin_posts_job_dialog_btn_close').click(function () {
    //获取数据
    var id = $('#admin_posts_job_dialog_val_id').val();
    //封装数据
    var data = {
        action:'ACTION_ADMIN_STATE_JOB_INFO',
        id:id,
        state:1
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                $('#admin_posts_job_dialog_btn_close').hide();
                $('#admin_posts_job_dialog_btn_open').show();
                //刷新表格
                var jobTable = new JobTableInit();
                jobTable.Init($('#admin_posts_job_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('发生错误!');
            }
        },
        error: function () {
            alert('发生错误!');
        }
    });
});

/**
 * 岗位信息管理：绑定开放按钮
 */
$('#admin_posts_job_dialog_btn_open').click(function () {
    //获取数据
    var id = $('#admin_posts_job_dialog_val_id').val();
    //封装数据
    var data = {
        action:'ACTION_ADMIN_STATE_JOB_INFO',
        id:id,
        state:0
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                $('#admin_posts_job_dialog_btn_open').hide();
                $('#admin_posts_job_dialog_btn_close').show();
                //刷新表格
                var jobTable = new JobTableInit();
                jobTable.Init($('#admin_posts_job_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('发生错误!');
            }
        },
        error: function () {
            alert('发生错误!');
        }
    });
});

/**
 * 岗位信息管理：添加标签
 */
function addJobNote() {
    //清除数据
    $('#admin_posts_job_note_dialog_val').val('');
}

/**
 * 岗位信息管理：绑定确认添加标签按钮
 */
$('#admin_posts_job_note_dialog_btn_add').click(function () {
    //获取标签内容
    var note =  $('#admin_posts_job_note_dialog_val').val();
    //数据校验
    if ('' == note) {
        alert('数据无效!');
    } else {
        //配置当前id
        var note_id = "note_" + admin_job_note_count;
        //添加数据到标签栏
        var note_html = '<div id="' + note_id + '" class="AdminPostsRightJobDialogNote" onclick="delJobNote(\'' + note_id +'\')">' + note + '</div>';
        $('#admin_posts_job_dialog_val_note').append(note_html);
        admin_job_note_count++;
    }
});

/**
 * 岗位信息管理：删除标签
 * @param id
 */
function delJobNote(id) {
    $('#' + id).remove();
}

/**
 * 岗位信息管理：删除岗位
 * @param id
 */
function delJob(id) {
    initJobDialogBtn();
    $('#admin_posts_job_dialog_label').html('删除岗位');
    $('#admin_posts_job_dialog_warn').show();
    $('#admin_posts_job_dialog_btn_del').show();
    $('#admin_posts_job_dialog_val_id').val(id);
}

/**
 * 岗位信息管理：绑定岗位删除按钮
 */
$('#admin_posts_job_dialog_btn_del').click(function () {
    //获取数据
    var id = $('#admin_posts_job_dialog_val_id').val();
    //封装数据
    var data = {
        action:'ACTION_ADMIN_DEL_JOB_INFO',
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                alert('删除成功!');
                $('#admin_posts_job_dialog').modal('hide');
                //刷新表格
                var jobTable = new JobTableInit();
                jobTable.Init($('#admin_posts_job_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('删除失败!');
            }
        },
        error: function () {
            alert('删除失败!');
        }
    });

});

/**
 * 岗位信息管理：初始化按钮
 */
function initJobDialogBtn() {
    $('#admin_posts_job_dialog_btn_add').hide();
    $('#admin_posts_job_dialog_btn_edit').hide();
    $('#admin_posts_job_dialog_btn_open').hide();
    $('#admin_posts_job_dialog_btn_close').hide();
    $('#admin_posts_job_dialog_btn_del').hide();
    $('#admin_posts_job_dialog_body').hide();
    $('#admin_posts_job_dialog_warn').hide();
}

/**
 * 初始化用户管理
 */
function initUser() {
    $('#admin_user').show(1000);
    var table = new UserTableInit();
    table.Init(1);
}

/**
 * 初始化用户信息表
 * @returns {Object}
 * @constructor
 */
var UserTableInit = function () {
    var userTableInit = new Object();
    userTableInit.Init = function (pageNumber) {
        var data = {action: "ACTION_ADMIN_GET_USER"};
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                $("#admin_user_table").bootstrapTable('destroy');
                $('#admin_user_table').bootstrapTable({
                    pagination: true,
                    sortable: false,
                    pageNumber: pageNumber,
                    striped: true,
                    pageSize: 10,
                    pageList: [10, 25, 50, 100],
                    uniqueId: "id",
                    data: data,
                    columns: [{
                        field: 'phone',
                        title: '手机号',
                        align: 'center'
                    }, {
                        field: 'pwd',
                        title: '密码',
                        align: 'center',
                        formatter: function (value, row, index) {
                            var base64 = new Base64();
                            return base64.decode(value);
                        }
                    }, {
                        field: 'id',
                        title: '操作',
                        align: 'center',
                        formatter: function (value, row, index) {
                            return '<button class="UserJobLayTableBtn UserJobLayTableNoWrap" data-toggle="modal" data-target="#admin_user_dialog" onclick="editUser(\'' + value + '\')">修改密码</button>';
                        }
                    }]
                });
            },
            error: function () {
                console.log('失败');
            }
        });
    };
    return userTableInit;
};

/**
 * 修改用户密码
 * @param id
 */
function editUser(id) {
    $('#admin_user_dialog_id').val(id);
}

/**
 * 绑定修改用户密码按钮
 */
$('#admin_user_dialog_btn').click(function () {
    var pwd = $('#admin_user_dialog_pwd').val();
    var id = $('#admin_user_dialog_id').val();
    if ('' == pwd) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_EDIT_USER',
            id:id,
            pwd:pwd
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    $('#admin_user_dialog').modal('hide');
                    //刷新表格
                    var table = new UserTableInit();
                    table.Init($('#admin_user_table').bootstrapTable('getOptions').pageNumber);
                } else {
                    alert('发生错误!');
                }
            },
            error: function () {
                alert('发生错误!');
            }
        });
    }
});

/**
 * 初始化管理员管理
 */
function initAdmin() {
    $('#admin_admin').show(1000);
    var power = getUrlParam('power');
    switch (power) {
        case '0':
            $('#admin_admin_has_power').show();
            var table = new AdminTableInit();
            table.Init(1);
            break;
        case '1':
            $('#admin_admin_no_power').show();
            break;
    }
}

/**
 * 添加管理员
 */
function addAdmin() {
    hideAdminBtn();
    $('#admin_admin_dialog_label').html('添加管理员');
    $('#admin_admin_dialog_btn_add').show();
    $('#admin_admin_dialog_body').show();
    $('#admin_admin_dialog_name').val('');
    $('#admin_admin_dialog_pwd').val('');
}

/**
 * 绑定添加按钮
 */
$('#admin_admin_dialog_btn_add').click(function () {
    //获取数据
    var name = $('#admin_admin_dialog_name').val();
    var pwd = $('#admin_admin_dialog_pwd').val();
    var power = $('#admin_admin_dialog_power').val();
    //数据校验
    if ('' == name || '' == pwd) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_ADD_ADMIN',
            name:name,
            pwd:pwd,
            power:power
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    $('#admin_admin_dialog').modal('hide');
                    //刷新表格
                    var table = new AdminTableInit();
                    table.Init(1);
                } else {
                    alert('添加失败!');
                }
            },
            error: function () {
                alert('发生错误!');
            }
        });
    }
});

/**
 * 隐藏
 */
function hideAdminBtn() {
    $('#admin_admin_dialog_btn_add').hide();
    $('#admin_admin_dialog_btn_edit').hide();
    $('#admin_admin_dialog_btn_del').hide();
    $('#admin_admin_dialog_body').hide();
    $('#admin_admin_dialog_warn').hide();
}

/**
 * 初始化管理员信息表
 * @returns {Object}
 * @constructor
 */
var AdminTableInit = function () {
    var adminTableInit = new Object();
    adminTableInit.Init = function (pageNumber) {
        var data = {action: "ACTION_ADMIN_GET_ADMIN"};
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                $("#admin_admin_table").bootstrapTable('destroy');
                $('#admin_admin_table').bootstrapTable({
                    pagination: true,
                    sortable: false,
                    pageNumber: pageNumber,
                    striped: true,
                    pageSize: 10,
                    pageList: [10, 25, 50, 100],
                    uniqueId: "id",
                    data: data,
                    columns: [{
                        field: 'name',
                        title: '名称',
                        align: 'center'
                    }, {
                        field: 'pwd',
                        title: '密码',
                        align: 'center',
                        formatter: function (value, row, index) {
                            var base64 = new Base64();
                            return base64.decode(value);
                        }
                    }, {
                        field: 'power',
                        title: '权限',
                        align: 'center',
                        formatter: function (value, row, index) {
                            switch (value) {
                                case 0:
                                    return '超级管理员';
                                case 1:
                                    return '普通管理员';
                            }
                        }
                    }, {
                        field: 'id',
                        title: '操作',
                        align: 'center',
                        formatter: function (value, row, index) {
                            var admin = escape(JSON.stringify(row));
                            return "<div class=\"btn-group\"><button class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#admin_admin_dialog\" onclick='editAdmin(\"" + admin + "\")'><span class=\"glyphicon glyphicon-edit\"></span>&nbsp;编辑</button><button class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#admin_admin_dialog\" onclick='delAdmin(\"" + value + "\")'><span class=\"glyphicon glyphicon-remove\"></span>&nbsp;删除</button></div>";
                        }
                    }]
                });
            },
            error: function () {
                console.log('失败');
            }
        });
    };
    return adminTableInit;
};

/**
 * 编辑管理员
 * @param data
 */
function editAdmin(data) {
    hideAdminBtn();
    var admin = JSON.parse(unescape(data));
    $('#admin_admin_dialog_label').html('编辑管理员');
    $('#admin_admin_dialog_btn_edit').show();
    $('#admin_admin_dialog_body').show();
    $('#admin_admin_dialog_name').val(admin.name);
    $('#admin_admin_dialog_pwd').val(new Base64().decode(admin.pwd));
    $('#admin_admin_dialog_power').val(admin.power);
    $('#admin_admin_dialog_id').val(admin.id);
}

/**
 * 删除管理员
 * @param id
 */
function delAdmin(id) {
    hideAdminBtn();
    $('#admin_admin_dialog_id').val(id);
    $('#admin_admin_dialog_label').html('删除管理员');
    $('#admin_admin_dialog_btn_del').show();
    $('#admin_admin_dialog_warn').show();
}

/**
 * 删除管理员
 */
$('#admin_admin_dialog_btn_del').click(function () {
    var id = $('#admin_admin_dialog_id').val();
    //封装数据
    var data = {
        action:'ACTION_ADMIN_DEL_ADMIN',
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                alert('删除成功!');
                $('#admin_admin_dialog').modal('hide');
                //刷新表格
                var table = new AdminTableInit();
                table.Init($('#admin_admin_dialog').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('删除失败!');
            }
        },
        error: function () {
            alert('发生错误!');
        }
    });
});

/**
 * 绑定编辑按钮
 */
$('#admin_admin_dialog_btn_edit').click(function () {
    //获取数据
    var id = $('#admin_admin_dialog_id').val();
    var name = $('#admin_admin_dialog_name').val();
    var pwd = $('#admin_admin_dialog_pwd').val();
    var power = $('#admin_admin_dialog_power').val();
    //数据校验
    if ('' == name || '' == pwd) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_EDIT_ADMIN',
            id:id,
            name:name,
            pwd:pwd,
            power:power
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('修改成功!');
                    $('#admin_admin_dialog').modal('hide');
                    //刷新表格
                    var table = new AdminTableInit();
                    table.Init($('#admin_admin_dialog').bootstrapTable('getOptions').pageNumber);
                } else {
                    alert('修改失败!');
                }
            },
            error: function () {
                alert('发生错误!');
            }
        });
    }
});

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