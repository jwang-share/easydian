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

            if (!($('#page_container').length > 0)) {
                easyUtils.reset_layout($(document.body));
            }

            if (widget) {
                if (widget === 'dishes') {
                    steal('/apps/dishes/dishes.js', function () {
                        if (sub !== 'praise' && sub !== 'collect' && sub !== 'criticize')
                            $('#page_container').empty();
                        new Apps.DishesCtrl($('#page_container'), {page: sub});
                    });
                }
                else if (widget === 'dish_comment') {
                    steal('/apps/dishes/comment/comment.js', function () {
                        if (sub !== 'destroy' && sub !== 'create' && sub !== 'update')
                            $('#page_container').empty();
                        new Apps.DishCommentCtrl($('#page_container'), {page: sub});
                    });
                }
                else if (widget === 'login') {
                    steal('/apps/login/login.js', function () {
                        $('#page_container').empty();
                        new Apps.LoginCtrl($('#page_container'));
                    });
                }
                else {
                    //window.location = '';
                }

            } else {
                steal('/apps/layout/layout.js', function () {
                    $('#page_container').empty();
                    new Apps.LayoutCtrl($('#page_container'));
                });
            }
        }
    });