steal(
    'jquery'
)
.then(
    'canjs'
)
.then(
    'can_control', 'can_fixture',
    'bootstrap', 'easy-utils'
)
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
    '/css/bootstrap.css',
    '/css/main.css'
)