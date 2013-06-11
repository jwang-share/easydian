steal(
    'superfish',
    'header-footer',
    '/models/canyin.js',
    '/models/canyin_fixture.js'
)
.then(function() {
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
                Models.Canyin.ads(function(data){
                    element.append(can.view(layout_ejs_dir  + 'slider.ejs', {'ads': data}));
                })
            ).then(function(){
                //Slider
                $('#camera_wrap_1').camera({height: '30%'}); 
            });
        },
        get_current_user: function(current_user) {
            return defaults.current_user;
        }
    });
});