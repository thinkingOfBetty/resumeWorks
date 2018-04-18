
var _mm=require('util/mm.js')
var _address = {
    // 获取地址列表的信息
        getAddressList: function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            data    :{
                pageSize:50
            },
            success :resolve,
            error   :reject
        })
    },
    // 将地址的详细信息提交给后台
    save: function(addressInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    :addressInfo,
            success :resolve,
            error   :reject
        })
    },
    // 获取单条地址信息
    getAddress : function(shippingId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data    :{
                shippingId : shippingId
            },
            success :resolve,
            error   :reject
        })
    },
    // 更新信息
    update : function(addressInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    :addressInfo,
            success :resolve,
            error   :reject
        })
    },
    // 删除信息
    deleteAddress : function(shippingId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    :{
                shippingId : shippingId
            },
            success :resolve,
            error   :reject
        })
    },
}
module.exports = _address;