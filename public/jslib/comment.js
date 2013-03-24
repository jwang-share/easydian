/* =========================================================
ChartView-Events
============================================================ */
jQuery(document).ready(function() {
  var shopCommentPars = { id: 0,  shopId: 0};
  $('section[id^=commentGroup]').slideUp("fast", function (){});
	$('section[id^=shopGroup]').mouseenter(function(){
    shopCommentPars.id = ($(this).attr('id')).substring(9);
    $('#commentChart' + shopCommentPars.id).css('height', 200);
    $('#commentBoard' + shopCommentPars.id).css('height', 200); 
  });

  $('article.one-forth').hover(function() {
    if($(this).attr('id') != 'undefined') {
      shopCommentPars.shopId = $(this).attr('id');
      $('#commentGroup' + shopCommentPars.id).slideDown("fast",function(){  
      commentChart = new Highcharts.Chart({
      chart: {
          renderTo: 'commentChart' + shopCommentPars.id,
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
  });
      renderCommentChart(commentChart, shopCommentPars.shopId);   
    });
}
});

	$('section[id=shopGroup' + shopCommentPars.id + ']').mouseleave(function(){
    $('section[id=commentGroup' + shopCommentPars.id + ']').slideUp('fast', function(){
      delete commentChart;
    });
	});		

	renderCommentChart = function(commentChart, shopId) {
	  $.get("/shop/" + shopId, function(data) {      
	    commentChart.series[0].setData(data.commentGood, true);	    	   
	    commentChart.series[1].setData(data.commentBad, true);	    	   
	  });
	};  	 
});