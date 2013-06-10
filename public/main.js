steal(
    'jquery'
)
.then(
    'jquery-migrate',
    'canjs'
)
.then(
    'can_control', 'can_fixture', 'jquery-color',
    'bootstrap', 'cookie', 'lang_json', 'camera',
    'jquery-validation', 'bootstrap', 'superfish',
    'jquery-mobile', 'jquery-easing', 'prettify',
    'sorting', 'jquery-isotope', 'jquery-tweet', 
    'easy-utils'
)
.packages('/apps/layout/layout.js')
.then('/apps/routing/routing.js')
.then(function() {
    // restore the globe states from sessionStorage
    if (!window.sessionStorage ) {
        window.sessionStorage = {}; // make it compatible for non-HTML5 browsers
    }

    // app_state stores the application states so it can be refered globally
    if(!window.app_state){
        var old_state =  window.sessionStorage["app_state"];
        if(!old_state || old_state.length == 0){
            old_state = "{}";
        }

        window.app_state = new can.Observe(JSON.parse(old_state));
        app_state.bind( 'change', function( ev, attr, how, newVal, oldVal ) {
           window.sessionStorage["app_state"] = JSON.stringify(window.app_state._data.valueOf());
        });
    }
    // create a route
    can.route( ':widget/:sub' );
    // create routing control
    new Apps.RoutingCtrl(document.body);  
})
.then(
    '/css/css.css',
    '/css/camera.css',
    '/css/bootstrap.css',
    '/css/bootstrap-responsive.css',
    '/css/theme.css',
    '/css/docs.css',
    '/lib/prettify/prettify.css'
)