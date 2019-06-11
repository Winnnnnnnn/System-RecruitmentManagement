//启动路口
$(function () {
    //初始化管理员登录页
    initLoginPage();
});

/**
 * 初始化管理员登录页
 */
function initLoginPage() {
    //处理登录按钮的事件
    $('#login').click(function () {
        //提交登录数据到后台服务
        var name = $('#name').val();
        var pwd = $('#pwd').val();
        //校验数据
        if ('' == name || '' == pwd) {
            alert('请输入用户名/密码');
        } else {
            //封装数据
            var data = {action:"ACTION_ADMIN_LOGIN",name:name,pwd:pwd};
            //提交数据到后台
            $.ajax({
                type: 'post',
                url: '/admin',
                dataType: "json",
                data: data,
                success: function (data) {
                    //登录成功
                    window.location = '/page/admin/admin.jsp?name=' + data.name + '&power=' + data.power;
                },
                error: function () {
                    //登录失败
                    alert('用户名/密码错误!');
                }
            });
        }
    });
    //监听用户按键
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            //回车绑定登录按钮
            $('#login').click();
        }
        if (event.keyCode == 40) {
            //向下键绑定密码输入框
            $('#pwd').focus();
        }
        if (event.keyCode == 38) {
            //向上键绑定用户名输入框
            $('#name').focus();
        }
    });
}