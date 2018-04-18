var _mm=require('util/mm.js')
var _order = {
    // 获取商品列表的信息
        getProductList: function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
            success :resolve,
            error   :reject
        })
    },
    // 把地址信息传送给后台处理
    createOrder: function(orderInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/create.do'),
            data    :orderInfo,
            success :resolve,
            error   :reject
        })
    },
    // 获取订单页面信息
    getOrderList: function(listParam,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/list.do'),
            data    :listParam,
            success :resolve,
            error   :reject
        })
    },
    // 获取订单详情页
    getOrderDetail : function(orderNumber,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/detail.do'),
            data    :{
                orderNo : orderNumber
            },
            success :resolve,
            error   :reject
        })
},
    // 取消订单
    cancelOrder : function(orderNumber,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/cancel.do'),
            data    :{
                orderNo : orderNumber
            },
            success :resolve,
            error   :reject
        })
}
}
module.exports = _order;