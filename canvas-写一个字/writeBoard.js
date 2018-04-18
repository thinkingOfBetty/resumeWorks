var canvasWidth=Math.min(800,$(window).width()-20);
var canvasHeight=canvasWidth;
var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');
var isDown=false;
var lastLoc={x:0,y:0};
var lastTimeStamp;
var lastLineWidth=-1;
var strokecolor='black';

canvas.height=canvasHeight;
canvas.width=canvasWidth;
$('.controller').css('width',canvasWidth+'px');
drawGrid();
 
 $('.clear-btn').click(
     function(e){
         context.clearRect(0,0,canvas.width,canvas.height);
         drawGrid();
     }
    )
$('.color-btn').click(
    function(e){
        $('.color-btn').removeClass('color-btn-select');
        $(this).addClass('color-btn-select');
        strokecolor=$(this).css('background-color');
    }
)


canvas.onmousedown=function(e){
    e.preventDefault();
    isDown=true;
    //console.log('down');
    lastLoc=windowToCanvas(e.clientX,e.clientY);
    lastTimeStamp=new Date().getTime();

}
canvas.onmouseup=function(e){
    e.preventDefault();
    isDown=false;
    //console.log('up');
}
canvas.onmouseout=function(e){
    e.preventDefault();
    isDown=false
    //console.log('out;');
}
canvas.onmousemove=function(e){
    e.preventDefault();
    
    if(isDown){
        var curLoc=windowToCanvas(e.clientX,e.clientY);
    var curTimeStamp=new Date().getTime();
    var s=calcDistance(curLoc,lastLoc);
    var t=curTimeStamp-lastTimeStamp
    var lineWidth=calcLineWidth(s,t);
        context.beginPath();
        context.moveTo(lastLoc.x,lastLoc.y);
        context.lineTo(curLoc.x,curLoc.y);
        context.strokeStyle=strokecolor;
        context.lineWidth=lineWidth;
        context.lineCap='round';
        //context.lineJoin='round';
        context.stroke();
        lastLoc=curLoc;
        lastTimeStamp=curTimeStamp;
        lastLineWidth=lineWidth;
        
    }
    
    
}
var minLineWidth=1;
var maxLineWidth=30;
var maxStrokeV=10;
var minStrokeV=0.1;
function calcLineWidth(s,t){
    var v=s/t;
    var resultLineWidth;
    if(v<=0.1){
        resultLineWidth= 30;
    }else if(v>=10){
        resultLineWidth= 1;
    }else{
        resultLineWidth=Math.floor(30-(v-0.1)/(10-0.1)*(30- 1));
    }

    if(lastLineWidth==-1)
        return resultLineWidth;

    var finalV=resultLineWidth*1/3+lastLineWidth*2/3;

        
    return finalV;
}
function calcDistance(loca,locb){
    return Math.sqrt((loca.x-locb.x)*(loca.x-locb.x)+(loca.y-locb.y)*(loca.y-locb.y));
}

function windowToCanvas(x,y){
    var bbox=canvas.getBoundingClientRect()

    return {x:x-bbox.left,y:y-bbox.top}
}

function drawGrid(){
    context.save();
//画出粗边外边框
    context.strokeStyle='rgb(230,11,9)';
    context.beginPath()
    context.moveTo(3,3);
    context.lineTo(canvas.width-3,3);
    context.lineTo(canvas.width-3,canvas.height-3);
    context.lineTo(3,canvas.height-3);
    context.closePath();
    context.lineWidth=6;
    context.stroke();

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(canvas.width,canvas.height);

    context.moveTo(canvas.width,0);
    context.lineTo(0,canvas.height);

    context.moveTo(canvas.width/2,0);
    context.moveTo(canvas.width/2,canvas.height);

    context.moveTo(0,canvas.height/2);
    context.lineTo(canvas.width,canvas.height/2);
    context.lineWidth=2;
    context.setLineDash([2, 5]);
    context.stroke();


    context.restore();
}
