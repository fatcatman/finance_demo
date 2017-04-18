define('app/login', function(require, exports, module){ 

var App = require('app/layout');
var Login = function () {

    return {
        //main function to initiate the module
        init: function () {
            $('#drag').drag();
            $('.login-form').validate({
                errorElement: 'label', //default input error message container
                errorClass: 'help-inline', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                rules: {
                    username: {
                        required: true
                    },
                    password: {
                        required: true
                    },
                    remember: {
                        required: false
                    }
                },

                messages: {
                    username: {
                        required: "用户名不能为空"
                    },
                    password: {
                        required: "密码不能为空"
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit   
                    $('.alert-error', $('.login-form')).show();
                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
                },

                success: function (label) {
                    label.closest('.control-group').removeClass('error');
                    label.remove();
                },

                errorPlacement: function (error, element) {
                    error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
                },

                submitHandler: function (form) {
                    if (m_drag == false) {
                        vankeAlert('提示', '请先滑动验证');
                        return;
                    }
                    $.ajax({
                        url: '/Service/Manager/Login.do',
                        type: 'post',
                        data: {
                            Account: form['username'].value,
                            pwd: form['password'].value
                        },
                        dataType: 'json',
                        success: function (data) {
                            if (data.success) {
                                window.location.href = "/Service/Home/index.jsp" + window.location.hash;
                            } else {
                                vankeAlert('提示', data.msg);
                            }
                        },
                        error: function () {
                            vankeAlert('提示', '登录失败');
                        }
                    });
                }
            });

            $('.login-form input').keypress(function (e) {
                if (e.which == 13) {
                    return $('.login-form').validate().form();
                }
            });
        }

    };

} ();
var vm = {
    $timeoutId: 0,
    infoBox: {
        title: 'info',
        content: 'blablablabla'
    },
};
var vankeAlert = function (title, content) {
    // 停止上一个动画过程，并初始化
    var box = $('.vanke-alert');
    if (vm.$timeoutId != 0) {
        clearTimeout(vm.$timeoutId);
    }
    box.stop(true, true);
    box.removeAttr('style');
    $('p,h4', box).show().css({ opacity: 1 });
    // 设置内容
    box.find('h4').text(title);
    box.find('p').text(content);
    // 开始动画过程
    box.show().animate({ opacity: 1, left: 20 }, 1000, 'swing', function () {
        var $this = $(this);
        vm.$timeoutId = setTimeout(function () {
            $('p,h4', $this).fadeOut();
            $this.animate({ height: 3, padding: 0 }, 1000).animate({ width: 0 }, 1000, 'swing', function () {
                $this.removeAttr('style');
                $('p,h4', $this).show();
            });
        }, 3000);
    });
};

jQuery(document).ready(function () {
    App.init();
    Login.init();
    $.backstretch([
		        "/Service/static/lib/image/bg/1.jpg",
		        "/Service/static/lib/image/bg/2.jpg",
		        "/Service/static/lib/image/bg/3.jpg",
		        "/Service/static/lib/image/bg/4.jpg"
		        ], {
		            fade: 1000,
		            duration: 8000
		        });
		        jQuery(".full_banner").slide({
		            titCell: ".hd ul",
		            mainCell: ".bd ul",
		            effect: "fold",
		            autoPlay: true,
		            autoPage: true,
		            trigger: "click",
		            interTime: 3500
		        });
		        //notice scroll
		        jQuery(".notice_box").slide({ mainCell: "#notice_scroll", effect: "topLoop", autoPlay: true, interTime: 3500 });
		    });
 
});