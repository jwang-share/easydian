
shop_controller = require './shop_controller'

class dishes_controller extends shop_controller
  constructor: () -> super("dishes")

  get_route:() ->
    route = [
      {path:"/dishes",             http_method: "get",    method:"get_shops"},
      {path:"/dishes/:id",          http_method: "get",    method:"get_shop_info"},
      {path:"/dishes",              http_method: "post",   method:"insert_shop"}
    ]
    return route

module.exports = dishes_controller