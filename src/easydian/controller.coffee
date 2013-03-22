

class Controller
  constructor: () ->
    # get, post, delete, put
    @routes = [
      {path: "/",               http_method: "get",   method: "index" },
      {path: "/index",          http_method: "get",   method: "index" },
      {path: "/shops",          http_method: "get",   method: "get_shops" },
      {path: "/comment/:id",    http_method: "post",  method: "insert_comment"},
      {path: "/visit/:id",      http_method: "put",   method: "update_visit_num"},
      {path: "/shop",           http_method: "post",  method: "insert_shop"},
      {path: "/field",          http_method: "put",   method: "update_field"},
      {path: "/validate_field", http_method: "get",   method: "validate_field"},
      {path: "/goodbad/:id",    http_method: "put",   method: "update_goodbad_value"},
      {path: "/gps/:id",        http_method: "get",   method: "get_gps"},
      {path: "/register",       http_method: "post",  method: "register_user"},
      {path: "/login/:id",      http_method: "get",   method: "login_user"},
      {path: "/logout/:id",     http_method: "get",   method: "logout_user"},
      {path: "/new_category",   http_method: "post",  method: "insert_category"},
      {path: "/category",       http_method: "get",   method: "get_categories"},
      {path: "/category",       http_method: "put",   method: "update_category"},
      {path: "/col_num",        http_method: "put",   method: "update_col_num"},
      {path: "/col_num",        http_method: "get",   method: "get_col_num"},
      {path: "/item_visit/:id", http_method: "put",   method: "update_item_visit"},
      {path: "/item_visit",     http_method: "get",   method: "get_item_visit"},
      {path: "/header",         http_method: "put",   method: "update_header"},
      {path: "/header",         http_method: "get",   method: "get_header"}
    ]
    @sd = {}
    
   
  #show the shops
  index: (req, res) ->    
    res.render 'index.ejs' 

  get_shops: (req, res) ->
    category = req.params.category
    start = req.params.start
    end = req.params.end
    limit = req.params.limit
    #add validaton here
    @sd.get_shops category, start, end, limit, (err, docs)=>
      if err?
        res.json 400, {"error":"error when reading data from DB"}
      else
        res.json docs


  insert_comment: (req, res) ->

  update_visit_num: (req,res) ->

  insert_shop: (req, res) ->

  update_field: (req, res) ->

  validate_field: (req, res) ->

  update_goodbad_value: (req, res) ->

  get_gps: (req,res) ->

  register_user: (req, res) ->

  login_user: (req, res) ->

  logout_user: (req, res) ->

  insert_category: (req, res) ->

  get_categories: (req, res) ->

  update_category: (req, res) ->

  update_col_num: (req, res) ->

  get_col_num: (req, res) ->

  get_item_visit: (req, res) ->

  update_item_visit: (req, res) ->

  update_header: (req, res) ->

  get_header: (req, res) ->
























 


  
  

module.exports = Controller