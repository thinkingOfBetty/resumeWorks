
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
        listParam : {
            pageNum : 1,
            pageSize : 5
        }
    },
    init : function(){
        this.onload();
    },
    onload : function(){
        this.loadOrderList();
        navSide.init({
            name : 'order-list'
        });
        
    },
    loadOrderList : function(){
        var orderListHtml = '',
            $listCon      = $('.order-list'),
            _this         = this;
            $listCon.html('<div class="loading"></div>')
        _order.getOrderList(_this.data.listParam,function(res){
            orderListHtml = _mm.renderHtml(templateIndex,res);
            $listCon.html(orderListHtml);
            // 页数的渲染
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            })
        },function(errMsg){
            $listCon.html('<p class="err-tips">订单加载失败，请刷新试试</p>')
        })
    },
    loadPagination :  function(pageInfo){
        var _this = this
        this.pagination ? '' :( this.pagination = new Pagination() );
        this.pagination.render($.extend({},pageInfo,{
            container    : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                 _this.loadOrderList();
            }
        }));
    }
}

$(function(){
    page.init();
})