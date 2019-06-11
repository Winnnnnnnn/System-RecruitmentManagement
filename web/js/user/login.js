//启动路口
$(function () {
    initLoginPage();
});

/**
 * 初始化页面
 */
function initLoginPage() {
    //绑定立即注册按钮
    $('#open_sign_up').click(function () {
       $('#login_bg').hide();
       $('#sign_up_bg').show();
    });
    //绑定返回登录按钮
    $('#back_login').click(function () {
        $('#sign_up_bg').hide();
        $('#login_bg').show();
    });
    //绑定登陆按钮
    $('#login').click(function () {
        //获取数据
        var phone = $('#login_phone').val();
        var pwd = $('#login_pwd').val();
        //数据校验
        if ('' == phone || '' == pwd) {
            alert('数据无效!');
        } else {
            //封装数据
            var data = {
                action:'ACTION_USER_LOGIN',
                phone:phone,
                pwd:pwd
            };
            //提交数据到后台
            $.ajax({
                type: 'post',
                url: '/user',
                dataType: "json",
                data: data,
                success: function (data) {
                    //登录成功,跳转到首页
                    window.location = '/page/user/home.jsp?id=' + data.id + '&phone=' + data.phone;
                },
                error: function () {
                    //登录失败
                    alert('手机号/密码错误!');
                }
            });
        }
    });
    //绑定注册按钮
    $('#sign_up').click(function () {
        //获取数据
        var phone = $('#sign_up_phone').val();
        var pwd = $('#sign_up_pwd').val();
        if ('' == phone || '' == pwd || !isPoneAvailable(phone)) {
            alert('数据无效!');
        } else {
            //封装数据
            var data = {
                action:'ACTION_USER_SIGN_UP',
                phone:phone,
                pwd:pwd
            };
            //提交数据到后台
            $.ajax({
                type: 'post',
                url: '/user',
                dataType: "json",
                data: data,
                success: function (data) {
                    //注册成功
                    if (data) {
                        alert('注册成功!');
                        //自动登录
                        $('#login_phone').val(phone);
                        $('#login_pwd').val(pwd);
                        $('#login').click();
                    } else {
                        alert('手机号已被注册!');
                    }
                },
                error: function () {
                    //注册失败
                    alert('注册失败!');
                }
            });
        }
    });
    //监听用户键盘事件
    $(document).keydown(function (event) {
       if (event.keyCode == 13) {
           //回车键
           if ($('#login_bg').is(":hidden")) {
               //绑定注册键
               $('#sign_up').click();
           } else {
               //绑定登录键
               $('#login').click();
           }
       }
        if (event.keyCode == 40) {
            //向下按键处理
            if ($('#login_bg').is(":hidden")) {
                $('#sign_up_pwd').focus();
            } else {
                $('#login_pwd').focus();
            }
        }
        if (event.keyCode == 38) {
            //向上按键处理
            if ($('#login_bg').is(":hidden")) {
                $('#sign_up_phone').focus();
            } else {
                $('#login_phone').focus();
            }
        }
    });
}

/**
 * 手机号校验
 * @param str
 * @returns {boolean}
 */
function isPoneAvailable(str) {
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}
