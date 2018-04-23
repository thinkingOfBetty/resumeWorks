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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/player/StartButton.js");
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

/***/ "./js/player/StartButton.js":
/*!**********************************!*\
  !*** ./js/player/StartButton.js ***!
  \**********************************/
/*! exports provided: StartButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StartButton\", function() { return StartButton; });\n/* harmony import */ var _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/Sprite.js */ \"./js/base/Sprite.js\");\n/* harmony import */ var _base_DataStore_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/DataStore.js */ \"./js/base/DataStore.js\");\n//开始按钮类\n\n\n\nclass StartButton extends _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"Sprite\"] {\n    constructor(){\n    const image  = _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"Sprite\"].getImage('startButton');\n    super(image,0,0,image.width,image.height,\n        (_base_DataStore_js__WEBPACK_IMPORTED_MODULE_1__[\"DataStore\"].getInstance().canvas.width-image.width)/2,\n        (_base_DataStore_js__WEBPACK_IMPORTED_MODULE_1__[\"DataStore\"].getInstance().canvas.height-image.height)/2,\n        image.width,image.height\n    )\n    }\n\n}\n\n//# sourceURL=webpack:///./js/player/StartButton.js?");

/***/ })

/******/ });