//小鸟类
//是循环渲染三只小鸟
//其实是循环渲染图片的三个部分
import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Birds extends Sprite {
   constructor(){
       const image = Sprite.getImage('birds');
       super(image,0,0,image.width,image.height,
              0,0,image.width,image.height);
        // 需要用数组来存储这组数据   
        // 小鸟左右距离是9,小鸟自身长度是34,小鸟自身高度是24，上下高度是10
        this.clippingX = [9,
                          9+34+18,
                          9+34+18+34+18];
        this.clippingY = [10,10,10];
        this.clippingWidth = [34,34,34];
        this.clippingHeight = [24,24,24];
        this.birdX = DataStore.getInstance().canvas.width/4;
        this.birdsX = [this.birdX,this.birdX,this.birdX];
        this.birdY = DataStore.getInstance().canvas.height/2;
        this.birdsY = [this.birdY,this.birdY,this.birdY];
        this.birdWidth = 34;
        this.birdsWidth = [this.birdWidth,this.birdWidth,this.birdWidth];
        this.birdHeight = 24;
        this.birdsHeight = [this.birdHeight,this.birdHeight,this.birdHeight];
        this.y = [this.birdY,this.birdY,this.birdY];
        this.index = 0;
        this.count = 0;
        this.time = 0;
   }
   
   draw(){
       const speed = 0.2;
       this.count = this.count +speed;
       if(this.index >= 2){
           this.count=0;
       }
       this.index = Math.floor(this.count);
        //    小鸟掉落时，模拟重力加速度
        const g = 0.98/2.4;
        //给小鸟垂直位移设置
        const offsetY = (g*this.time*(this.time-30))/2;
        for(var i=0;i<=2;i++){
            this.birdsY[i] = this.y[i]+offsetY;
        } 
        this.time++
       super.draw(this.img,this.clippingX[this.index],this.clippingY[this.index],
                this.birdsWidth[this.index],this.birdsHeight[this.index],
                this.birdsX[this.index],this.birdsY[this.index],
                this.birdsWidth[this.index],this.birdsHeight[this.index])
   }
}