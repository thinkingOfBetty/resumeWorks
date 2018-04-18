require('./index.css')
var _mm = require('util/mm.js');
var templateIndex = require('./index.string')
var navSide = {
    option:{
        name:'',
        navList:[
            {name : 'user-center'       , desc : '个人中心',  href : './user-center.html'},
            {name : 'order-list'        , desc : '我的订单',  href : './order-list.html'},
            {name : 'about'             , desc : '关于MMall', href : './about.html'},
            {name : 'user-pass-update'  , desc : '修改密码',  href : './user-pass-update.html'}
        ]
    },
    init:function(option){
        // 把传入的option跟原来的option做匹配，就是把传入的name传入option，然后跟navList里面的name进行比较
        $.extend(this.option,option);
        this.renderNav()
    },
    renderNav:function(){
        // 计算active数据
            for(var i=0,len=this.option.navList.length;i<len;i++){
                if(this.option.navList[i].name ===this.option.name){
                    this.option.navList[i].isActive = true;
                }
            }

        // 渲染模板
            var navHtml = _mm.renderHtml(templateIndex,{
                navList:this.option.navList
            })
        // 渲染html
        $('.nav-side').html (navHtml)
    }
}
module.exports = navSide;