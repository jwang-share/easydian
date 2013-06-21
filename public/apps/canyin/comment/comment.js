steal(
    'jquery-preloader',
    'superfish',
    'header-footer',
    '/models/canyin.js',
    '/models/canyin_fixture.js'
)
.then(function(){
    can.Control('Apps.CanyinCommentCtrl', {
        pluginName: 'canyin_comment',
        defaults: {
            current_user: null,
            current_user_id: null,
            current_chart: null,
            current_comment_id: null
        }
    },
    {
        init: function(element, options) {
            var self = this;
            var comment_ejs_dir = '/apps/canyin/comment/ejs/';
            var layout_ejs_dir = '/apps/layout/ejs/';
            easyUtils.set_title('Canyin-Comments');

            if(options.page === undefined) {
                if($('div').hasClass('pp_pic_holder'))
                    $.prettyPhoto.close();                
                element.append(can.view(layout_ejs_dir  + 'breadcrumb.ejs', {hash: 'canyin', type: 'Canyin', 'page': 'Comments'}));                
                can.when(
                    Models.CanyinComment.findAll({id: $.cookie("canyin_shop_id")}, function(data){
                        element.append(can.view(comment_ejs_dir  + 'comment.ejs'));
                        $('#post').append(can.view(comment_ejs_dir  + 'post.ejs'));
                        $('#post_comments').append(can.view(comment_ejs_dir  + 'post_comment.ejs', data));
                        $('#sidebar').append(can.view(comment_ejs_dir  + 'sidebar.ejs', {'data': data}));

                        can.when(                        
                            Models.CanyinComment.findAll({id: $.cookie("canyin_shop_id")}, function(data){
                                for(var i = 0; i < data.length; i++){
                                    if(data[i].reply_id.length == 0 || !data[i].inline) continue;
                                    $('#' + data[i].reply_id).append(can.view(comment_ejs_dir  + 'post_inline_comment.ejs', data[i]));
                                }                          
                            })
                        ).then(function(){
                        });                    
                    })
                ).then(function(){                
                });
            }
            else if(options.page === 'destroy') {
                Models.Canyin.comment_destroy($.cookie("canyin_shop_id"), $.cookie("canyin_comment_id"), {}, function(data){
                    if(data) {
                        $('#' + $.cookie("canyin_comment_id")).remove();
                        $.cookie("canyin_comment_id", null);
                    }
                })
            } 
            else if(options.page === 'update') {
                can.when(
                    Models.Canyin.comment_update({id: $.cookie("canyin_shop_id"), comment_id: $.cookie("canyin_comment_id")}, function(data){                        
                    })
                ).then(function(){
                });
            }   
            else if(options.page === 'create') {
                can.when(
                    Models.Canyin.comment_create({id: $.cookie("canyin_shop_id"), comment_id: $.cookie("canyin_comment_id")}, function(data){
                    })
                ).then(function(){
                });
            }

            easyUtils.set_current_menu('menu_canyin');
        },
        'li click': function(element) {
            if(element.attr('id') !== undefined)
                $.cookie("canyin_comment_id", element.attr('id'));
        },   
        get_current_user: function(current_user) {
            return defaults.current_user;
        }
    });
});