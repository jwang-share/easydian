can.Control('Apps.RoutingCtrl', {
        pluginName: 'routing'
    },
    {
        'route': function(data) {
            this.handle_route(data);
        },
        ':widget route': function(data) {
            this.handle_route(data);
        },
        ':widget/:sub route': function( data ) {
            alert('data: ' + data)
            this.handle_route(data);
        },
        handle_route: function(data){
            var widget = data['widget'];
            var sub    = data['sub'];
            app_state.attr('route', {'widget': widget, 'sub': sub});
            if(widget) {
                alert('widget: ' + widget)
                steal('/apps/layout/layout.js', function() {
                    new Apps.LayoutCtrl(document.body);
                });
                //window.location = '';
            } else {
                steal('/apps/layout/layout.js', function() {
                    new Apps.LayoutCtrl(document.body);
                });
            }
        }
});