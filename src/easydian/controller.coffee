
Shop_Schema = require "model/shop_schema"
Userinfo_Schema = require "model/userinfo_schema"
Comment_Schema = require "model/comment_schema"
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
      {path: "/register",       http_method: "post",  method: "register_user"},
      {path: "/login/:id",      http_method: "get",   method: "login_user"},
      {path: "/logout/:id",     http_method: "get",   method: "logout_user"}
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
        res.json 400, {"insert":"failed"}
    else
      res.json {"error": "Invalid shop information"}

  validate_field: (req, res) ->
    table = req.params.table #shop / user
    field = req.params.field
    value = req.params.value
    if table? and field? and value?
      result = @ca.validate_field table, field, value
      res.json result
    else
      res.json 400, {"error":"bad request"}
  
  update_goodbad_value: (req, res) ->
    id = req.params.id
    category = req.params.category 
    type = req.params.type
    if @ca.validate_category category 
      num = @ss.update_badgood id, type
      if num is -1
        res.json 400, {"error": "failed to update"}
      else
        res.json {"value", num}
    else
     res.json 400, {"error":"Invalid category"}

  #should be supported
  get_gps: (req,res) ->
    id = req.params.id
    category = req.params.category 
    if @ca.validate_category category 
      
    else
      res.json 400, {"error":"Invalid category"}
   
  register_user: (req, res) ->
    userinfo = req.body
    if @ca.validate_username userinfo.username
      if @us.insert_user userinfo is true
         res.json {"info":"ok"}
      else
        res.json 400, {"error":"failed to register"}
    else
      res.json 400, {"error":"This name is already exist"}
   
   #next
  login_user: (req, res) ->
   #next 
  logout_user: (req, res) ->






module.exports = Controller
























 


  
  

module.exports = Controller