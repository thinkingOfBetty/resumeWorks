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
/******/ 	return __webpack_require__(__webpack_require__.s = "./game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Main.js":
/*!*****************!*\
  !*** ./Main.js ***!
  \*****************/
/*! exports provided: Main */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Main\", function() { return Main; });\n/* harmony import */ var _js_runtime_BackGround_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/runtime/BackGround.js */ \"./js/runtime/BackGround.js\");\n/* harmony import */ var _js_base_DataStore_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/base/DataStore.js */ \"./js/base/DataStore.js\");\n/* harmony import */ var _js_Director_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/Director.js */ \"./js/Director.js\");\n/* harmony import */ var _js_runtime_Land_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/runtime/Land.js */ \"./js/runtime/Land.js\");\n/* harmony import */ var _js_player_Birds_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/player/Birds.js */ \"./js/player/Birds.js\");\n/* harmony import */ var _js_player_StartButton_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/player/StartButton.js */ \"./js/player/StartButton.js\");\n/* harmony import */ var _js_player_Score_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/player/Score.js */ \"./js/player/Score.js\");\n/* harmony import */ var _js_base_ResourceLoader_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/base/ResourceLoader.js */ \"./js/base/ResourceLoader.js\");\n//初始化整个游戏的精灵，作为游戏开始的入口\n\n\n\n\n\n\n\n// import {ApiExamples} from \"./js/ApiExamples.js\";\n\n\nclass Main {\n    constructor(){\n        this.canvas     = document.getElementById('game_canvas');\n        this.ctx        = this.canvas.getContext('2d');\n        this.dataStore  = _js_base_DataStore_js__WEBPACK_IMPORTED_MODULE_1__[\"DataStore\"].getInstance();\n        this.director   = _js_Director_js__WEBPACK_IMPORTED_MODULE_2__[\"Director\"].getInstance();\n        const loader    = _js_base_ResourceLoader_js__WEBPACK_IMPORTED_MODULE_7__[\"ResourceLoader\"].create();\n        loader.onloaded(map => this.onResourceFirstLoaded(map));\n        \n    }\n    onResourceFirstLoaded(map){\n        this.dataStore.canvas = this.canvas;\n        this.dataStore.ctx = this.ctx;\n        this.dataStore.res = map;\n        this.init();\n    }\n    \n    init(){\n        // 首先重置游戏没有结束\n        this.director.isGameOver = false;\n        this.dataStore.put('birds',_js_player_Birds_js__WEBPACK_IMPORTED_MODULE_4__[\"Birds\"])\n        .put('pencils',[])\n        .put('background',_js_runtime_BackGround_js__WEBPACK_IMPORTED_MODULE_0__[\"BackGround\"])\n        .put('land',_js_runtime_Land_js__WEBPACK_IMPORTED_MODULE_3__[\"Land\"])\n        .put('score',_js_player_Score_js__WEBPACK_IMPORTED_MODULE_6__[\"Score\"])\n        .put('startButton',_js_player_StartButton_js__WEBPACK_IMPORTED_MODULE_5__[\"StartButton\"]);\n        this.registerEvent();\n        // 在运行前要创建好铅笔，并且渲染到画面上\n        this.director.createPencil();\n        this.director.run();\n    }\n    \n    registerEvent(){\n        this.canvas.addEventListener('click', e=>{\n            e.preventDefault();\n            if(this.director.isGameOver){\n                this.init();\n            }else{\n                this.director.birdsEvent();\n            }\n        })\n    }\n}\n\n//# sourceURL=webpack:///./Main.js?");

/***/ }),

/***/ "./game.js":
/*!*****************!*\
  !*** ./game.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Main.js */ \"./Main.js\");\n\n\nnew _Main_js__WEBPACK_IMPORTED_MODULE_0__[\"Main\"]();\n\n//# sourceURL=webpack:///./game.js?");

/***/ }),

/***/ "./js/Director.js":
/*!************************!*\
  !*** ./js/Director.js ***!
  \************************/
/*! exports provided: Director */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Director\", function() { return Director; });\n/* harmony import */ var _base_DataStore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base/DataStore.js */ \"./js/base/DataStore.js\");\n/* harmony import */ var _runtime_UpPencil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./runtime/UpPencil.js */ \"./js/runtime/UpPencil.js\");\n/* harmony import */ var _runtime_DownPencil_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./runtime/DownPencil.js */ \"./js/runtime/DownPencil.js\");\n/* harmony import */ var _runtime_BackGround_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./runtime/BackGround.js */ \"./js/runtime/BackGround.js\");\n//导演类，控制游戏的逻辑\n\n\n\n\n\n\nclass Director {\n    constructor(){\n        this.dataStore = _base_DataStore_js__WEBPACK_IMPORTED_MODULE_0__[\"DataStore\"].getInstance();\n        this.moveSpeed = 2;\n    }\n    static getInstance(){\n        if(!Director.instance){\n            Director.instance = new Director();\n        }\n        return Director.instance;\n    }\n    createPencil(){\n        const minTop = window.innerHeight/8;\n        const maxTop = window.innerHeight/2;\n        const top = minTop + Math.random()*(maxTop-minTop);\n        this.dataStore.get('pencils').push(new _runtime_UpPencil_js__WEBPACK_IMPORTED_MODULE_1__[\"UpPencil\"](top));\n        this.dataStore.get('pencils').push(new _runtime_DownPencil_js__WEBPACK_IMPORTED_MODULE_2__[\"DownPencil\"](top));\n    }\n    // 点击的时候，实现小鸟向上升\n    birdsEvent(){\n        for(let i=0;i<=2;i++){\n            this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];\n        }\n        this.dataStore.get('birds').time = 0;\n    }\n    // 检查小鸟是否撞击铅笔\n    isStrike(bird,pencil){\n        let s = false;\n        // if的情况是没有撞到的,水平撞击？\n        if(bird.top>pencil.bottom||bird.bottom<pencil.top\n            ||bird.right<pencil.left||bird.left>pencil.right){\n                s=true;\n            }\n        return !s;\n    }\n    // 检查小鸟是否撞击地面跟铅笔\n    check(){\n        const birds = this.dataStore.get('birds');\n        const land = this.dataStore.get('land');\n        const pencils = this.dataStore.get('pencils');\n        const score = this.dataStore.get('score');\n        if((birds.birdsY[0]+birds.birdsHeight[0])>land.y){\n            this.isGameOver = true;\n            return;\n        }\n        // 为小鸟建模\n        const birdsBorder = {\n            top:birds.birdsY[0],\n            bottom:birds.birdsY[0]+birds.birdsHeight[0],\n            left:birds.birdsX[0],\n            right:birds.birdsX[0]+birds.birdsWidth[0]\n        }\n        // 为每一只铅笔建模，并且跟小鸟高度做比较\n        const len = pencils.length;\n        for(let i=0;i<len;i++){\n            const pencil = pencils[i]\n            const pencilBorder = {\n                top:pencil.y,\n                bottom:pencil.y+pencil.height,\n                left:pencil.x,\n                right:pencil.x+pencil.width\n            }\n            if(this.isStrike(birdsBorder,pencilBorder)){\n                this.isGameOver = true;\n                return;\n            }\n        }\n        if(birds.birdsX[0]>pencils[0].x+pencils[0].width&&score.isScore){\n            score.isScore=false;\n            score.scoreNumber++;\n        }\n    }\n    run(){\n        this.check();\n        if(!this.isGameOver){\n            this.dataStore.get('background').draw();\n        // 把已经到左边的铅笔给销毁了\n        const pencils = this.dataStore.get('pencils')\n        if(pencils[0].width+pencils[0].x<=0 && pencils.length === 4){\n            // 将数组的第一个元素给取出来，然后数组的长度减一\n            pencils.shift();\n            pencils.shift();\n            this.dataStore.get('score').isScore=true;\n        }\n        // 当铅笔已经运动过一半的时候，就创建新的铅笔\n        if(pencils[0].x<(this.dataStore.canvas.width-pencils[0].width)/2 && pencils.length ===2){\n            this.createPencil();\n        }\n        this.dataStore.get('pencils').forEach(item => {\n            item.draw();\n        });\n        this.dataStore.get('land').draw();\n        this.dataStore.get('score').draw();\n        this.dataStore.get('birds').draw();\n        const timer = requestAnimationFrame(()=>this.run());\n        this.dataStore.put('timer',timer);\n        }else{\n            this.dataStore.get('startButton').draw();\n            cancelAnimationFrame(this.dataStore.get('timer'));\n            this.dataStore.destory();\n        }\n    }\n}\n\n//# sourceURL=webpack:///./js/Director.js?");

/***/ }),

/***/ "./js/base/DataStore.js":
/*!******************************!*\
  !*** ./js/base/DataStore.js ***!
  \******************************/
/*! exports provided: DataStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DataStore\", function() { return DataStore; });\n//变量缓存器，方便我们在不同的类中访问和修改变量\nclass DataStore {\n    static getInstance(){\n        if(!DataStore.instace){\n            DataStore.instace = new DataStore;\n        }\n        return DataStore.instace;\n    }\n    constructor(){\n        this.map = new Map();\n    }\n    put(key,value){\n        if(typeof value === 'function'){\n            value = new value();\n        }\n        this.map.set(key,value);\n        return this;\n    }\n    get(key){\n        return this.map.get(key);\n    }\n    destory(){\n        for(let value of this.map.values()){\n            value = null;\n        }\n    }\n}\n\n//# sourceURL=webpack:///./js/base/DataStore.js?");

/***/ }),

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

/***/ }),

/***/ "./js/player/Score.js":
/*!****************************!*\
  !*** ./js/player/Score.js ***!
  \****************************/
/*! exports provided: Score */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Score\", function() { return Score; });\n/* harmony import */ var _base_DataStore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/DataStore.js */ \"./js/base/DataStore.js\");\n//计分器类\n\n\n\nclass Score {\n    constructor(){\n        this.scoreNumber = 0;\n        this.dataStore = _base_DataStore_js__WEBPACK_IMPORTED_MODULE_0__[\"DataStore\"].getInstance();\n        this.ctx = this.dataStore.ctx\n        this.isScore = true;\n    }\n    draw(){\n        this.ctx.font = '25px Arial';\n        this.ctx.fillStyle = '#ffcbeb';\n        \n        this.ctx.fillText (\n            this.scoreNumber,\n            this.dataStore.canvas.width/2,this.dataStore.canvas.height/18,1000\n        )\n    }\n}\n\n//# sourceURL=webpack:///./js/player/Score.js?");

/***/ }),

/***/ "./js/player/StartButton.js":
/*!**********************************!*\
  !*** ./js/player/StartButton.js ***!
  \**********************************/
/*! exports provided: StartButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StartButton\", function() { return StartButton; });\n/* harmony import */ var _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/Sprite.js */ \"./js/base/Sprite.js\");\n/* harmony import */ var _base_DataStore_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/DataStore.js */ \"./js/base/DataStore.js\");\n//开始按钮类\n\n\n\nclass StartButton extends _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"Sprite\"] {\n    constructor(){\n    const image  = _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"Sprite\"].getImage('startButton');\n    super(image,0,0,image.width,image.height,\n        (_base_DataStore_js__WEBPACK_IMPORTED_MODULE_1__[\"DataStore\"].getInstance().canvas.width-image.width)/2,\n        (_base_DataStore_js__WEBPACK_IMPORTED_MODULE_1__[\"DataStore\"].getInstance().canvas.height-image.height)/2,\n        image.width,image.height\n    )\n    }\n\n}\n\n//# sourceURL=webpack:///./js/player/StartButton.js?");

/***/ }),

/***/ "./js/runtime/BackGround.js":
/*!**********************************!*\
  !*** ./js/runtime/BackGround.js ***!
  \**********************************/
/*! exports provided: BackGround */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BackGround\", function() { return BackGround; });\n/* harmony import */ var _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/Sprite.js */ \"./js/base/Sprite.js\");\n/* harmony import */ var _base_DataStore_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/DataStore.js */ \"./js/base/DataStore.js\");\n//背景\n\n\n\nclass BackGround extends _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"Sprite\"] {\n    constructor(){\n        const image = _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"Sprite\"].getImage('background');\n        super(image,\n            0,0,\n            image.width,image.height,\n            0,0,\n            window.innerWidth,window.innerHeight);\n    }\n}\n\n//# sourceURL=webpack:///./js/runtime/BackGround.js?");

/***/ }),

/***/ "./js/runtime/DownPencil.js":
/*!**********************************!*\
  !*** ./js/runtime/DownPencil.js ***!
  \**********************************/
/*! exports provided: DownPencil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DownPencil\", function() { return DownPencil; });\n/* harmony import */ var _Pencil_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pencil.js */ \"./js/runtime/Pencil.js\");\n/* harmony import */ var _base_Sprite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/Sprite.js */ \"./js/base/Sprite.js\");\n/* harmony import */ var _base_DataStore_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base/DataStore.js */ \"./js/base/DataStore.js\");\n//下半部分铅笔\n\n\n\n\nclass DownPencil extends _Pencil_js__WEBPACK_IMPORTED_MODULE_0__[\"Pencil\"] {\n    constructor(top){\n        const image = _base_Sprite_js__WEBPACK_IMPORTED_MODULE_1__[\"Sprite\"].getImage('pencilDown');\n        super(image,top)\n    }\n    draw(){\n        const gap = window.innerWidth/8;\n        this.y = this.top+gap;\n        super.draw();\n    }\n}\n\n//# sourceURL=webpack:///./js/runtime/DownPencil.js?");

/***/ }),

/***/ "./js/runtime/Land.js":
/*!****************************!*\
  !*** ./js/runtime/Land.js ***!
  \****************************/
/*! exports provided: Land */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Land\", function() { return Land; });\n/* harmony import */ var _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/Sprite.js */ \"./js/base/Sprite.js\");\n/* harmony import */ var _Director_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Director.js */ \"./js/Director.js\");\n/* harmony import */ var _base_DataStore_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base/DataStore.js */ \"./js/base/DataStore.js\");\n//不断移动的陆地\n\n\n\n\nclass Land extends _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"Sprite\"] {\n constructor(){\n    const image = _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"Sprite\"].getImage('land');\n    super(image,\n        0,0,\n        image.width,image.height,\n        0,window.innerHeight-image.height,\n        image.width,image.height);\n\n        this.landX = 0;\n        this.landSpeed = _Director_js__WEBPACK_IMPORTED_MODULE_1__[\"Director\"].getInstance().moveSpeed; \n    }\n    draw(){\n        this.landX = this.landX + this.landSpeed;\n        if(this.landX > (this.img.width-_base_DataStore_js__WEBPACK_IMPORTED_MODULE_2__[\"DataStore\"].getInstance().canvas.width)){\n            this.landX=0;\n        }\n        super.draw(this.img,this.srcX,this.srcY,this.srcW,this.srcH,\n            -this.landX,this.y,this.width,this.height);\n    }\n     \n\n}\n\n//# sourceURL=webpack:///./js/runtime/Land.js?");

/***/ }),

/***/ "./js/runtime/Pencil.js":
/*!******************************!*\
  !*** ./js/runtime/Pencil.js ***!
  \******************************/
/*! exports provided: Pencil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Pencil\", function() { return Pencil; });\n/* harmony import */ var _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/Sprite.js */ \"./js/base/Sprite.js\");\n/* harmony import */ var _base_DataStore_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/DataStore.js */ \"./js/base/DataStore.js\");\n/* harmony import */ var _Land_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Land.js */ \"./js/runtime/Land.js\");\n/* harmony import */ var _Director_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Director.js */ \"./js/Director.js\");\n/**\n * Created by 傅令杰\n * 铅笔的基类\n */\n\n\n\n\n\nclass Pencil extends _base_Sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"Sprite\"] {\n    constructor(image,top){\n        super(image,\n            0,0,\n            image.width,image.height,\n            _base_DataStore_js__WEBPACK_IMPORTED_MODULE_1__[\"DataStore\"].getInstance().canvas.width,0,\n            image.width,image.height);\n            this.top = top;\n    }\n    \n    draw(){\n            this.x = this.x-_Director_js__WEBPACK_IMPORTED_MODULE_3__[\"Director\"].getInstance().moveSpeed;\n        super.draw(this.img,\n        this.srcX,this.srcY,\n        this.srcW,this.srcH,\n        this.x,this.y,\n        this.width,this.height)\n    }\n}\n\n//# sourceURL=webpack:///./js/runtime/Pencil.js?");

/***/ }),

/***/ "./js/runtime/UpPencil.js":
/*!********************************!*\
  !*** ./js/runtime/UpPencil.js ***!
  \********************************/
/*! exports provided: UpPencil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UpPencil\", function() { return UpPencil; });\n/* harmony import */ var _Pencil_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pencil.js */ \"./js/runtime/Pencil.js\");\n/* harmony import */ var _base_Sprite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/Sprite.js */ \"./js/base/Sprite.js\");\n/* harmony import */ var _base_DataStore_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base/DataStore.js */ \"./js/base/DataStore.js\");\n//上半部分铅笔\n\n\n\n\nclass UpPencil extends _Pencil_js__WEBPACK_IMPORTED_MODULE_0__[\"Pencil\"] {\n\n    constructor(top){\n        const image = _base_Sprite_js__WEBPACK_IMPORTED_MODULE_1__[\"Sprite\"].getImage('pencilUp');\n        super(image,top)\n    }\n    draw(){\n        this.y = this.top-this.height;\n        super.draw();\n    }\n\n}\n\n//# sourceURL=webpack:///./js/runtime/UpPencil.js?");

/***/ })

/******/ });