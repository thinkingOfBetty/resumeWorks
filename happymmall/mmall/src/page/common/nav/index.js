require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav={
    init : function(){
        this.loadUserInfo();
        this.loadCartCount();
        this.bindEvent();
        return this;
    },
    bindEvent: function(){
        $('.js-login').click(function(){
            _mm.doLogin()
        });
        $('.js-register').click(function(){
            window.location.href = './user-register.html'
        });
    },
    // 加载用户信息
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function(errMsg){
            // do nothing
        });
    },
    // 加载购物车数量
    loadCartCount : function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
        }, function(errMsg){
            $('.nav .cart-count').text(0);
        });
    }
}
module.exports = nav.init();
