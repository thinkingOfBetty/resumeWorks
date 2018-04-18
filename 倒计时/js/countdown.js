
var endTime= new Date();
endTime.setTime(endTime.getTime()+3600*1000);

var balls=[];
const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","99CC00","#FF8800","FF4444","#CC0000"]


window.onload=function(){
	WINDOW_WIDTH=document.body.clientWidth;
	WINDOW_HEIGHT=document.body.clientHeight;
	MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
	RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;
	MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);


	var canvas=document.getElementById('canvas');
	var context=canvas.getContext('2d');

	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;

	var showCurrenTimeSeconds=getshowCurrenTimeSeconds();
	
	setInterval(function(){
		render(context);
		update();
	}, 50);
	
	function update(){
		var showNextTimeSeconds=getshowCurrenTimeSeconds();
		var nextHour = parseInt(showNextTimeSeconds/3600);
		var nextMinute = parseInt((showNextTimeSeconds-nextHour*3600)/60);
		var nextSecond = showNextTimeSeconds%60;

		var hour = parseInt(showCurrenTimeSeconds/3600);
		var minute = parseInt((showCurrenTimeSeconds-hour*3600)/60);
		var second = showCurrenTimeSeconds%60;

		if(nextSecond!=second){
			if(parseInt(nextHour/10)!=parseInt(hour/10)){
				addBalls(MARGIN_LEFT+0,MARGIN_LEFT,parseInt(hour/10));
			}
			if(parseInt(nextHour%10)!=parseInt(hour%10)){
				addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_LEFT,parseInt(hour%10))
			}

			if(parseInt(nextMinute/10)!=parseInt(minute/10)){			
				addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_LEFT,parseInt(minute/10))
			}
			if(parseInt(nextMinute%10)!=parseInt(minute%10)){
				addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_LEFT,parseInt(minute%10))
			}

			if(parseInt(nextSecond/10)!=parseInt(second/10)){
				addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_LEFT,parseInt(second/10))
			}
			if(parseInt(nextSecond%10)!=parseInt(second%10)){
				addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_LEFT,parseInt(second%10))
			}
			showCurrenTimeSeconds=showNextTimeSeconds;
		}

		updateBalls();
		
	}

	function addBalls(x,y,num){
		for(var i=0;i< digit[num].length;i++)
			for(var j=0;j<digit[num][i].length;j++)
				if(digit[num][i][j]==1){
					var aball={
						x:x+2*j*(RADIUS+1)+RADIUS+1,
						y:y+2*i*(RADIUS+1)+RADIUS+1,
						g:1.5+Math.random(),
						vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
						vy:-5,
						color:colors[Math.floor(Math.random()*colors.length)]

					}
					balls.push(aball);
				}
	}

	function updateBalls(){
		for(i=0;i<balls.length;i++){
			balls[i].x+=balls[i].vx;
			balls[i].y+=balls[i].vy;
			balls[i].vy+=balls[i].g;
			
			if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
				balls[i].y=WINDOW_HEIGHT-RADIUS;
				balls[i].vy=-balls[i].vy*0.75;
			}
		}
		var cnt=0;
		for(i=0;i<balls.length;i++){
			if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<WINDOW_WIDTH)
				balls[cnt++]=balls[i];
		}
		while(cnt<balls.length){
			balls.pop()
		}

	}


	function getshowCurrenTimeSeconds(){
		var curTime = new Date();
		var ret = endTime.getTime()-curTime.getTime();
		ret=Math.round(ret/1000);
		return ret>=0?ret:0;
	}
	function render(cxt){
		cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
		var hour = parseInt(showCurrenTimeSeconds/3600);
		var minute = parseInt((showCurrenTimeSeconds-hour*3600)/60);
		var second = showCurrenTimeSeconds%60;
		renderdigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10),cxt);
		renderdigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hour%10),cxt);
		renderdigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);

		renderdigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minute/10),cxt)
		renderdigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minute%10),cxt);
		renderdigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);

		renderdigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(second/10),cxt)
		renderdigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(second%10),cxt);
		
		for(var i=0;i<balls.length;i++){
			cxt.fillStyle=balls[i].color;
			cxt.beginPath();
			cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
			cxt.closePath();
			cxt.fill();
		}


	}

	function renderdigit(x,y,num,cxt){
			
		cxt.fillStyle="rgb(0,102,153)";

		for(var i=0;i<digit[num].length;i++){

			for(var j=0;j<digit[num][i].length;j++){						
				if(digit[num][i][j]==1){
					cxt.beginPath();
					cxt.arc(x+2*j*(RADIUS+1)+RADIUS+1,y+2*i*(RADIUS+1)+RADIUS+1,RADIUS,0,2*Math.PI);
					cxt.closePath();

					cxt.fill();

				}
			}	
		}

	}
		

	


}