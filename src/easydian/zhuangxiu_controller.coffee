

class zhuangxiu_controller extends shop_controller
  constructor: () -> super("zhuangxiu")
  get_route:() ->
    route = [
      {path:"/zxiu/shops",             http_method: "get",    method:"get_shops"},
      {path:"/zxiu/shop/:id",          http_method: "get",    method:"get_shop_info"},
      {path:"/zxiu/shop/:id/visit",    http_method: "put",    method:"update_visit_num"},
      {path:"/zxiu/shop",              http_method: "post",   method:"insert_shop"},
      {path:"/zxiu/shop/:id",          http_method: "put",    method:"update_shop"},
      {path:"/zxiu/shop/:id",          http_method: "delete", method:"delete_shop"},
      {path:"/zxiu/shop/:id/good",     http_method: "put",    method:"update_good_value"},
      {path:"/zxiu/shop/:id/bad",      http_method: "put",    method:"update_bad_value"},
      {path:"/zxiu/shop/:id/comments", http_method: "get",    method:"get_comments"},
      {path:"/zxiu/shop/:id/comment",  http_method: "post",   method:"insert_comment"},
      {path:"/zxiu/shop/:id/comment",  http_method: "put",    method:"update_comment"},
      {path:"/zxiu/shop/:id/comment",  http_method: "delete", method:"delete_comment"},
      {path:"/zxiu/shop/:id/news",     http_method: "get",    method:"get_news"}
    ]
    return route