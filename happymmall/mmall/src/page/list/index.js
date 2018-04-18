require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _mm              = require('util/mm.js'),
    _product         = require('service/product-service.js'),
    templateIndex    = require('./index.string'),
    Pagination       = require('util/pagination/index.js'),
    templateIndex    = require('./index.string');
var page = {
    data : {
        listParam : {
            keyword     : _mm.getUrlParam('keyword')   || '',
            categoryId  : _mm.getUrlParam('categoryId') || '',
            orderBy     : _mm.getUrlParam('orderBy')    || '',
            pageNum     : _mm.getUrlParam('pageNum')    || 1,
            pageSize    : _mm.getUrlParam('pageSize')   || 20
        }
    },
    init : function(){
        this.onload();
        this.bindEvent();
    },
    onload : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        var listParam = this.data.listParam
        $('.sort-item').click(function(){
            var $this = $(this);
            listParam.pageNum = 1;
            // 点击默认排序的时候
            if($this.data('type') === 'default'){
                // 如果本来就是的话，就直接返回
                if($this.hasClass('active')){
                    return;
                }else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                        listParam.orderBy = 'default';
                }
            }
            // 如果点击价格按钮
            else if($this.data('type') === 'price'){
                $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    listParam.orderBy = 'price_asc';
                }
                else if($this.hasClass('asc')){
                    $this.addClass('desc').removeClass('asc');
                    listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载页面
            _this.loadList();
        })
    },
    loadList : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam,
            $pListCon   = $('.p-list-con');
            $pListCon.html('<div class="loading"></div>')

            // 删除不必要的字段
            listParam.categoryId 
             ? (delete listParam.keyword):(delete listParam.categoryId)
        _product.getProductList(listParam,function(res){
            // 渲染html
            listHtml = _mm.renderHtml(templateIndex,{
                list : res.list
            });
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            })
        },function(errMsg){
            _mm.errorTips(errMsg);
        })
    },
    loadPagination : function(pageInfo){
        var _this = this
        this.pagination ? '' :( this.pagination = new Pagination() );
        this.pagination.render($.extend({},pageInfo,{
            container    : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
}

$(function(){
    page.init();
})
