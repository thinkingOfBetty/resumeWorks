require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _mm           = require('util/mm.js');
var _payment        = require('service/payment-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init : function(){
        this.onload();
    },
    onload : function(){
        this.loadPaymentInfo();
        
    },
    loadPaymentInfo : function(){
        var paymentHtml = '',
            $pageWrap      = $('.page-wrap'),
            _this         = this;
            $pageWrap.html('<div class="loading"></div>')
        _payment.getPaymentInfo(_this.data.orderNumber,function(res){
            paymentHtml = _mm.renderHtml(templateIndex,res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        },function(errMsg){
            $pageWrap.html('<p class="err-tips">'+ errMsg +'</p>')
        })
    },
    listenOrderStatus : function(){
        var _this = this;
        var paymentTimer = window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.orderNumber,function(res){
                if(res == true){
                    window.location.href='./result.html?type=payment&orderNumber'+_this.data.orderNumber
                }
            },function(errMsg){
                _mm.errorTips(errMsg)
            })
        },5000)
    }
}

$(function(){
    page.init();
})