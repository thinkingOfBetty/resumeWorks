
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _mm           = require('util/mm.js');
var navSide       = require('page/common/nav-side/index.js');
var _user         = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
    init : function(){
        this.onload();
        this.bindEvent();
    },
    onload : function(){
        navSide.init({
            name : 'user-center'
        });
        this.loadUserInfo();
    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg)
        })
    },
    bindEvent : function(){
        var _this = this
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                phone : $.trim($('#phone').val()),
                email : $.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer : $.trim($('#answer').val())
            };
            var formValidateResult = _this.formValidate(userInfo);
            if(formValidateResult.status){
                _user.updateUserInfo(userInfo,function(res,msg){
                    alert(msg);
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
}

$(function(){
    page.init();
})