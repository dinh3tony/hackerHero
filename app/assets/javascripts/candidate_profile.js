$(document).ready(function() {
	$('body').on('click', '.topic_btn', show_main_topic )
			 .on('click', '.question_btn', show_question );


	if($('#over_view_highstocks_graph').length != 0){
		show_stockcharts( 'over_view_highstocks_graph' );
	}
	if($('#highstocks_graph').length != 0){
		show_stockcharts( 'highstocks_graph' );
	}
});

function show_question(){
	var btn = $(this);
	btn.closest('.main_list').find('.sub_item.active').removeClass('active');
	btn.closest('.sub_item').addClass('active');
}

function show_main_topic(){
	var main_item = $(this).closest('.main_item');
	main_item.siblings('.active').removeClass('active').find('.sub_list').show().slideUp(200);
	/*remove active class in sub item*/
	main_item.closest('.main_list').find('.sub_item.active').removeClass('active');

	/*set the overview to open first*/
	main_item.addClass('active').find('.sub_list').hide().slideDown(500).find('li').eq(0).addClass('active');
}


function show_stockcharts( highstock_container_id ){
	/*test data*/
    var data = [1,2,3,4,6,7,8,9,10,11,9,11,11,15,16,17,18,35,40,34,18,17,16,15,14,10,10,11,10,9,8,7,6,5,4,3,2,1];

    var stock_highcharts = Highcharts.stockChart( highstock_container_id , {
        chart: {
            alignTicks: false
        },
        title: {
            text: (highstock_container_id == 'over_view_highstocks_graph') ? '' : 'Overall Summary: General Programming Fundamentals'
        },
        navigator: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		rangeSelector: {
		    enabled: false
		},

		exporting: {
			enabled: false
		},
		scrollbar: {
			enabled: false
		},
		xAxis : {
		    labels: {
		       enabled: false
		    }
		},
		yAxis : {
		    labels: {
		       enabled: false
		    }
		},
		tooltip: {
			split: false,
			shared: false,
			useHTML:true,
			backgroundColor: null,
			borderWidth: 0,
			shadow: false,
			style: {
				padding: 0
			},
			headerFormat: '<span class="tooltip_arrow"></span>',
			pointFormat: '{series.name} <br/>',
			positioner: function( boxWidth, boxHeight, point  ){
				var x_point = (highstock_container_id == 'over_view_highstocks_graph') ? 18 : 18;
				var y_point = (highstock_container_id == 'over_view_highstocks_graph') ? 60 : 20;

    			return { x: point.plotX + x_point, y: point.plotY - y_point };
			}
		},
        series: [{
            type: 'column',
            name: 'Joe',
            data: data,
            color: '#FFDA2E'
        }]
    });
    stock_highcharts.tooltip.refresh(stock_highcharts.series[0].points[20]);
}



