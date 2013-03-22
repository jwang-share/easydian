 /* =========================================================
ChartView-Events
============================================================ */
jQuery(document).ready(function() {
  commentChartOption = {
      chart: {
          renderTo: 'commentChart0',
          defaultSeriesType: 'line',
          marginRight: 10,
          backgroundColor:'transparent',          
      },
      title: {
          text: 'Comment',
          style: {
              margin: '10px 100px 0 0' // center it
          }
      },
      credits: {
  			style: {
  				top: '20px',
  				right: '30px',
  				height: '1px'
  			},
  			text: "Easy Sou",
  			target: "_blank",
  			href: "http://www.easysou.com"
  		},
      xAxis: {
          categories: ['Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          title: {
              text: 'Comment'
          },
          min: 0,
          plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
          }]
      },
      tooltip: {
          formatter: function() {
              return '<b>' + this.series.name + '</b><br/>' + 
                'Date: ' + this.x + '<br/>' + 
                'Comment: ' + Highcharts.numberFormat(this.y, 2);
          }
      },
      legend: {
          enabled: true,
          align: 'right',
          x: -100,
          verticalAlign: 'top',
          y: 0,
          floating: true,
          backgroundColor: 'white',
          borderColor: '#CCC',
          borderWidth: 1
      },
      series: [
        { 
        	name: 'Good', 
        	data: []
        },
        { 
        	name: 'Bad', 
        	data: []
        }        
      ]
  };
  $('section[id^=commentGroup]').slideUp("fast", function (){});
  //$('section[id^=commentGroup]').hide();
	$('article.one-forth').mouseenter(function(){
    $('#commentChart0').css('height', 168);
    $('#commentBoard0').css('height', 168); 
		$('#commentGroup0').slideDown("fast",function(){	
			commentChart = new Highcharts.Chart(commentChartOption);
			renderCommentChart(commentChart);		
		});
  });

	$('section.feature-services').mouseleave(function(){
    $('section[id^=commentGroup]').hide();
	});		

	renderCommentChart = function(commentChart) {
	  $.get("/shop/0", function(data) {   	   
	    commentChart.series[0].setData(data.commentGood, true);	    	   
	    commentChart.series[1].setData(data.commentBad, true);	    	   
	  });
	};	
});