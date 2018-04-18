require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _mm           = require('util/mm.js');
var navSide       = require('page/common/nav-side/index.js');
var _user         = require('service/user-service.js');
var _order        = require('service/order-service.js');
var Pagination       = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init : function(){
        this.onload();
        this.bindEvent();
    },
    onload : function(){
        navSide.init({
            name : 'order-list'
        });
        this.loadDetail();
        
    },
    bindEvent :function(){
        var _this = this;
        $(document).on('click','.order-cancel',function(){
            if(window.confirm("确定要取消订单吗？")){
            _order.cancelOrder(_this.data.orderNumber,function(res){
                _mm.successTips('取消订单成功');
                _this.loadDetail();
            },function(errMsg){
                _mm.errorTips(errMsg);
            })
        }
        })
    },
    loadDetail : function(){
        var orderDetailHtml = '',
            $content      = $('.content'),
            _this         = this;
            $content.html('<div class="loading"></div>')
        _order.getOrderDetail(_this.data.orderNumber,function(res){
            _this.dataFilter(res);
            orderDetailHtml = _mm.renderHtml(templateIndex,res);
            $content.html(orderDetailHtml);
        },function(errMsg){
            $content.html('<p class="err-tips">'+ errMsg +'</p>')
        })
    },
    dataFilter :  function(data){
         data.needPay = data.status == 10;
         data.isCancelable = data.status == 10;
    }
}

$(function(){
    page.init();
})