
Shop_Schema = require "model/shop_schema"
Userinfo_Schema = require "model/userinfo_schema"
Comment_Schema = require "model/userinfo_schema"
Controller_Assisstant = require "controller_assisstant"

class Controller
  constructor: () ->
    # get, post, delete, put
    @routes = [
      {path: "/",               http_method: "get",   method: "index" },
      {path: "/index",          http_method: "get",   method: "index" },
      {path: "/shops",          http_method: "get",   method: "get_shops" },
      {path: "/comment",        http_method: "post",  method: "insert_comment"},
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
    ]
    @ss = Shop_Schema();
    @us = Userinfo_Schema();
    @cs = Comment_Schema();
    @ca = Controller_Assisstant();
    return
    
   
  #show the shops
  index: (req, res) ->    
    res.render 'index.ejs' 

  get_shops: (req, res) ->
    category = req.params.category
    start = req.params.start || 0
    limit = req.params.limit || 0
    
    if @ca.validate_category category 
      @ss.get_shops category, start, limit, (err, docs)=>
        if not err?
          if docs?.length > 0
            res.json docs
          else
            res.json 404, {"error": "Did not find any shops"}
        else   
          res.json 400, {"error":err}
    else
      res.json 400, {"error":"Invalid category"}


  insert_comment: (req, res) ->
    category = req.params.category
    comment = req.body
    vca = @ca.validate_category category
    vco = @ca.validate_comment comment
    if vca and vco
      @cs.insert_comment comment, category, (err) ->
        if not err?
          res.json {insert: "success"}
        else
          res.json 400, {insert: "failed"}
    else
      res.json 400, {"error":"Please try again"}


  update_visit_num: (req,res) ->
    id = req.params.id
    visit = @ss.update_visit id
    if visit isnt -1
      res.json {"visit": visit}
    else
      res.json 400, {"error": "failed to update visit number"}

  insert_shop: (req, res) ->
    shopinfo = req.body
    if @ca.validate_shop shopinfo
      if @ss.insert_shop shopinfo
        res.json {"insert":"success"}
      else
        res.json {"insert":"failed"}
    else
      res.json 400, {"error": "Invalid shop information"}
      
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
























 


  
  

module.exports = Controller