can.Control('Apps.LayoutCtrl', {
    pluginName: 'layout',
    defaults: {
        current_user: null
    }
},
{
    init: function(element, options) {
        var layout_ejs_dir = '/apps/layout/ejs/';
        can.when(
            Models.Dishes.findAll({}, function(data){
                element.append(can.view(layout_ejs_dir  + 'slider.ejs', {'data': data}));
            })
        ).then(function(){
        });
    },
    get_current_user: function(current_user) {
        return defaults.current_user;
    }
});