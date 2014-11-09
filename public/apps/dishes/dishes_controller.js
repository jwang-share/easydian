can.Control('Apps.DishesCtrl', {
    pluginName: 'dishes'
},
{
    init: function(element, options) {
        var self = this;
        //element.append(can.view('/apps/layout/ejs/container.ejs'));
        
        can.when(                
            Models.Dishes.findAll({}, function(data){
                element.append(can.view('/apps/layout/ejs/recommendation.ejs', {'data': data}));
                element.append(can.view('/apps/layout/ejs/shows.ejs', {'data': data}));
            })
        ).then(function(){
        });
    },
    '{window} scroll': function() {
        var self = this;
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
            self.render_shops();
        }
    }
});