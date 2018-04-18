
var  _mm                = require('util/mm.js'),
    _cities             = require('util/cities/index.js')
    _address            = require('service/address-service.js'),
    templateAddress     = require('./address-modal.string');
    
var addressModal = {
    show:function(option){
        this.$modelWrap = $('.model-wrap');
        // 缓存住option
        this.option = option;
        this.option.data = option.data || {};
        // 显示修改地址列表
        this.loadModal();
        // 绑定事件
        this.bindEvent();
    },
    bindEvent : function(){
        var _this=this;
        this.$modelWrap.find('#receiver-province').change(function(){
            var selectedProvince = $(this).val();
            _this.loadCity(selectedProvince);
        })
        // 保存收获地址按钮的事件绑定，一个是表单验证还有把数据传给后台，一个是关闭按钮，还有一个回调函数渲染地址item
        this.$modelWrap.find('.address-btn').click(function(){
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate     =_this.option.isUpdate;
                // 使用新地址且验证通过
                if(!isUpdate && receiverInfo.status){
                    _address.save(receiverInfo.data,function(res){
                        _mm.successTips('创建收货地址成功');
                        _this.hidden();
                        typeof _this.option.onSuccess ==='function' && _this.option.onSuccess(res);
                    },function(errMsg){
                        _mm.errorTips(errMsg);
                    })
                }
                // 修改地址且验证通过，在这里将信息回填
                else if(isUpdate && receiverInfo.status){
                    _address.update(receiverInfo.data,function(res){
                        _mm.successTips('修改地址成功');
                        _this.hidden();
                        typeof _this.option.onSuccess ==='function' && _this.option.onSuccess(res);
                    },function(errMsg){
                        _mm.errorTips(errMsg);
                    })
                }
                else{
                    _mm.errorTips(receiverInfo.errMsg || '哪里出错了');
                }
        })
        // 点击叉号或者阴影部分，关闭弹窗
        this.$modelWrap.find('.close').click(function(){
            _this.hidden();
        })
        // 阻止冒泡事件
        this.$modelWrap.find('.model-container').click(function(e){
            e.stopPropagation();
        })
    },
    loadModal(){
        var addressModalHtml = _mm.renderHtml(templateAddress,{
            isUpdate : this.option.isUpdate,
            data     : this.option.data
        });
        this.$modelWrap.html(addressModalHtml);
        // 加载省份
        this.loadProvince();

    },
    // 加载省份信息
    loadProvince : function(){
        var $provinceSelect = this.$modelWrap.find('#receiver-province'),
            provinces       =  _cities.getProvinces() || [];
            $provinceSelect.html(this.getSelectOption(provinces));
            if(this.option.isUpdate && this.option.data.receiverProvince){
                $provinceSelect.val(this.option.data.receiverProvince);
                this.loadCity(this.option.data.receiverProvince);
            }
    },
    // 加载城市信息
    loadCity : function(provinceName){
        var cities =_cities.getCities(provinceName) || [],
        $citySelect = this.$modelWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        if(this.option.isUpdate && this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity);
        }
       
    },
    // 获得选择结果,输入是数组，输出是html
    getSelectOption : function(optionArray){
        var html = '<option value="">请选择</option>'
        for(var i=0,len = optionArray.length;i<len;i++){
            html+='<option value="'+ optionArray[i] +'">' +optionArray[i] + '</option>'
        }
        return html;
    },
    // 表单信息验证,获取
    getReceiverInfo : function(){
        var receiverInfo = {},
            result       = {
                status : false
            };
        receiverInfo.receiverName       = $.trim(this.$modelWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince   = this.$modelWrap.find('#receiver-province').val();
        receiverInfo.receiverCity       = this.$modelWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress    = $.trim(this.$modelWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone      = $.trim(this.$modelWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip        = $.trim(this.$modelWrap.find('#receiver-zip').val()) ;
        if(this.option.isUpdate){
            receiverInfo.id = this.$modelWrap.find('#receiver-id').val();
            console.log(receiverInfo.id)
        }
        if(!receiverInfo.receiverName){
            result.errMsg='请输入收件人信息！';
        }else if(!receiverInfo.receiverProvince){
            result.errMsg='请选择地址所在省份';
        }else if(!receiverInfo.receiverCity){
            result.errMsg='请选择地址所在城市';
        }else if(!receiverInfo.receiverAddress){
            result.errMsg='请填写详细的收获地址';
        }else if(!receiverInfo.receiverPhone){
            result.errMsg='请输入手机号码';
        }
        else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    },
    hidden:function(){
        this.$modelWrap.empty();
    }
}
module.exports = addressModal;