require('./index.css')
require('page/common/nav-simple/index.js')
var _mm = require('util/mm.js');
var _user   = require('service/user-service.js')

// 错误提示信息
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text(hide);
    },
};


// page逻辑部分
var page = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // 验证用户姓名是否重复
        $('#user-name').blur(function(){
            var username = $.trim($('#user-name').val());
            if(!username){
                return;
            }
            _user.checkUsername(username,function(res){
                formError.hide();
            },function(errMsg){
                formError.show(errMsg);
            })

        })
        // 注册按钮的绑定
        $('#submit').click(function(){
            _this.submit();
        });
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        })
    },
    submit : function(){
            var formData={
                    username        : $.trim($('#user-name').val()),
                    passwordConfirm : $.trim($('#password-confirm').val()),
                    phone           : $.trim($('#phone').val()),
                    email           : $.trim($('#email').val()),
                    question        : $.trim($('#question').val()),
                    answer          : $.trim($('#answer').val()),
                    password        : $.trim($('#user-pass').val())
                },
                 formValidateResult = this.formValidate(formData);
            // 用户名跟密码非空，进行数据认证
            if(formValidateResult.status ===true){
                _user.register(formData,function(res){
                    window.location.href = './result.html?type=register' 
                },function(errMsg){
                    formError.show(errMsg);
                })
            }
            // 用户名跟密码空，报错
            else{
                formError.show(formValidateResult.msg)
            }
    },
    // 判断用户名跟密码是否为空，如果为空，则报错，否则正确
    formValidate : function(formData){
        var result = {
            status : false,
            msg    : ''
        }
        // 如果用户名为空
        if(!_mm.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        // 如果密码为空
        if(!_mm.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        // 如果密码长度低于六位
        if(formData.password.length<6){
            result.msg = '密码长度不能低于六位';
            return result;
        }
        // 如果两次填写的密码不一致
        if(formData.password !==formData.passwordConfirm){
            result.msg = '两次密码格式不一致';
            return result;
        }
        // 如果电话号码不符合格式
        if(!_mm.validate(formData.phone,'phone')){
            result.msg = '电话号码格式不正确';
            return result;
        }
        // 如果邮箱格式
        if(!_mm.validate(formData.email,'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        // 如果输入密码提示问题为空
        if(!_mm.validate(formData.question,'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 如果输入密码提示问题答案为空
        if(!_mm.validate(formData.answer,'require')){
            result.msg = '问题答案不能为空';
            return result;
        }

        result.status = true;
        result.msg    = '认证成功';
        return result;
    }
};

$(function(){
    page.init();
})