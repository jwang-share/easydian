can.Control('Apps.RoutingCtrl', {
        pluginName: 'routing'
    },
    {
        'route': function (data) {
            this.handle_route(data);
        },
        ':widget route': function (data) {
            this.handle_route(data);
        },
        ':widget/:sub route': function (data) {
            this.handle_route(data);
        },
        handle_route: function (data) {
            var widget = data['widget'];
            var sub = data['sub'];
            app_state.attr('route', {'widget': widget, 'sub': sub});
            
            var container = $('#container');

            if (!(container.length > 0)) {
                easyUtils.reset_layout($(document.body));
                container = $('#container')
            }

            if (widget) {
                if (widget === 'dishes') {
                    steal('/apps/dishes/dishes.js', function () {
                        container.empty();
                        new Apps.DishesCtrl(container);
                    });
                }
                else if (widget === 'login') {
                    steal('/apps/login/login.js', function () {
                        container.empty();
                        new Apps.LoginCtrl(container);
                    });
                }
                else {
                    //window.location = '';
                }

            } else {
                steal('/apps/layout/layout.js', function () {
                    container.empty();
                    new Apps.LayoutCtrl(container);
                });
            }
        }
    });