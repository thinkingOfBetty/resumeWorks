/*
 * @Author: betty
 * @Date: 2018-03-14 13:20:41 
 * @Last Modified by: betty
 * @Last Modified time: 2018-04-09 20:05:03
 */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
var getHtmlConfig = function(name,title){
    return {
        template :'./src/view/'+ name +'.html',
        filename :'view/'+ name +'.html',
        title    :title,
        inject   :true,
        favicon  : './favicon.ico',
        hash     :true,
        chunks   :['common',name] 
    }
}
var config = {
    entry:{
            'common'            :   ['./src/page/common/index.js'],
            'index'             :   ['./src/page/index/index.js'],
            'list'              :   ['./src/page/list/index.js'],
            'detail'            :   ['./src/page/detail/index.js'],
            'cart'              :   ['./src/page/cart/index.js'],
            'order-confirm'     :   ['./src/page/order-confirm/index.js'],
            'order-list'        :   ['./src/page/order-list/index.js'],
            'payment'           :   ['./src/page/payment/index.js'],
            'order-detail'      :   ['./src/page/order-detail/index.js'],
            'user-login'        :   ['./src/page/user-login/index.js'],
            'result'            :   ['./src/page/result/index.js'],
            'user-register'     :   ['./src/page/user-register/index.js'],
            'user-center'       :   ['./src/page/user-center/index.js'],
            'user-center-update':   ['./src/page/user-center-update/index.js'],
            'user-pass-update'  :   ['./src/page/user-pass-update/index.js'],
            'user-pass-reset'   :   ['./src/page/user-pass-reset/index.js']
        },

    output:{
        path: __dirname + '/dist/',
        publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall/dist/',
        filename:'js/[name].js'
    },
    module:{
        loaders:[
        {test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader:'url-loader?limit=100&name=resource/[name].[ext]'},
            {test:/\.css$/,loader:ExtractTextPlugin.extract("style-loader","css-loader")},
            {test:/\.string$/,loader:'html-loader'}
        ]
    },
    resolve:{
        alias:{
            node_modules:__dirname + '/node_modules',
            util        :__dirname + '/src/util',
            page        :__dirname + '/src/page',
            service     :__dirname + '/src/service',
            image       :__dirname + '/src/image'
        }
    },
    externals:{
        'jquery':'window.jQuery'

    },
    plugins:[
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        // 
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart','购物车页')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认页')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('payment','订单支付页')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','用户中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','注册结果'))
    ]
    
}
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;