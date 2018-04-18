

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

 var  _mm                = require('util/mm.js'),
     addressModal        = require('./address-modal.js'),
     _address            = require('service/address-service.js'),
     _order              = require('service/order-service.js'),
     templateProduct     = require('./product-list.string'),
     templateAddress     = require('./address-list.string');

    var page = {
        data : {
            selectedAddressId : null
        },
        init : function(){
            this.onload();
            this.bindEvent();
        },
        onload : function(){
            this.loadAddressList();
            this.loadProductList();
        },
        bindEvent : function(){
            var _this = this;
            $(document).on('click','.address-item',function(){
                $(this).addClass('active')
                        .siblings('.address-item').removeClass('active');
                _this.data.selectedAddressId = $(this).data('id');
            })
            // 订单提交按钮的绑定
            $(document).on('click','.order-submit',function(){
                var shippingId = _this.data.selectedAddressId;
                if(shippingId){
                    _order.createOrder({
                        shippingId : shippingId  
                    },function(res){
                        window.location.href='./payment.html?orderNumber='+res.orderNo;
                    },function(errMsg){
                        _mm.errorTips(errMsg);
                    })
                }else {
                    _mm.errorTips("请选择收获地址。")
                }
            })
            // 添加新地址按钮的绑定
            $(document).on('click','.address-add',function(){
                addressModal.show({
                    isUpdate :false,
                    osSuccess :function(){
                        _this.loadAddressList();
                    }
                })
            })
            // 地址的编辑绑定，主要为了回填信息
            $(document).on('click','.address-update',function(e){
                e.stopPropagation();
                    shippingId = $(this).parents('.address-item').data('id');
                _address.getAddress(shippingId,function(res){
                    addressModal.show({
                        isUpdate :true,
                        data     : res,
                        onSuccess :function(){
                            _this.loadAddressList();
                        }
                    })
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
        }) 
        // 地址的删除
        $(document).on('click','.address-delete',function(e){
                e.stopPropagation();
                shippingId = $(this).parents('.address-item').data('id');
                if(window.confirm("您确定要删除吗？")){
                    _address.deleteAddress(shippingId,function(res){
                        _this.loadAddressList();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }
    }) 
            
        },
        
        // 加载地址列表的信息
        loadAddressList : function(){
                var _this = this
                $('.address-con').html("<div class='loading'></div>")
            _address.getAddressList(function(res){
                _this.addressFilter(res);
                var addressListHtml = _mm.renderHtml(templateAddress,res);
                $('.address-con').html(_mm.renderHtml(templateAddress,res));
            },function(errMsg){
                $('.address-con').html("<p class='err-tip'>地址列表加载出错啦。</p>")
            })
        },
        // 加载商品列表的信息
        loadProductList : function(){
            var _this       = this;
            $('.product-con').html("<div class='loading'></div>")
            _order.getProductList(function(res){
                var productListHtml = _mm.renderHtml(templateProduct,res);
                $('.product-con').html(productListHtml) 
            },function(errMsg){
                $('.product-con').html("<p class='err-tip'>商品列表加载出错啦。</p>")
            })
        },
        // 处理选中状态，就是让loadAddress执行后原来选中的那个还是保持选中状态
        addressFilter : function(data){
            if(this.data.selectedAddressId){
                var selectedAddressIdFlag=false;
                for(var i=0,len=data.list.length;i<len;i++){
                    if(data.list[i].id === this.data.selectedAddressId){
                        data.list[i].isActive=true;
                        selectedAddressIdFlag = true;
                    }
                }
                if(selectedAddressIdFlag===false){
                    data.selectedAddressId=null;
                }
            }
        }
        
    }
    
    $(function(){
        page.init();
    })

