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

            if (!($(document.body).length > 0)) {
                easyUtils.reset_layout($(document.body));
            }

            if (widget) {
                if (widget === 'dishes') {
                    steal('/apps/dishes/dishes.js', function () {
                        //$('#page_container').empty();
                        new Apps.DishesCtrl($(document.body));
                    });
                }
                else if (widget === 'login') {
                    steal('/apps/login/login.js', function () {
                        //$('#page_container').empty();
                        new Apps.LoginCtrl($(document.body));
                    });
                }
                else {
                    //window.location = '';
                }

            } else {
                steal('/apps/layout/layout.js', function () {
                    //$('#page_container').empty();
                    new Apps.LayoutCtrl($(document.body));
                });
            }
        }
    });