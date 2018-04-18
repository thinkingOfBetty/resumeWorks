
$.fn.addTask=function(){
	var form=$('.add-task')
		,task_delete_trigger
		,task_detail_trigger
		,task_detail=$('.task-detail')
		,task_mask=$('.mask')
		,current_index
		,detail_form
		,task_detail_content
		,task_detail_content_input
		,task_complete
		,task_datetime
		,$msg=$('.msg')
		,msg_content=$('.msg_content')
		,msg_confirm=$('.confirm')
		,alerter=$('.alerter')
		,task_list;

		init()
		task_mask.on('click',task_mask_hide);
		console.log(task_list);
		form.on('submit',function(e){
			var new_task={}
			e.preventDefault();
			new_task.content=$(this).find('input[name=content]').val();
			if (new_task===null) {return};
			if (add_task(new_task)) {
				
				$(this).find('input[name=content]').val(null);
			}


		})

		function add_task(new_task){
			task_list.push(new_task);
			refresh_task_list();
			return true;
		}

		function init(){

			task_list=store.get('task_list')||[];
			if(task_list.length)
				render_task_list();
			task_remind_check();
			listen_msg_event();
		}
		function listen_msg_event(){
			msg_confirm.on('click',function(){
				hide_msg()
			})
		}

		function task_remind_check(){
			var current_timestamp;
			var itl=setInterval(function(){
				
			for(var i=0;i<task_list.length;i++){
				var item=task_list[i]
				if (!item||!item.remind_date||item.informed) 
					continue;
				current_timestamp=(new Date()).getTime();
				var task_timestamp=(new Date(item.remind_date)).getTime();
				if(current_timestamp-task_timestamp>=1){
					update_task(i,{informed:true})
					show_msg(item.content);
				}

			}

			}
			,300)

		}
		function show_msg(msg){
			msg_content.html(msg);
			$msg.show();
			alerter.get(0).play();
		}
		function hide_msg(){
			$msg.hide();
		}

			function listen_task_delete(){
			task_delete_trigger.on('click',function(){
			var index=$(this).parent().parent().data('index');
			var tmp=confirm('确定删除？')
			tmp? taskDelete(index):null;

		})
			}
			function listen_task_detail(){
				var index;
				$('.task-item').on('dblclick',function(){
					index=$(this).data('index');
					task_detail_show(index)

				})
				task_detail_trigger.on('click',function(){
					var index=$(this).parent().parent().data('index')
					task_detail_show(index);
				})
			}

			function listen_task_complete(){
				task_complete.on('click',function(){
					var index=$(this).parent().parent().data('index');
					item=store.get('task_list')[index];
					if(item.complete)
						update_task(index,{complete:false})
							
					else
						update_task(index,{complete:true})
					
					
				})

			}

			function task_detail_show(index){
				render_task_detail(index);
				task_mask.show();
				task_detail.show();
			}
			function task_mask_hide(){
				task_mask.hide();
				task_detail.hide();
			}
			function update_task(index,data){
				if(index===undefined||!task_list[index])
					return;
				current_index=index;
				task_list[index] = $.extend({}, task_list[index], data);
				refresh_task_list();

			}
			function render_task_detail(index){
				if (index===undefined||!task_list[index]) { return;}
					var item=task_list[index]
				var tpl=
				'<form >'+
					'<div class="content " >'+item.content+
					'</div>'+
					'<div class="input-item">' +
      				'<input style="display: none;" type="text" name="content" value="' + (item.content || '') + '">' +
      				'</div>' +
						'<div class="desc input-item">' +
      						'<textarea name="desc">' + (item.desc || '') + '</textarea>' +
      					'</div>' +
						'<div class="remind input-item">' +
      					'<input class="datetime" name="remind_date" type="text" value="' + (item.remind_date || '') + '">' +
      					'</div>' +
      					'<div class="input-item"><button type="submit" >更新</button></div>' +
      
				'</form>'
				task_detail.html(null);
				task_detail.html(tpl);
				$('.datetime').datetimepicker();

				detail_form=task_detail.find('form');
				task_detail_content=task_detail.find('.content');
				task_detail_content_input=task_detail.find('[name=content]');
				
				task_detail_content.on('dblclick',function(){
					task_detail_content_input.show();
					task_detail_content.hide();
				})
				
				detail_form.on('submit',function(e){
					e.preventDefault();
					var data={};
				data.content = $(this).find('[name=content]').val();
      			data.desc = $(this).find('[name=desc]').val();
      			data.remind_date = $(this).find('[name=remind_date]').val();
      			data.informed=false;
					update_task(index,data);
					task_detail.hide();


				})
			}
		

		function refresh_task_list(){
			task_list=store.set('task_list',task_list);
			render_task_list();

		}

		function taskDelete(index){
			if (index===undefined||!task_list[index]) {return;}
			delete task_list[index];
			refresh_task_list();

		}
		
		function render_task_list(){
			var task=$('.task-list');
			task.html(' ');
			var complete_array=[]
			for(var i=0;i<task_list.length;i++){
				var item=task_list[i]
				if(item&&item.complete)
					complete_array[i]=item;
				else
					var result=render_task_item(task_list[i],i);
				task.prepend(result);
			}
			for(var j=0;j<complete_array.length;j++){
				var result=render_task_item(complete_array[j],j);
				if(!result) continue;
				result.addClass('completed');
				task.append(result);

			}
			task_delete_trigger=$('.action.delete')
			task_detail_trigger=$('.action.detail')
			task_complete=$('.task-list .complete')
			listen_task_delete();
			listen_task_detail();
			listen_task_complete();

		}



		function render_task_item(data,index){
			if (!data || !index) return;
		var list_item_tpl=
			'<div class="task-item" data-index="'+index+'">'+
			'<span><input class="complete" type="checkbox"'+(data.complete?'checked':'')+'></span>'+
			'<span class="task-content">'+data.content+'</span>'+
			'<span class="fr">'+
			'<span class="action delete">删除</span>'+
			'<span class="action detail"> 详情</span>'+
			'</span>'+
		'</div>'
		return $(list_item_tpl);
	}


}






$(function(){
	$('.container').addTask();
})