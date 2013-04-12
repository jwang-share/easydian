//Ajax Tooltip script: By JavaScript Kit: http://www.javascriptkit.com
jQuery(document).ready(function(){
	var shopPars = { 
	    id: 1,  
	    shopId: 0,
	    timeId: 0,
	    context: this   

    };

	var ajaxtooltip={
		fadeeffect: [true, 300], //enable Fade? [true/false, duration_milliseconds]
		useroffset: [10, 10], //additional x and y offset of tooltip from mouse cursor, respectively
		loadingHTML: '<div style="font-style:italic">Fetching Comment Chart View...</div>',

		positiontip:function($tooltip, e){
			var docwidth=(window.innerWidth)? window.innerWidth-15 : ajaxtooltip.iebody.clientWidth-15
			var docheight=(window.innerHeight)? window.innerHeight-18 : ajaxtooltip.iebody.clientHeight-15
			var twidth=$tooltip.get(0).offsetWidth;
			var theight=$tooltip.get(0).offsetHeight;
			var tipx=e.pageX+this.useroffset[0];
			var tipy=e.pageY+this.useroffset[1];
			tipx=(e.clientX+twidth>docwidth)? tipx-twidth-(2*this.useroffset[0]) : tipx //account for right edge
			tipy=(e.clientY+theight>docheight)? tipy-theight-(2*this.useroffset[0]) : tipy //account for bottom edge
			$tooltip.css({left: tipx, top: tipy})
		},

		showtip:function($tooltip, e){
			if (this.fadeeffect[0])
				$tooltip.hide().fadeIn(this.fadeeffect[1])
			else
				$tooltip.show()
		},

		hidetip:function($tooltip, e){
			if (this.fadeeffect[0]) {
				$tooltip.fadeOut(this.fadeeffect[1]);
			}
			else {
				$tooltip.hide();
			}
		},

		removetip:function($tooltip, e){
			ajaxtooltip.hidetip($tooltip, e);
			$tooltip.remove();
		}
	};
	var tooltips=[];

	createShopToolTip = function() {
		ajaxtooltip.iebody=(document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
		tooltips=[] //array to contain references to all tooltip DIVs on the page
		$('img[title^="ajax:"]').each(function(index){ //find all links with "title=ajax:" declaration			
			this.titleurl=jQuery.trim(this.getAttribute('title').split(':')[1]) //get URL of external file
			this.titleposition=index+' pos' //remember this tooltip DIV's position relative to its peers
			tooltips.push($('<div class="ajaxtooltip"></div>').appendTo('body'))			
			$(this).removeAttr('title');
		});
	};

	$('section article img').live('mouseenter', function(e){ //mouseenter element
		shopPars.context = this;
		shopPars.timeId = setTimeout(function(){
			$(shopPars.context).attr('title', 'ajax:shopchartview/'+$(shopPars.context).attr('id'));
			createShopToolTip();
			var $tooltip=tooltips[parseInt(shopPars.context.titleposition)];
			if (!$tooltip.get(0).loadsuccess){ //first time fetching Ajax content for this tooltip?
				$tooltip.html(ajaxtooltip.loadingHTML).show();
				$tooltip.load(shopPars.context.titleurl, '', function(){
					ajaxtooltip.positiontip($tooltip, e)
					ajaxtooltip.showtip($tooltip, e)
					$tooltip.get(0).loadsuccess=true
				});
			} else {
				ajaxtooltip.positiontip($tooltip, e)
				ajaxtooltip.showtip($tooltip, e)
			}
		}, 200);
	}).live('mouseleave', function(e){ //mouseleave element
		clearTimeout(shopPars.timeId);
		var $tooltip=tooltips[parseInt(this.titleposition)];
		//alert('mouseleave'+shopPars.context.titleposition);
		ajaxtooltip.removetip($tooltip, e);
	}).live("mousemove", function(e){
		var $tooltip=tooltips[parseInt(this.titleposition)]
		ajaxtooltip.positiontip($tooltip, e)
	});

	getShopsNextPage = function() {
		$.get("/shops", {"category":"Dining","fields": "shopwebsite shopname shoplogo", "start": shopPars.id * 20, "limit": (shopPars.id + 2) * 20}, function(data) { 
        	$('#shopsBody').append(data);
        	shopPars.id++; 
    	}); 
	};

	$(window).scroll(function() {	
		var bh = $(document).height();
		var wh = $(window).height();
		var st = $(window).scrollTop();
		//alert('bodyHeight: ' + bh + ', windowHeight: ' + wh + ', scrollTop: ' + st);
		if ((wh + st) >= bh) {
		 	getShopsNextPage();
		}		
	});
});