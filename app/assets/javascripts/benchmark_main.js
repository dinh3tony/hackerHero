var mistake_count = false;

$(document).ready(function() {

	// window.chart = new Highcharts.Chart({
	//    chart: {
	//         scrollablePlotArea: {
	//             minWidth: 700
	//         },
	//         renderTo:  $('#summary_report_high_charts')[0],
	//         height: 400
	//     },

	//    title: {
	//         text: null
	//     },

	//     subtitle: {
	//         text: null
	//     },

	//     xAxis: {
	//         tickWidth: 0,
	//         gridLineWidth: 1,
	//         labels: {
	//             align: 'left',
	//             x: 3,
	//             y: -3
	//         },
	//         categories: ['0', '10', '20', '30'],
	//         title: {
	//             text: 'Minutes'
	//         },
	//     },

	//     yAxis: [{
	//     	max: 20,
	//         title: {
	//             text: 'Points'
	//         },
	//         labels: {
	//             align: 'left',
	//             x: 3,
	//             y: 16,
	//             format: '{value:.,0f}'
	//         },
	//         showFirstLabel: false
	//     }],

	//     legend: {
	//         align: 'left',
	//         verticalAlign: 'top',
	//         borderWidth: 0
	//     },

	//     tooltip: {
	//         shared: true,
	//         crosshairs: true
	//     },

	//     series: [{
	//         name: 'Total Possible',
	//         data: [7.0, 6.9, 9.5, 14.5]
	//     }, {
	//         name: 'Your Total Points',
	//         data: [3.9, 4.2, 5.7, 8.5],
	//         color: '#6BBB24'
	//     }],
	//     credits: {
	//       enabled: false
	//   }
	// });

	console.log($(document).height());
	$('#benchmark_right_navigation').height( $(document).height() );

	$('body').on('click', '#star_test_btn', display_dashboard)

			 .on('click', '.run_code_btn', execute_coded_answer)

			 .on('click', '#submit_code_btn', submit_answers)

			 .on('click', '.answer_list .answer_item:not(.is_manual_output)', submit_code_answer_form)

			 .on('click', '.is_manual_output .proceed_btn', submit_manual_code_answer)

			 .on('submit', '.proceed_next_challege_form', submit_proceed_next_challege_form)

			 .on('click', '.try_again_btn', function(){
				location.reload();
			 })
			//  .on('click', '.modal_btn', function(){
			// 	$('#benchmark_modal').modal('toggle');
			//  })
});

function submit_proceed_next_challege_form(){
	$(this).closest('.modal').modal('hide')
	$('.code_answer_form').addClass('hidden');
	$('.with_wireframe').removeClass('hidden');
	$('#benchmark_right_navigation').height( $(document).height() );
	return false;
}

function submit_manual_code_answer(){
	var	btn = $(this);
	var selected_item  = btn.closest('li')
	var form = btn.closest('form'); 

	selected_item.removeClass('is_correct is_error' );

	if(btn.siblings('textarea').val() == 1 )  {

		selected_item.addClass('is_correct');
		selected_item.find('.left_container').html('<i class="fa fa-check-circle" aria-hidden="true"></i>')
		form.find('.correct_answer_message').removeClass('hidden').addClass('animated flipInX');
		
		show_next_question( selected_item.closest('form') );

		
	}
	else{/*if NOT correct*/
		selected_item.addClass('is_error');
		selected_item.find('.left_container').html('<i class="fa fa-times-circle" aria-hidden="true"></i>')
		
		form.find('.incorrect_answer_message').removeClass('hidden').addClass('animated shake');
		setTimeout(function(){
			form.find('.incorrect_answer_message').addClass('hidden').removeClass('animated shake');
		},2000)
	}

}

function submit_code_answer_form(){
	var selected_item = $(this);
	var form =  selected_item.closest('form');
	

	/*for simulation*/
	var answer = selected_item.index();
	/*if correct*/
	if( answer == 1){

		selected_item.addClass('is_correct');
		selected_item.find('.left_container').html('<i class="fa fa-check-circle" aria-hidden="true"></i>')
		/*change flipInX*/
		form.find('.correct_answer_message').removeClass('hidden').addClass('animated flipInX');
		form.find('.answer_item').addClass( 'disabled' );
		form.find('.incorrect_answer_message').addClass('hidden');
		show_next_question( selected_item.closest('form') );

	}
	else{/*if NOT correct*/
		selected_item.addClass('is_error disabled');
		selected_item.find('.left_container').html('<i class="fa fa-times-circle" aria-hidden="true"></i>')
		
		/*change and add*/
		$("html, body").animate({ scrollTop: $(document).height() }, 1200);		
		if(mistake_count){
			mistake_count = false;
			/*change and add*/
			form.find('.incorrect_answer_message').removeClass('hidden').addClass('animated shake').html( "Oops! You've got a wrong answer again! Will proceed to the next challenge <span class='next_level_timer'>3</span> s" );
			form.find('.answer_item').addClass( 'disabled' );

			show_next_question( selected_item.closest('form') );

		}
		else{
			form.find('.incorrect_answer_message').removeClass('hidden').addClass('animated shake').text( "Oops! You've got a wrong answer! You still have 1 chance" );
			mistake_count = true;
		}
		
		setTimeout(function(){
			form.find('.incorrect_answer_message').addClass('hidden').removeClass('animated shake');
		},4000)
	}
}

function show_next_question( current_form ){
	var count=5;

	var counter = setInterval(timer, 1000); 

	function timer(){
		count=count-1;
		if (count <= 0){

			/*show new quation*/
			clearInterval(counter);
			current_form.addClass('hidden');
			current_form.find('.correct_answer_message').addClass('hidden')
			current_form.next().removeClass('hidden').addClass('animated slideInUp');
			start_timer(  current_form.next()  );

			$('#benchmark_right_navigation').height( $(document).height() );
			return;
		}
		else{
			current_form.find('.next_level_timer').text( count )
		}
	}
}


var points_counter = 0;

function display_dashboard() {
	$('.app_content').find('.code_answer_form').eq(0).removeClass('hidden');
	$('#benchmark_main_container').addClass('hidden');
	start_timer( $('.app_content').find('.code_answer_form').eq(0) );
}

//timer for the benchmark_modal
function start_timer( current_form ) {
	var timer2 = "30:00";
	var interval = setInterval(function() {

		var timer = timer2.split(':');

		var minutes = parseInt(timer[0], 10);
		var seconds = parseInt(timer[1], 10);
		--seconds;
		minutes = (seconds < 0) ? --minutes : minutes;
		if (minutes < 0) clearInterval(interval);

		seconds = (seconds < 0) ? 59 : seconds;
		seconds = (seconds < 10) ? '0' + seconds : seconds;

		current_form.find('.timer_text').html(minutes + ':' + seconds);
		timer2 = minutes + ':' + seconds;

		if (seconds <= 0) {
			clearInterval(interval);
		}
	}, 1000);
}



function execute_coded_answer() {
	var btn = $(this);
	var form = btn.closest('form');
	var text_area = form.find('.codes_list textarea');
	var output_val =  text_area.val();

	var item = form.find('.to_do_list').children();

	if (output_val.length == 0) {
		text_area.addClass('error animated shake');

		setTimeout(function(){
			text_area.removeClass('animated shake error');
		},2000)

	}
	/*changes*/
	else if (output_val == 0) {		
		form.find('.to_do_list li').eq(output_val).addClass('is_correct_answer animated bounceIn');
		points_counter += 1;
	}
	else if(output_val == 1) {
		form.find('.to_do_list li').eq(output_val).addClass('is_correct_answer animated bounceIn');
		points_counter += 1;
	}
	else if(output_val == 2) {	
		form.find('.to_do_list li').eq(output_val).addClass('is_correct_answer animated bounceIn');
		points_counter += 1;
	}
	else{
		form.find('.incorrect_answer_message').removeClass('hidden').addClass('animated shake');
		form.find('.has_textarea textarea').focus();
		 $("html, body").animate({ scrollTop: $(document).height() }, 1200);
		setTimeout(function(){
			form.find('.incorrect_answer_message').addClass('hidden').removeClass('animated shake');
			$("html, body").animate({ scrollTop: $(document).height() }, 1200);
		},2000)
	}

	
	if( form.find('.is_correct_answer').length  == 3){
		/*change*/
		form.find('.correct_answer_message').removeClass('hidden').addClass('animated flipInX');
		btn.addClass('disabled');
	}
}

function submit_answers() {
	$('#points_answered').html(points_counter);
	$('#benchmark_modal').modal('show');
	return false;
}

