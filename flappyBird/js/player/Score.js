//计分器类

import {DataStore} from "../base/DataStore.js";

export class Score {
    constructor(){
        this.scoreNumber = 0;
        this.dataStore = DataStore.getInstance();
        this.ctx = this.dataStore.ctx
        this.isScore = true;
    }
    draw(){
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = '#ffcbeb';
        
        this.ctx.fillText (
            this.scoreNumber,
            this.dataStore.canvas.width/2,this.dataStore.canvas.height/18,1000
        )
    }
}