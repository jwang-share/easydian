
shop_controller = require './shop_controller'

class banjia_controller extends shop_controller
  constructor: () -> super("banjia")
  get_route:() ->
    route = [
      {path:"/banjia/shops",             http_method: "get",    method:"get_shops"},
      {path:"/banjia/shop/:id",          http_method: "get",    method:"get_shop_info"},
      {path:"/banjia/shop/:id/visit",    http_method: "put",    method:"update_visit_num"},
      {path:"/banjia/shop",              http_method: "post",   method:"insert_shop"},
      {path:"/banjia/shop/:id",          http_method: "put",    method:"update_shop"},
      {path:"/banjia/shop/:id",          http_method: "delete", method:"delete_shop"},
      {path:"/banjia/shop/:id/good",     http_method: "put",    method:"update_good_value"},
      {path:"/banjia/shop/:id/bad",      http_method: "put",    method:"update_bad_value"},
      {path:"/banjia/shop/:id/comments", http_method: "get",    method:"get_comments"},
      {path:"/banjia/shop/:id/comment",  http_method: "post",   method:"insert_comment"},
      {path:"/banjia/shop/:id/comment",  http_method: "put",    method:"update_comment"},
      {path:"/banjia/shop/:id/comment",  http_method: "delete", method:"delete_comment"},
      {path:"/banjia/shop/:id/news",     http_method: "get",    method:"get_news"}
    ]
    return route




module.exports = banjia_controller