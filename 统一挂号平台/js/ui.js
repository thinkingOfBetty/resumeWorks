$.fn.UiSearch=function(){
	var ui=$(this);
	$('.ui-search-selected',ui).on('click',function(){
		$('.ui-search-select-list').show();
		return false;
	})
	$('.ui-search-select-list a',ui).on('click',function(){
		$('.ui-search-selected').text($(this).text());
		$('.ui-search-select-list').hide();
		return false;
	})
	$('body').on('click',function(){
		$('.ui-search-select-list').hide();
	})
}

$.fn.UiTab=function(header,content){
	var ui=$(this)
	var tabs=$(header,ui)
	var cons=$(content,ui)
	tabs.on('click',function(){
		var index=$(this).index();
		tabs.removeClass('item-focus').eq(index).addClass('item-focus');
		tabs.removeClass('focus').eq(index).addClass('focus');
		cons.hide().eq(index).show();
		return false;
	})
	
	}

$.fn.UiBackTop=function(){
	var ui=$(this);
	var el=$('<a class="BackTop" href="#"></a>');
	ui.append(el);

	
	var windowHeight=$(window).height();

	$(window).on('scroll',function(){
		var tops=$('body').scrollTop();
		if (tops>windowHeight) {
			el.show();
		}else{
			el.hide();
		}
	});
	/*el.on('click',function(){
		$(window).scrollTop(0);
	})*/

}

$.fn.UiSlider=function(){
	var ui=$(this);
	var items=$('.ui-slider-wrap .item',ui);
	var wrap=$('.ui-slider-wrap');
	var btn_prev=$('.ui-slider-arrow .left',ui);
	var btn_next=$('.ui-slider-arrow .right',ui);
	var tips=$('.ui-slider-process .item',ui);

/*定义一些全局变量*/
		var current=0;
		var size=3;
		var width=items.eq(0).width();
		var autoNum=true;
	wrap.on('move_prev',function(){
		if(current<=0){
			current=size;
			
		}
		current=current-1;
		wrap.triggerHandler('move_to',current)

	})
	wrap.on('move_next',function(){
		if(current>=2){
			current=-1;
		}
		current=current+1;
		wrap.triggerHandler('move_to',current);
		
	})
	wrap.on('move_to',function(event,index){
		/*alert('hello')*/
		wrap.css('left',width*index*(-1));
		tips.removeClass('item-focus').eq(index).addClass('item-focus');
		
	})
	ui.on('mouseover',function(){
		autoNum=false;
		
		
	})
	ui.on('mouseout',function(){
		
		autoNum=true;
		
	})

	wrap.on('auto-move',function(){
		
		setInterval(function(){
			autoNum&&wrap.triggerHandler('move_next')
		},2000);
	
	
	})
	wrap.triggerHandler('auto-move');


	btn_prev.on('click',function(){
		wrap.triggerHandler('move_prev');
	})
	btn_next.on('click',function(){
		wrap.triggerHandler('move_next');
	})
	tips.on('click',function(){
		var index=$(this).index();
		wrap.triggerHandler('move_to',index);
	})
}

var getData = function(k,v){

	//	初始化获取所有城区
	if( k === undefined){
		return [{id:1,name:'东城区'},{id:2,name:'西城区'}];
	}
	//	根据城区获得下面的等级（不同城区相同等级的 id 不一样）
	if( k === 'area' ){
		var levelData = {
			1:[  {id:11,name:'一级医院'},{ id:12,name:'二级医院'} ],
			2:[  {id:22,name:'二级医院'} ]
		}
		return levelData[v] || [];
	}

//	根据等级获取医院
	if( k === 'level'){
		var hospital = {
			11 : [  {id:1,name:'A1医院'},{id:2,name:'A2医院'} ],
			12 : [  {id:3,name:'B1医院'} ],
			22 : [  {id:4,name:'C1医院'},{id:5,name:'C2医院'} ]

		}

		return hospital[v] || [];

	}
	//	根据名称获取科室（科室都是依附在医院下面的）
	if( k === 'name'){
		var department = {
			1 : [  {id:1,name:'骨科'},{id:2,name:'内科'} ],
			2 : [  {id:3,name:'儿科'} ],
			3 : [  {id:4,name:'骨科'},{id:5,name:'内科'} ],
			4 : [  {id:6,name:'儿科'} ],
			5 : [  {id:7,name:'骨科'},{id:8,name:'内科'} ]

		}

		return department[v] || [];
	}
	return [];
}




$.fn.uiCascading = function(){

	//	每个select更新，就清理后面所有 select 为初始化状态
	//	并且根据当前 select 的值，获得下一个 select 的数据，并且更新
	var ui = $(this);
	var listSelect = $('select',this);


	//	每个select
	listSelect

		.on('updateOptions',function(evt,ajax){
			
			var select = $(this);

			select.find('option[value!=-1]').remove();
			if(ajax.data.length<1){
				return true;
			}
			for(var i=0,j=ajax.data.length;i<j;i++){
				var k = ajax.data[i].id;
				var v = ajax.data[i].name;
				select.append( $('<option>').attr('value',k).text(v) );
			}
			return true;
		})
		.on('change',function(){

			var changeIndex = listSelect.index(this);

			var k = $(this).attr('name');
			var v = $(this).val();

			var data  = getData(k,v);

			listSelect.eq(changeIndex+1).triggerHandler('updateOptions',{ data:data });
			ui.find('select:gt('+(changeIndex+1)+')').each(function(){
				$(this).triggerHandler('updateOptions',{ data:[] });	
			})
		})


		//	初始化
		listSelect.find('option:first').attr('value','-1');	//	特殊初始值标记

		listSelect.eq(0).triggerHandler('updateOptions',{ data:getData() }); // apply 传参


}

$(function(){
	$('.ui-search').UiSearch();
	$('.content-tab').UiTab('.caption > .caption-item','.block > .item')
	$('.block').UiTab('.block-caption > .block-caption-item','.block-content > .block-wrap')
	$('body').UiBackTop();
	$('.ui-slider').UiSlider();
	$('.ui-cascading').uiCascading();
});