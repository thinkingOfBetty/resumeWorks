require('./index.css');
require('./index.string');
var _mm = require('util/mm.js');
var templatePagination = require('./index.string');

var Pagination =function(){
    var _this = this
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        pageRange       : 3,
        onSelectPage    : null
    }
    $(document).on('click','.pg-item',function(){
            $this = $(this);
        // 如果是点击当前页面或者是点击disabled页面，就直接返回
            if($this.hasClass('active') || $this.hasClass('disabled')){
                return;
            }
            typeof _this.option.onSelectPage ==='function' ?
            _this.option.onSelectPage($this.data('value')) : null;
            
    })
}

// 
Pagination.prototype.render = function(userOption){
  this.option =$.extend({},this.defaultOption,userOption);
 
  //判断容器是否为空，如果为空的话就直接返回
  if(!this.option.container instanceof jQuery){
      return;
  }

  //判断也是是否只有一页，如果是就直接返回
  if(this.option.pages <= 1){
      return;
  }

  this.option.container.html(this.getPaginationHtml());

}
// 渲染分页html |上一页|  2 3 4  =5= 6 7 8 |下一页|
Pagination.prototype.getPaginationHtml =function(){
    var pageArray = [],
        html      = '',
        option    = this.option,
        start     = option.pageNum - option.pageRange > 0 ?
                    (option.pageNum - option.pageRange) : 1 ,
        end       = (option.pageNum + option.pageRange)  < option.pages ?
                    (option.pageNum + option.pageRange) : option.pages;


    // |上一页|
    pageArray.push({
        name     :'上一页',
        value    : option.prePage,
        disabled : (!option.hasPreviousPage)
    })

    // 中间数字的渲染，注意要结合pageRange控制显示的数量
    for(var i = start ; i<=end ; i++){
        pageArray.push({
            name : i,
            value :i,
            active : (i===option.pageNum)
        })
    }

    // |下一页|
    pageArray.push({
        name     :'下一页',
        value    : option.nextPage,
        disabled : (!option.hasNextPage)
    })

    html = _mm.renderHtml(templatePagination,{
        pageArray  : pageArray,
        pageNum    : option.pageNum,
        pages      : option.pages
    })
    return html;

}


module.exports =Pagination;