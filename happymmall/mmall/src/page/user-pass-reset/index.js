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
        $('.error-item').hide().find('.err-msg').text();
    },
};


// page逻辑部分
var page = {
    data : {
        username : '',
        answer : '',
        question : '',
        token    : ''
    },
    init : function(){
        this.onload();
        this.bindEvent();
    },
    onload : function(){
        this.loadStepUsername()
    },
    bindEvent : function(){
        var _this = this;
        $('#submit-username').click(function(){
            var username = $.trim($('#user-name').val());
            // 如果用户名不为空,获取当前用户名字跟后台取密码提示问题
            if(username){
                _user.getQusetion(username,function(res){
                    _this.data.question = res;
                    _this.data.username = username;
                    _this.loadStepQuestion();
                },function(errMsg){
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入用户名');
            }
        });

    
        // 提交问题答案，跟后台答案做匹配，获取token（是传输密码用的？）值
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            // 密码提示问题不为空
            if(answer){
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer
                },function(res){
                    _this.data.token = res;
                    _this.data.answer = answer;
                    _this.loadStepPassword();
                },function(errMsg){
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入密码提示问题');
            }
        });

        // 重置密码
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            // 密码提示问题不为空
            if(password && password.length>=6){
                _user.resetPassword({
                    username : _this.data.username,
                    passwordNew : password,
                    forgetToken : _this.data.token
                },function(res){
                    window.location.href = './result.html?type=pass-reset'
                },function(errMsg){
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入不低于六位的新密码');
            }
        });

    },
    loadStepUsername : function(){
        $('.step-username').show();
    },
    loadStepQuestion : function(){
        formError.hide();
        $('.step-username').hide()
                .siblings('.step-question').show()
                .find('.question').text(this.data.question);
    },
    loadStepPassword : function(){
        formError.hide();
        $('.step-question').hide()
                .siblings('.step-password').show();
    }
};

$(function(){
    page.init();
})