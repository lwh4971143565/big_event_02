$(function () {
    //点击注册隐藏登录
    $('#link_reg').on('click', () => {

        $('.reg-box').show()
        $('.login-box').hide()

    })

    //点击登录隐藏注册
    $('#link_login').on('click', () => {

        $('.reg-box').hide()
        $('.login-box').show()

    })

    //校验密码 layui自定义了方法
    let form = layui.form
    form.verify({

        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位,且不能出现空格'
        ],
        //重复密码校验
        repwd: function (value) {
            let pwd = $('.reg-box input[name=password]').val()
            if (value !== pwd) {
                return '两次密码不一致'
            }
        }
    })


    //注册窗口事件
    let layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val(),
            },
            // dataType:json ,//jsonp 请求JS文件 
            success: (res) => {
                console.log(res);

                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功')

                $("#link_login").click();
                $("#form_reg")[0].reset();
            }
        }
        )

    })
    //登录窗口
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            // dataType:json ,//jsonp 请求JS文件 
            success: (res) => {
                console.log(res);

                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功')

                localStorage.setItem('token', res.token);
                location.href = "/index.html";
            }
        }
        )

    })




})