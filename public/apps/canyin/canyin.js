steal(
    '/css/prettyPhoto.css',
    'jquery-prettyPhoto',
    'jquery-preloader',
    '/models/canyin.js',
    '/models/canyin_fixture.js',
    'easy-utils',
    'high-charts'
)
.then(function() {
    can.Control('Apps.CanyinCtrl', {
        pluginName: 'canyin',
        defaults: {
            current_user: null,
            current_chart: null
        }
    },
    {
        init: function(element, options) {
            var ejs_dir = '/apps/canyin/ejs/';
            this.element.html(can.view(ejs_dir + 'template.ejs'));
            $('#header').html(can.view(ejs_dir  + 'header.ejs'));
            var $page_contaiter = $('#page_container');
            can.when(
                Models.Canyin.ads(function(data){
                    $page_contaiter.append(can.view(ejs_dir  + 'slider.ejs', {'ads': data}));
                })
            ).then(function(){
                //Slider
                $('#camera_wrap_1').camera({height: '20%'}); 
            });
            can.when(
                Models.Canyin.findAll({}, function(data){
                    $page_contaiter.append(can.view(ejs_dir  + 'container.ejs', {'shops': data}));
                })
            ).then(function(){
                //High Charts
                create_chart_view = function() {
                    Apps.CanyinCtrl.defaults.current_chart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'canyin_chart_view',
                            type: 'line'
                        },
                        credits: {
                            enabled: false,
                            text: 'Detailed Comments >>',
                            href: '#canyin/comment'
                        },
                        title: {
                            text: 'Good/Bad Comments',
                            x: -20 //center
                        },
                        xAxis: {
                            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            title: {
                                text: 'Comments'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            formatter: function () {
                                return 'Week: ' + this.x + '<br/>' + this.series.name  + ': ' + this.y
                            }
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'top',
                            y: 50,
                            borderWidth: 0
                        },
                        series: [{
                            name: 'Good Comments',
                            data: [60, 70, 80, 90, 100, 110, 120]
                        }, {
                            name: 'Bad Comments',
                            data: [15, 25, 35, 45, 55, 65, 75]
                        }]
                    });                
                };
                clear_chart_view = function() {
                    Apps.CanyinCtrl.defaults.current_chart = null;
                    easytUtils.clean_element('canyin_chart_view', 'before');
                };

                //PrettyPhoto
                $("a[rel^='prettyPhoto']").prettyPhoto({theme:'light_rounded', default_width: 400, default_heigh: 250,
                    beforeinlineclonecallback: create_chart_view, allow_resize: false, callback: clear_chart_view});
                
                //Image hover
                var $hover_img = $(".hover_img")
                $hover_img.live('mouseover',function(){                        
                        var info=$(this).find("img");
                        info.stop().animate({opacity:0.2},300);
                        Models.Canyin.id = info.attr('id');                        
                        $(".preloader").css({'background':'none'});
                    }
                );
                $hover_img.live('mouseout',function(){
                        var info=$(this).find("img");
                        info.stop().animate({opacity:1},300);
                        $(".preloader").css({'background':'none'});
                    }
                );
            });
            
            $('#footer').html(can.view(ejs_dir  + 'footer.ejs'));  

            $(document).ready(function(){     
                //build dropdown
                $("<select />").appendTo("nav#main_menu div");
                
                // Create default option "Go to..."s
                $("<option />", {
                   "selected": "selected",
                   "value"   : "",
                   "text"    : "Please choose page"
                }).appendTo("nav#main_menu select");    
                
                // Populate dropdowns with the first menu items
                $("nav#main_menu li a").each(function() {
                    var el = $(this);
                    $("<option />", {
                        "value"   : el.attr("href"),
                        "text"    : el.text()
                    }).appendTo("nav#main_menu select");
                });
                
                //make responsive dropdown menu actually work           
                $("nav#main_menu select").change(function() {
                    window.location = $(this).find("option:selected").val();
                });
                        
                //Twitter Setup
                $(".tweet_block").tweet({
                  join_text: "auto",
                  username: "envato",
                  avatar_size: 0,
                  count: 3,
                  auto_join_text_default: "",
                  auto_join_text_ed: "",
                  auto_join_text_ing: "",
                  auto_join_text_reply: "",
                  auto_join_text_url: "",
                  loading_text: "loading tweets..."
                }); 

                //Iframe transparent
                $("iframe").each(function(){
                    var ifr_source = $(this).attr('src');
                    var wmode = "wmode=transparent";
                    if(ifr_source.indexOf('?') != -1) {
                    var getQString = ifr_source.split('?');
                    var oldString = getQString[1];
                    var newString = getQString[0];
                    $(this).attr('src',newString+'?'+wmode+'&'+oldString);
                    }
                    else $(this).attr('src',ifr_source+'?'+wmode);
                });      

                //Tooltip
                $('.follow_us a').tooltip(); 

                //Flickr Integration
                $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?id=36334875@N04&lang=en-us&format=json&jsoncallback=?", function(data){
                    $.each(data.items, function(i,item){
                        if(i<=11){ // <— change this number to display more or less images
                            $("<img/>").attr("src", item.media.m.replace('_m', '_s')).appendTo(".FlickrImages ul")
                            .wrap("<li><a href='" + item.link + "' target='_blank' title='Flickr'></a></li>");
                        }
                    });         
                });  
            });           
        },
        get_current_user: function(current_user) {
            return defaults.current_user;
        }
    });
});