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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/ApiExamples.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/ApiExamples.js":
/*!***************************!*\
  !*** ./js/ApiExamples.js ***!
  \***************************/
/*! exports provided: ApiExamples */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ApiExamples\", function() { return ApiExamples; });\n/**\n * Created by 傅令杰\n * 进行小游戏API的测试\n */\nclass ApiExamples {\n\n    getUserInfo() {\n        const params = {\n            success: function (res) {\n                console.log(res);\n            }\n        };\n        wx.getUserInfo(params);\n    }\n\n    login() {\n        wx.login({\n            success: function (res) {\n                console.log(res);\n            }\n        });\n    }\n\n    getSettings() {\n        wx.getSetting({\n            success: function (res) {\n                console.log(JSON.stringify(res));\n            }\n        });\n    }\n\n    //Http网络请求的调用\n    httpExample() {\n        wx.request({\n            url: 'http://127.0.0.1:8181/',\n            method: 'POST',\n            data: 'MyData',\n            success: function (response) {\n                console.log(response);\n                //这里可以根据服务器的指示来做相应的动作\n            }\n        });\n\n        // wx.request({\n        //     url: 'https://www.baidu.com/',\n        //     method: 'GET',\n        //     success: function (response) {\n        //         console.log(response);\n        //         //这里可以根据服务器的指示来做相应的动作\n        //     }\n        // });\n    }\n\n    socketExample() {\n        wx.connectSocket({\n            url: 'ws://127.0.0.1:8282',\n            success: function () {\n                console.log('客户端连接成功');\n            }\n        });\n\n        //注意，我们发送数据必须在wx.onSocketOpen中进行\n        wx.onSocketOpen(function () {\n            wx.sendSocketMessage({\n                data: '这个是来自客户端的实时消息'\n            });\n\n            wx.onSocketMessage(function (message) {\n                console.log(message);\n            });\n        });\n    }\n\n    download() {\n        wx.downloadFile({\n            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517319437013&di=2ec844cb98f7a6fffacca64df50b2248&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F0df431adcbef7609ddf178bb24dda3cc7cd99e18.jpg',\n            success: function (temp) {\n                console.log(JSON.stringify(temp));\n            }\n        });\n    }\n}\n\n//# sourceURL=webpack:///./js/ApiExamples.js?");

/***/ })

/******/ });