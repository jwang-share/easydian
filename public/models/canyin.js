can.Model("Models.Canyin", {
    findAll: 'GET     /canyin/shops',
    findOne: 'GET     /canyin/shop/{id}',
    create : 'POST    /canyin/shop',
    update : 'PUT     /canyin/shop/{id}',
    destroy: 'DELETE  /canyin/shop/{id}'
    visit: function(id) {
        return can.ajax({
            url:  '/canyin/shop/' + id + '/visit',
            type: 'put'
        });
    },
    add_comment_bad: function(id) {
        return can.ajax({
            url:  '/canyin/shop/' + id + '/bad',
            type: 'put'
        });
    },
    add_comment_good: function(id) {
        return can.ajax({
            url:  '/canyin/shop/' + id + '/good',
            type: 'put'
        });
    },
    comments: function(id, params) {
        var self = this;
        return can.ajax({
            url:  '/canyin/shop/' + id + '/comments',
            type: 'get',
            dataType: 'json',
            data: params
        });
    }, 
    add_comment: function(id, data) {
        var self = this;
        return can.ajax({
            url:  '/canyin/shop/' + id + '/comment',
            type: 'post',
            dataType: 'json',
            data: data
        });
    },
    update_comment: function(id, data) {
        var self = this;
        return can.ajax({
            url:  '/canyin/shop/' + id + '/comment',
            type: 'put',
            dataType: 'json',
            data: data
        });
    }, 
    delete_comment: function(id, data) {
        var self = this;
        return can.ajax({
            url:  '/canyin/shop/' + id + '/comment',
            type: 'delete',
            dataType: 'json',
            data: data
        });
    }, 
    news: function(id, params) {
        var self = this;
        return can.ajax({
            url:  '/canyin/shop/' + id + '/news',
            type: 'get',
            dataType: 'json',
            data: params
        });
    }          
}, {
    init : function() {
        var self = this;
        self.attr('test', Apps.canyinData.test);
        //TODO get from server
        // $.ajax({
        // url : "/test",
        // async : false,
        // dataType : "json",
        // success : function(data) {
        // self.attr('test', data);
        //}
        // });
    }
});

