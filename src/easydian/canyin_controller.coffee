

class canyin_controller extends base_controller
  constructor: () -> super("canyin")

  get_route:() ->
    route = [
      {path:"/canyin/shops",             http_method: "get",    method:"get_shops"},
      {path:"/canyin/shop/:id",          http_method: "get",    method:"get_shop_info"},
      {path:"/canyin/shop/:id/visit",    http_method: "put",    method:"update_visit_num"},
      {path:"/canyin/shop",              http_method: "post",   method:"insert_shop"},
      {path:"/canyin/shop/:id",          http_method: "put",    method:"update_shop"},
      {path:"/canyin/shop/:id",          http_method: "delete", method:"delete_shop"},
      {path:"/canyin/shop/:id/good",     http_method: "put",    method:"update_good_value"},
      {path:"/canyin/shop/:id/bad",      http_method: "put",    method:"update_bad_value"},
      {path:"/canyin/shop/:id/comments", http_method: "get",    method:"get_comments"},
      {path:"/canyin/shop/:id/comment",  http_method: "post",   method:"insert_comment"},
      {path:"/canyin/shop/:id/comment",  http_method: "put",    method:"update_comment"},
      {path:"/canyin/shop/:id/comment",  http_method: "delete", method:"delete_comment"},
      {path:"/canyin/shop/:id/news",     http_method: "get",    method:"get_news"}
    ]
    return route