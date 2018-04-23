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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/base/ResourceLoader.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/base/ResourceLoader.js":
/*!***********************************!*\
  !*** ./js/base/ResourceLoader.js ***!
  \***********************************/
/*! exports provided: ResourceLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ResourceLoader\", function() { return ResourceLoader; });\n/* harmony import */ var _Resources_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Resources.js */ \"./js/base/Resources.js\");\n//资源文件加载器，确保canvas在图片资源加载完成后才进行渲染\n\n\nclass ResourceLoader {\n    constructor(){\n        this.map = new Map(_Resources_js__WEBPACK_IMPORTED_MODULE_0__[\"Resources\"]);\n        this.x = 2;\n        for(let [key,value] of this.map){\n            const image = new Image();\n            image.src = value;\n            this.map.set(key,image);\n        }\n    }\n    onloaded(callback){\n        let loadedCount = 0\n        for(let value of this.map.values()){\n            value.onload = ()=>{\n                loadedCount++;\n                if(loadedCount >= this.map.size){\n                    callback(this.map)\n                }\n            }\n        }\n    }\n    \n    static create(){\n        return new ResourceLoader();\n    }\n}\n\n//# sourceURL=webpack:///./js/base/ResourceLoader.js?");

/***/ }),

/***/ "./js/base/Resources.js":
/*!******************************!*\
  !*** ./js/base/Resources.js ***!
  \******************************/
/*! exports provided: Resources */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Resources\", function() { return Resources; });\nconst Resources = [\n    ['background', 'res/background.png'],\n    ['land', 'res/land.png'],\n    ['pencilUp', 'res/pie_up.png'],\n    ['pencilDown', 'res/pie_down.png'],\n    ['birds', 'res/birds.png'],\n    ['startButton', 'res/start_button.png']\n];\n\n//# sourceURL=webpack:///./js/base/Resources.js?");

/***/ })

/******/ });