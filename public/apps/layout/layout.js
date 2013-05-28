can.Control('Apps.LayoutCtrl', {
    pluginName: 'layout',
    defaults: {
        current_user: null
    }
},
{
    init: function(element, options) {
        var ejs_dir = '/apps/layout/ejs/';
        this.element.html(can.view(ejs_dir + 'template.ejs'));
        $('.header').html(can.view(ejs_dir  + 'header.ejs'));
        $('#footer').html(can.view(ejs_dir  + 'footer.ejs'));    
    },
    get_current_user: function(current_user) {
        return defaults.current_user;
    }
});