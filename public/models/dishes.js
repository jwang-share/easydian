can.Model("Models.Dishes", {
    findAll: 'GET     /dishes',
    findOne: 'GET     /dishes/{id}',
    create : 'POST    /dishes',
    update : 'PUT     /dishes/{id}',
    destroy: 'DELETE  /dishes/{id}'
}, {
    init : function() {
        var self = this;
        self.attr('data', Apps.DishesData);
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
