//初始化整个游戏的精灵，作为游戏开始的入口
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";
// import {ApiExamples} from "./js/ApiExamples.js";
import {ResourceLoader} from "./js/base/ResourceLoader.js";

export class Main {
    constructor(){
        this.canvas     = document.getElementById('game_canvas');
        this.ctx        = this.canvas.getContext('2d');
        this.dataStore  = DataStore.getInstance();
        this.director   = Director.getInstance();
        const loader    = ResourceLoader.create();
        loader.onloaded(map => this.onResourceFirstLoaded(map));
        
    }
    onResourceFirstLoaded(map){
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }
    
    init(){
        // 首先重置游戏没有结束
        this.director.isGameOver = false;
        this.dataStore.put('birds',Birds)
        .put('pencils',[])
        .put('background',BackGround)
        .put('land',Land)
        .put('score',Score)
        .put('startButton',StartButton);
        this.registerEvent();
        // 在运行前要创建好铅笔，并且渲染到画面上
        this.director.createPencil();
        this.director.run();
    }
    
    registerEvent(){
        this.canvas.addEventListener('click', e=>{
            e.preventDefault();
            if(this.director.isGameOver){
                this.init();
            }else{
                this.director.birdsEvent();
            }
        })
    }
}