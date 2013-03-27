/* =========================================================
ChartView-Events
============================================================ */
jQuery(document).ready(function() {
  var shopCommentPars = { 
    id: 0,  
    shopId: 0,
    timeId: 0,
    commentChart: null,
    context: this   
  };

  $('section[id^=commentGroup]').slideUp("fast", function (){});
  $('article[id^=commentChart]').css('height', 200);
  $('article[id^=commentBoard]').css('height', 200); 

	$('section[id^=shopGroup]').mouseenter(function(){
    var id = shopCommentPars.id;
    shopCommentPars.id = ($(this).attr('id')).substring(9);
    hidePreviousCommentGroup(id);
    removeCommentBoardData(id);
  });

  $('article.one-forth').mouseenter(function(){
    shopCommentPars.context = this;
    shopCommentPars.timeId = setTimeout(function(){ 
      var id = shopCommentPars.id;   
      if($(shopCommentPars.context).attr('id') != undefined) {           
        shopCommentPars.id = ($('section').has('#' + $(shopCommentPars.context).attr('id')).attr('id')).substring(9);
        hidePreviousCommentGroup(id);
        removeCommentBoardData(id);
        shopCommentPars.shopId = $(shopCommentPars.context).attr('id');
        $('#commentGroup' + shopCommentPars.id).attr('display', 'block');
        $('#commentGroup' + shopCommentPars.id).slideDown("fast",function(){  
          shopCommentPars.commentChart = new Highcharts.Chart({
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
              data: [ ]
            },
            { 
              name: 'Bad', 
              data: [ ]
            }        
          ]
        });
        renderCommentChart(shopCommentPars.commentChart, shopCommentPars.shopId); 
        renderCommentBoard(shopCommentPars.shopId);  
        alert($('#commentBoard' + shopCommentPars.id + ' ul.slides').html());
        });
      }
    }, 2000);}).mouseleave(function(){
      clearTimeout(shopCommentPars.timeId);
    });

	$('section[id=shopGroup' + shopCommentPars.id + ']').mouseleave(function(){
    hidePreviousCommentGroup(shopCommentPars.id);
    removeCommentBoardData(shopCommentPars.id);
	});		

	renderCommentChart = function(commentChart, shopId) {
	  $.get("/shop/" + shopId, function(data) {      
	    commentChart.series[0].setData(data.commentGood, true);	    	   
	    commentChart.series[1].setData(data.commentBad, true);	    	   
	  });    
	}; 

  renderCommentBoard = function(shopId) {    
    $.get("/comment/" + shopId, function(data) {      
      for (var index = 0; index < data.comments.length; index++) {        
        $('#commentBoard' + shopCommentPars.id + ' ul.slides').append('<li class="clearfix"><p>' + data.comments[index] + '</p><span><a href="#">Good</a> | <a href="#">Bad</a> | <a href="#">Detail</a></span></li>');        
      }                   
    });    
  };

  hidePreviousCommentGroup =  function(id) {
    if (id != shopCommentPars.id) {
      $('section[id=commentGroup' + id + ']').slideUp('fast', function(){
        if (shopCommentPars.commentChart != null)
          delete shopCommentPars.commentChart;
          shopCommentPars.commentChart = null;
      });
    }
  }

  removeCommentBoardData =  function(id) {
    if (id != shopCommentPars.id) {
      $('#commentBoard' + shopCommentPars.id + ' ul.slides').empty();
    }
  }
});