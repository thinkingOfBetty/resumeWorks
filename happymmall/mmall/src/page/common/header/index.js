require('./index.css')
var _mm =require('util/mm.js');
// 通用页面头部
var header = {
    init : function(){
        this.onload();
        this.bindEvent();
    },
    onload:function(){
        var keyword = _mm.getUrlParam('keyword');
        if(keyword){
        $('#search-input').val(keyword);
        };
    },
    bindEvent : function(){
        var _this = this;
        // 当鼠标点击搜索时
        $('#search-btn').click(function(){
            _this.submitSearch();
        });
        // 当按下回车键时
        $('#search-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.submitSearch();
            }
        });
    },
    submitSearch:function(){
        var keyword = $.trim($('#search-input').val());
        if(keyword){
                window.location.href = './list.html?keyword='+keyword;
        }else{
            _mm.goHome();
        }
    }
}
header.init();