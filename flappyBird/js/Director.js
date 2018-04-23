//导演类，控制游戏的逻辑

import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";
import { BackGround } from "./runtime/BackGround.js";

export class Director {
    constructor(){
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
    }
    static getInstance(){
        if(!Director.instance){
            Director.instance = new Director();
        }
        return Director.instance;
    }
    createPencil(){
        const minTop = window.innerHeight/8;
        const maxTop = window.innerHeight/2;
        const top = minTop + Math.random()*(maxTop-minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }
    // 点击的时候，实现小鸟向上升
    birdsEvent(){
        for(let i=0;i<=2;i++){
            this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }
    // 检查小鸟是否撞击铅笔
    isStrike(bird,pencil){
        let s = false;
        // if的情况是没有撞到的,水平撞击？
        if(bird.top>pencil.bottom||bird.bottom<pencil.top
            ||bird.right<pencil.left||bird.left>pencil.right){
                s=true;
            }
        return !s;
    }
    // 检查小鸟是否撞击地面跟铅笔
    check(){
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        const score = this.dataStore.get('score');
        if((birds.birdsY[0]+birds.birdsHeight[0])>land.y){
            this.isGameOver = true;
            return;
        }
        // 为小鸟建模
        const birdsBorder = {
            top:birds.birdsY[0],
            bottom:birds.birdsY[0]+birds.birdsHeight[0],
            left:birds.birdsX[0],
            right:birds.birdsX[0]+birds.birdsWidth[0]
        }
        // 为每一只铅笔建模，并且跟小鸟高度做比较
        const len = pencils.length;
        for(let i=0;i<len;i++){
            const pencil = pencils[i]
            const pencilBorder = {
                top:pencil.y,
                bottom:pencil.y+pencil.height,
                left:pencil.x,
                right:pencil.x+pencil.width
            }
            if(this.isStrike(birdsBorder,pencilBorder)){
                this.isGameOver = true;
                return;
            }
        }
        if(birds.birdsX[0]>pencils[0].x+pencils[0].width&&score.isScore){
            score.isScore=false;
            score.scoreNumber++;
        }
    }
    run(){
        this.check();
        if(!this.isGameOver){
            this.dataStore.get('background').draw();
        // 把已经到左边的铅笔给销毁了
        const pencils = this.dataStore.get('pencils')
        if(pencils[0].width+pencils[0].x<=0 && pencils.length === 4){
            // 将数组的第一个元素给取出来，然后数组的长度减一
            pencils.shift();
            pencils.shift();
            this.dataStore.get('score').isScore=true;
        }
        // 当铅笔已经运动过一半的时候，就创建新的铅笔
        if(pencils[0].x<(this.dataStore.canvas.width-pencils[0].width)/2 && pencils.length ===2){
            this.createPencil();
        }
        this.dataStore.get('pencils').forEach(item => {
            item.draw();
        });
        this.dataStore.get('land').draw();
        this.dataStore.get('score').draw();
        this.dataStore.get('birds').draw();
        const timer = requestAnimationFrame(()=>this.run());
        this.dataStore.put('timer',timer);
        }else{
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destory();
        }
    }
}