/**
 * Created by 傅令杰
 * 铅笔的基类
 */
import { Sprite } from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";
import { Land } from "./Land.js";
import { Director } from "../Director.js";

export class Pencil extends Sprite {
    constructor(image,top){
        super(image,
            0,0,
            image.width,image.height,
            DataStore.getInstance().canvas.width,0,
            image.width,image.height);
            this.top = top;
    }
    
    draw(){
            this.x = this.x-Director.getInstance().moveSpeed;
        super.draw(this.img,
        this.srcX,this.srcY,
        this.srcW,this.srcH,
        this.x,this.y,
        this.width,this.height)
    }
}