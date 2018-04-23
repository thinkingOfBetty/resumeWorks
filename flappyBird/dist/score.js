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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/player/Score.js");
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

/***/ "./js/player/Score.js":
/*!****************************!*\
  !*** ./js/player/Score.js ***!
  \****************************/
/*! exports provided: Score */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Score\", function() { return Score; });\n/* harmony import */ var _base_DataStore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/DataStore.js */ \"./js/base/DataStore.js\");\n//计分器类\n\n\n\nclass Score {\n    constructor(){\n        this.scoreNumber = 0;\n        this.dataStore = _base_DataStore_js__WEBPACK_IMPORTED_MODULE_0__[\"DataStore\"].getInstance();\n        this.ctx = this.dataStore.ctx\n        this.isScore = true;\n    }\n    draw(){\n        this.ctx.font = '25px Arial';\n        this.ctx.fillStyle = '#ffcbeb';\n        \n        this.ctx.fillText (\n            this.scoreNumber,\n            this.dataStore.canvas.width/2,this.dataStore.canvas.height/18,1000\n        )\n    }\n}\n\n//# sourceURL=webpack:///./js/player/Score.js?");

/***/ })

/******/ });