steal(
    'highcharts',
    '/css/prettyPhoto.css',
    'jquery-prettyPhoto',
    'jquery-preloader',
    '/models/canyin.js',
    '/models/canyin_fixture.js', 
    'header-footer'
)
.then('highcharts-exp')
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
            var canyin_ejs_dir = '/apps/canyin/ejs/';
            var layout_ejs_dir = '/apps/layout/ejs/';
            this.element.html(can.view(layout_ejs_dir + 'template.ejs'));

            $('#header').html(can.view(layout_ejs_dir  + 'header.ejs'));

            var $page_container = $('#page_container');
            if(options.canyin == undefined) {
                can.when(
                    Models.Canyin.ads(function(data){
                        $page_container.append(can.view(layout_ejs_dir  + 'slider.ejs', {'ads': data}));
                    })
                ).then(function(){
                    //Slider
                    $('#camera_wrap_1').camera({height: '20%'}); 
                });

                can.when(
                    Models.Canyin.findAll({}, function(data){
                        $page_container.append(can.view(canyin_ejs_dir  + 'container.ejs', {'shops': data}));
                    })
                ).then(function(){
                    //High Charts
                    create_chart_view = function() {
                        $('#canyin_chart_view').highcharts({
                            chart: {
                                type  : 'spline',
                                height: 200,
                                width : 500
                            },
                            title: {
                                text: 'Weekly Comments Record'
                            },
                            legend: {
                                enabled: false
                            },
                            subtitle: {
                                text: 'Source: easydian.com'
                            },
                            xAxis: {
                                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                    'Jul']
                            },
                            yAxis: {
                                title: {
                                    text: 'Comments'
                                },
                                labels: {
                                    formatter: function() {
                                        return this.value +'°'
                                    }
                                }
                            },
                            tooltip: {
                                crosshairs: true,
                                shared: true
                            },
                            plotOptions: {
                                spline: {
                                    marker: {
                                        radius: 4,
                                        lineColor: '#666666',
                                        lineWidth: 1
                                    }
                                }
                            },
                            series: [{
                                name: 'Tokyo',
                                marker: {
                                    symbol: 'square'
                                },
                                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, {
                                    y: 26.5,
                                    marker: {
                                        symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
                                    }
                                }]
                    
                            }, {
                                name: 'London',
                                marker: {
                                    symbol: 'diamond'
                                },
                                data: [{
                                    y: 3.9,
                                    marker: {
                                        symbol: 'url(http://www.highcharts.com/demo/gfx/snow.png)'
                                    }
                                }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0]
                            }]
                        });               
                    };
                    clear_chart_view = function() {
                        Apps.CanyinCtrl.defaults.current_chart = null;
                        easyUtils.recover_element($('#inline_canyin_chart_view'), 'canyin_chart_view');
                    };
                    remove_chart_view = function() {
                        $('#inline_canyin_chart_view').empty();
                        create_chart_view();
                        //alert($('#canyin_chart_view').html())
                    };
                    set_chart_view = function(){
                        $('#canyin_chart_view').css({'height':'200px', 'width':'500px'});
                    };
                    //PrettyPhoto
                    $("a[rel^='prettyPhoto']").prettyPhoto({theme:'light_rounded', social_tools: '',                    
                        beforeinlineclonecallback: set_chart_view, 
                        changepicturecallback: remove_chart_view,  
                        callback: clear_chart_view});                
                    //Image hover
                    var $hover_img = $(".hover_img")
                    $hover_img.live('mouseover',function(){                                            
                        var info=$(this).find("img");
                        info.stop().animate({opacity:0.2},300);
                        Models.Canyin.id = info.attr('id');                        
                        $(".preloader").css({'background':'none'});
                    });
                    $hover_img.live('mouseout',function(){
                        var info=$(this).find("img");
                        info.stop().animate({opacity:1},300);
                        $(".preloader").css({'background':'none'});
                    });
                });
            }
            else {
                $page_contaiter.append(can.view(layout_ejs_dir  + 'breadcrumb.ejs', {hash: 'canyin', type: 'Canyin', 'page': 'Comments'}));
                can.when(
                    Models.Canyin.comments({id: 123456}, {}, function(data){
                        $page_contaiter.append(can.view(canyin_ejs_dir  + 'comment.ejs', {'comments': data}));
                    })
                ).then(function(){
                });
            }

            $('#footer').html(can.view(layout_ejs_dir  + 'footer.ejs'));           
        },
        get_current_user: function(current_user) {
            return defaults.current_user;
        }
    });
});