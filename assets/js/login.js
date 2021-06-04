$(function () {
    // 登录注册面板切换start
    $("#link_reg").on("click", function () {
        $(".reg-box").show()
        $(".login-box").hide()
    })
    $("#link_login").on("click", function () {
        $(".reg-box").hide()
        $(".login-box").show()
    })
    // 登录注册面板切换end

    // 表单验证start
    var form = layui.form
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $("#form_reg [name=password]").val()
            if (value !== pwd) {
                return "两次输入不一致，请重新输入"
            }
        }
    })
    // 表单验证end

    // 获取弹出层layui对象
    var layer = layui.layer
    // 注册面板start
    $("#form_reg").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: "post",
            url: "/api/reguser",
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val()
            },
            success: function (res) {
                if (res.status === 0) {
                    setTimeout(function () {
                        $("#link_login").click()
                    }, 1000)
                }
                // 设置弹出消息
                layer.msg(res.message)
            }
        })
    })
    // 注册面板end

    // 登录面板start
    $("#form_login").on("submit", function (e) {
        e.preventDefault()
        var formVal = $("#form_login").serialize()
        $.ajax({
            method: "post",
            url: "/api/login",
            data: formVal,
            success: function (res) {
                if (res.status === 0) {
                    setTimeout(function () {
                        location.href = "http://127.0.0.1/index.html"
                    }, 1000);
                }
                // 设置弹出消息
                layer.msg(res.message)
            }
        })
    })
    // 登录面板end

})