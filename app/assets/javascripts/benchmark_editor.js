$(document).ready(function() {
	Split(['#main_left_container', '#main_right_container'], {
	    minSize: [300, 100],
	    expanedToMin: true,
	    onDrag: function(e){
			 adjust_file_and_ace_height();
		}
	})

	Split(['.files_container', '.ace_editor_container'], {
	    minSize: [100, 100],
	    expanedToMin: true,
	    sizes: [25, 75],
	    onDrag: function(e){
			 adjust_file_and_ace_height();
		}
	})
	Split(['.browser_container', '.console_container'], {
	    minSize: [100, 100],
	    expanedToMin: true,
	    direction: 'vertical',
	    sizes: [70, 30]
	})


	var editor = ace.edit("editor");
	    editor.setTheme("ace/theme/monokai");
	    editor.session.setMode("ace/mode/javascript");

    $('body').on('click', '#files_list .item_title_btn', show_content_file_dropdown)
    
    // $(document).on('rezise', adjust_file_and_ace_height)
   
    // $(document).resize(function(event) {
    // 	adjust_file_and_ace_height();
    // 	/* Act on the event */
    // });
    adjust_file_and_ace_height();
    $(window).resize(function(){
	   adjust_file_and_ace_height();
	});
});

function adjust_file_and_ace_height(){
	var deducted_height = $('#wrapper').height() - $('.benchmark_question_form').height();
	$('.files_container').height( deducted_height - 50 );
	$('.ace_editor_container').height( deducted_height );
}

function show_content_file_dropdown(){
	var item_title_btn = $(this);
	var item = item_title_btn.closest('li');
	
	$('#files_list').find('h6').removeClass('active');
	item_title_btn.closest('h6').addClass('active');

	var additional_margin = parseInt(item.attr('data-layer-index')) * 30;

	if( item.hasClass('open_folder') ){
		item_title_btn.closest('h6').siblings('ul').find('.open_folder').removeClass('open_folder')

		item.removeClass('open_folder');
		item_title_btn.closest('h6').siblings('ul').find('.item_title_btn').css('margin-left', 0 )
		item_title_btn.closest('h6').siblings('ul').hide().find('ul').hide();
	}
	else{
		if( !item.hasClass('is_file') ){
			item.addClass('open_folder');
			item_title_btn.closest('h6').siblings('ul').find('.item_title_btn').css('margin-left', additional_margin )
			item_title_btn.closest('h6').siblings('ul').slideDown();
		}
		else{
			console.log( 'open file' )
		}
	}
}
