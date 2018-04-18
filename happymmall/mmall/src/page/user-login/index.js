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
                    username:$.trim($('#user-name').val()),
                    password:$.trim($('#user-pass').val())
                },
                 formValidateResult = this.formValidate(formData);
            // 用户名跟密码非空，进行数据认证
            if(formValidateResult.status ===true){
                _user.login(formData,function(res){
                    window.location.href = _mm.getUrlParam('redirect') ||  './index.html' ;
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

        result.status = true;
        result.msg    = '认证成功';
        return result;
    }
};

$(function(){
    page.init();
})