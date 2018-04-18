
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _mm           = require('util/mm.js');
var navSide       = require('page/common/nav-side/index.js');
var _user         = require('service/user-service.js');

var page = {
    init : function(){
        this.onload();
        this.bindEvent();
    },
    onload : function(){
        navSide.init({
            name : 'user-pass-update'
        });
       
    },
    bindEvent : function(){
        var _this = this
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                password : $.trim($('#password').val()),
                passwordNew : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-comfirm').val()),
                answer : $.trim($('#answer').val())
            };
            var formValidateResult = _this.formValidate(userInfo);
            if(formValidateResult.status){
                _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                },function(res,msg){
                    _mm.successTips(msg);
                    window.location.href='./user-center.html';
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }else{
                _mm.errorTips(formValidateResult.msg);
            }
        })
    },
    // 判断用户名跟密码是否为空，如果为空，则报错，否则正确
    formValidate : function(formData){
        var result = {
            status : false,
            msg    : ''
        }
        // 如果原密码是否为空
        if(!_mm.validate(formData.password,'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        // 如果新密码是否为空，且新密码长度是否大于六位数
        if(!formData.passwordNew || formData.passwordNew.length<6){
            result.msg = '新密码长度要大于6位数';
            return result;
        }
        // 如果确认密码跟刚刚输入的新密码不一致
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }

        result.status = true;
        result.msg    = '认证成功';
        return result;
    }
}

$(function(){
    page.init();
})