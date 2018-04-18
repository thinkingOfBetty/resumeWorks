require('./index.css');
require('page/common/header/index.js');

 var nav              = require('page/common/nav/index.js');
     _mm              = require('util/mm.js'),
    _cart             = require('service/cart-service.js'),
    templateIndex     = require('./index.string');

    var page = {
        data : {
            
        },
        init : function(){
            this.onload();
            this.bindEvent();
        },
        onload : function(){
            this.loadCart();
        },
        bindEvent : function(){
            var _this = this;
            // 单个选中按钮的绑定
            $(document).on('click','.cart-select',function(){
                var $this = $(this),
                    productId = $this.parents('.cart-table').data("product-id");
                //如果是checked状态
                if($this.is(':checked')){
                _cart.selectProduct(productId,function(res){
                    _this.renderCart(res);
                },function(err){
                    _this.showCartError();
                })}
                // 没有没有选中的状态
                else{
                    _cart.unSelectProduct(productId,function(res){
                        _this.renderCart(res);
                    },function(err){
                        _this.showCartError();
                    })
                }
                
            });
            // 多个选中按钮的绑定
            $(document).on('click','.cart-select-all',function(){
                var $this = $(this);
                //如果是checked状态
                if($this.is(':checked')){
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res);
                },function(err){
                    _this.showCartError();
                })}
                // 没有选中的状态
                else{
                    _cart.unSelectAllProduct(function(res){
                        _this.renderCart(res);
                    },function(err){
                        _this.showCartError();
                    })
                }
            });
            // 数量按钮的绑定
             $(document).on('click','.count-btn',function(){
                var $this           = $(this),
                    $pCount         = $this.siblings('.count-input');
                    currentCount    = parseInt($pCount.val()),
                    newCount        = 0,
                    minCount        = 1,
                    maxCount        = parseInt($pCount.data('max')),
                    productId       = $this.parents('.cart-table').data('product-id'),
                    type            = $this.data('opera-type');
                    
                // 如果当前数量小于等于1
                if(type === 'minus'){
                    if(currentCount<=minCount){
                        return;
                    }
                    newCount = currentCount - 1;
                }
                // 如果当前数量大于库存数量
                if(type === 'plus'){
                    if(currentCount>=maxCount){
                        _mm.errorTips("该商品数量已经达到上限")
                    }
                    newCount = currentCount + 1
                }
                _cart.updateProduct({
                    count     : newCount,
                    productId : productId
                },function(res){
                    _this.renderCart(res);
                },function(err){
                    _this.showCartError();
                })
            })

            // 删除单个商品
            $(document).on('click','.cart-delete',function(){
                  var  productId =$(this).parents('.cart-table').data('product-id');
                if(window.confirm("您确定要删除该商品吗？")){
                    _this.deleteCartProduct(productId); 
                }
            })
            // 批量删除
            $(document).on('click','.delete-selected',function(){
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked');
                    for(var i = 0 ,len = $selectedItem.length ; i<len ; i++){
                        arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                    }
                    // 如果有选中商品的话就删除，如果没有就提示其去选中
                    if(arrProductIds.length>0){
                        _this.deleteCartProduct(arrProductIds.join(','));
                    }else{
                        _mm.errorTips("请选择您要删除的商品。")
                    }
            })
            // 去结算
            $(document).on('click','.submit-btn',function(){
                // 先判断商品的总价是否为0,如果为0则让其选中要结算的商品
                if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                    window.location.href = './order-confirm.html';
                }else{
                    _mm.errorTips("您还没选中商品哦！")
                }
            })
           

        },
        
        
        // 加载购物车页的信息
        loadCart : function(){
            var _this       = this;
            _cart.getCartList(function(res){
                _this.renderCart(res);
            },function(errMsg){
                _this.showCartError();
            })
        },
        renderCart : function(data){
            this.filter(data);
            // 缓存购物车信息
            this.data.cartInfo=data;
            var cartHtml = _mm.renderHtml(templateIndex,data);
            $('.page-wrap').html(cartHtml);
            nav.loadCartCount();
        },
        filter : function(data){
            data.notEmpty = !!data.cartProductVoList.length;
        },
        showCartError : function(){
            $('.page-wrap').html('<p class="err-tip">哪里不对了，请刷新试试</p>');
        },
        deleteCartProduct : function(productIds){
            var _this = this;
            _cart.deleteProduct(productIds,function(res){
                _this.renderCart(res);
            },function(errMsg){
                // alert('123');
                // _this.showCartError();
            })
        },
        // 用于删除商品使用，productIds可以是单个，也可以是多个，如果是多个，就用‘,’分隔。
        deleteCartProduct : function(productIds){
            var _this = this;
            _cart.deleteProduct(productIds, function(res){
                _this.renderCart(res);
            }, function(errMsg){
                _this.showCartError();
            });
        }
    }
    
    $(function(){
        page.init();
    })

