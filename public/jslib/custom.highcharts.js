 /* =========================================================
ChartView-Events
============================================================ */
jQuery(document).ready(function() {
  var attentionChartOption = {
      chart: {
          renderTo: 'attentionChart',
          defaultSeriesType: 'line',
          marginRight: 10,
          backgroundColor:'transparent'
      },
      title: {
          text: 'Attention',
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
          categories: []
      },
      yAxis: {
          title: {
              text: 'Attention'
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
                'Date: ' + Highcharts.numberFormat(this.x, 2) + '<br/>' + 
                'Attention' + Highcharts.numberFormat(this.y, 2);
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
        	name: 'Attention', 
        	data: []
        }
      ]
  };

 var commentChartOption = {
      chart: {
          renderTo: 'commentChart',
          defaultSeriesType: 'line',
          marginRight: 10,
          backgroundColor:'transparent'
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
          categories: []
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
                'Date: ' + Highcharts.numberFormat(this.x, 2) + '<br/>' + 
                'Comment' + Highcharts.numberFormat(this.y, 2);
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

  	var commentTimeId;
  	var attentionTimeId;
	$('article.one-forth').mouseenter(function(){ 
		attentionTimeId = setTimeout($('#attentionChart').slideDown("fast",function(){
			var attentionChart;
			attentionChart = new Highcharts.Chart(attentionChartOption);
			renderAttentionChart(attentionChart);
			setInterval(function() {
				renderAttentionChart(attentionChart);
			}, 1*60*1000);				
		}), 500);	
		commentTimeId = setTimeout($('#commentChart').slideDown("fast",function(){	
			var commentChart;
			commentChart = new Highcharts.Chart(commentChartOption);
			renderCommentChart(commentChart);
			setInterval(function() {
				renderCommentChart(commentChart);
			}, 1*60*1000);					
		}), 500);	
	});

	$('section.feature-services').mouseleave(function(){
		$('#attentionChart').slideUp("fast",function(){
			clearTimeout(attentionTimeId); 
		});	
		$('#commentChart').slideUp("fast",function(){
			clearTimeout(commentTimeId);
		});			
	});

	renderAttentionChart = function(attentionChart) {
	  $.get("/shop/0", function(data) {
	    attentionChart.series[0].setData(data.attentionData, true);	
	    attentionChart.categories = data.categories;   	       	   
	  });
	};
	renderCommentChart = function(commentChart) {
	  $.get("/shop/0", function(data) {   	   
	    commentChart.series[0].setData(data.commentGood, true);	    	   
	    commentChart.series[1].setData(data.commentBad, true);
	    commentChart.categories = data.categories; 	    	   
	  });
	};	
});