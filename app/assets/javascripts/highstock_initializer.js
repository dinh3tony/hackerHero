$(document).ready(function() {
	show_stockcharts( 'stocks_graph1' );
	show_stockcharts( 'stocks_graph2' );
	show_stockcharts( 'stocks_graph3' );
	show_stockcharts( 'stocks_graph4' );
});

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



