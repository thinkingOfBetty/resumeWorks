/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/player/Birds.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/base/DataStore.js":
/*!******************************!*\
  !*** ./js/base/DataStore.js ***!
  \******************************/
/*! exports provided: DataStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DataStore\", function() { return DataStore; });\n//变量缓存器，方便我们在不同的类中访问和修改变量\nclass DataStore {\n    static getInstance(){\n        if(!DataStore.instace){\n            DataStore.instace = new DataStore;\n        }\n        return DataStore.instace;\n    }\n    constructor(){\n        this.map = new Map();\n    }\n    put(key,value){\n        if(typeof value === 'function'){\n            value = new value();\n        }\n        this.map.set(key,value);\n        return this;\n    }\n    get(key){\n        return this.map.get(key);\n    }\n    destory(){\n        for(let value of this.map.values()){\n            value = null;\n        }\n    }\n}\n\n//# sourceURL=webpack:///./js/base/DataStore.js?");

/***/ }),

/***/ "./js/base/Sprite.js":
/*!***************************!*\
  !*** ./js/base/Sprite.js ***!
  \***************************/
/*! exports provided: Sprite */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Sprite\", function() { return Sprite; });\n/* harmony import */ var _DataStore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataStore.js */ \"./js/base/DataStore.js\");\n//精灵的基类，负责初始化精灵加载的资源和大小以及位置\n\n\nclass Sprite {\n\n    constructor(\n                img = null,\n                srcX = 0,\n                srcY = 0,\n                srcW = 0,\n                srcH = 0,\n                x = 0, y = 0,\n                width = 0, height = 0) {\n        this.dataStore = _DataStore_js__WEBPACK_IMPORTED_MODULE_0__[\"DataStore\"].getInstance();\n        this.ctx  = this.dataStore.ctx;\n        this.img  = img;\n        this.srcX = srcX;\n        this.srcY = srcY;\n        this.srcW = srcW;\n        this.srcH = srcH;\n        this.x = x;\n        this.y = y;\n        this.width = width;\n        this.height = height;\n    }\n\n    static getImage(key){\n        return _DataStore_js__WEBPACK_IMPORTED_MODULE_0__[\"DataStore\"].getInstance().res.get(key);\n    }\n\n    /**\n     * img 传入Image对象\n     * srcX 要剪裁的起始X坐标\n     * srcY 要剪裁的起始Y坐标\n     * srcW 剪裁的宽度\n     * srcH 剪裁的高度\n     * x 放置的x坐标\n     * y 放置的y坐标\n     * width 要使用的宽度\n     * height 要使用的高度\n     */\n    \n    draw( img = this.img,\n        srcX = this.srcX,\n        srcY = this.srcY,\n        srcW = this.srcW,\n        srcH = this.srcH,\n        x = this.x,\n        y = this.y,\n        width = this.width,\n        height = this.height) {\n        this.ctx.drawImage(\n            img,\n            srcX,\n            srcY,\n            srcW,\n            srcH,\n            x,\n            y,\n            width,\n            height\n        )\n    }\n\n}\n\n//# sourceURL=webpack:///./js/base/Sprite.js?");

/***/ }),

/***/ "./js/player/Birds.js":
/*!****************************!*\
  !*** ./js/player/Birds.js ***!
  \****************************/
/*! exports provided: Birds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Birds\", function() { return Birds; });\n/* harmony import */ var _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/Sprite.js */ \"./js/base/Sprite.js\");\n/* harmony import */ var _base_DataStore_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/DataStore.js */ \"./js/base/DataStore.js\");\n//小鸟类\n//是循环渲染三只小鸟\n//其实是循环渲染图片的三个部分\n\n\n\nclass Birds extends _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"Sprite\"] {\n   constructor(){\n       const image = _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"Sprite\"].getImage('birds');\n       super(image,0,0,image.width,image.height,\n              0,0,image.width,image.height);\n        // 需要用数组来存储这组数据   \n        // 小鸟左右距离是9,小鸟自身长度是34,小鸟自身高度是24，上下高度是10\n        this.clippingX = [9,\n                          9+34+18,\n                          9+34+18+34+18];\n        this.clippingY = [10,10,10];\n        this.clippingWidth = [34,34,34];\n        this.clippingHeight = [24,24,24];\n        this.birdX = _base_DataStore_js__WEBPACK_IMPORTED_MODULE_1__[\"DataStore\"].getInstance().canvas.width/4;\n        this.birdsX = [this.birdX,this.birdX,this.birdX];\n        this.birdY = _base_DataStore_js__WEBPACK_IMPORTED_MODULE_1__[\"DataStore\"].getInstance().canvas.height/2;\n        this.birdsY = [this.birdY,this.birdY,this.birdY];\n        this.birdWidth = 34;\n        this.birdsWidth = [this.birdWidth,this.birdWidth,this.birdWidth];\n        this.birdHeight = 24;\n        this.birdsHeight = [this.birdHeight,this.birdHeight,this.birdHeight];\n        this.y = [this.birdY,this.birdY,this.birdY];\n        this.index = 0;\n        this.count = 0;\n        this.time = 0;\n   }\n   \n   draw(){\n       const speed = 0.2;\n       this.count = this.count +speed;\n       if(this.index >= 2){\n           this.count=0;\n       }\n       this.index = Math.floor(this.count);\n        //    小鸟掉落时，模拟重力加速度\n        const g = 0.98/2.4;\n        //给小鸟垂直位移设置\n        const offsetY = (g*this.time*(this.time-30))/2;\n        for(var i=0;i<=2;i++){\n            this.birdsY[i] = this.y[i]+offsetY;\n        } \n        this.time++\n       super.draw(this.img,this.clippingX[this.index],this.clippingY[this.index],\n                this.birdsWidth[this.index],this.birdsHeight[this.index],\n                this.birdsX[this.index],this.birdsY[this.index],\n                this.birdsWidth[this.index],this.birdsHeight[this.index])\n   }\n}\n\n//# sourceURL=webpack:///./js/player/Birds.js?");

/***/ })

/******/ });