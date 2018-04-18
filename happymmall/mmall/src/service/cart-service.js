var _mm=require('util/mm.js')
var _cart = {
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    },
    // 添加到购物车
    addToCart : function(productInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // 获取购物车列表的信息
        getCartList: function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/list.do'),
            success :resolve,
            error   :reject
        })
    },
    // 选中单个按钮
    selectProduct : function(productId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select.do'),
            data    :{
                productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 没有选中单个按钮
    unSelectProduct : function(productId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select.do'),
            data    :{
                productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 选中全部
    selectAllProduct : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 没有把全部选中 
    unSelectAllProduct : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 更新pcount中的数量
    updateProduct : function(productInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/update.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    } ,
    // 删除商品，可以是一件或者是多件
    deleteProduct : function(productIds,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/delete_product.do'),
            data    : {
                productIds : productIds
            },
            success : resolve,
            error   : reject
        });
    } 
        
}
module.exports = _cart;
