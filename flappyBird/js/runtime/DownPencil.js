//下半部分铅笔
import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class DownPencil extends Pencil {
    constructor(top){
        const image = Sprite.getImage('pencilDown');
        super(image,top)
    }
    draw(){
        const gap = window.innerWidth/8;
        this.y = this.top+gap;
        super.draw();
    }
}