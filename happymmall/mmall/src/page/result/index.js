require('./index.css')
require('page/common/nav-simple/index.js')
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default';
    var $Element = $('.'+type+'-success') ;
    // 显示对应的提示元素
    $Element.show()
})