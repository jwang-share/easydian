
SchemaDesigner = require "./model/schemadesigner"

class Controller
  constructor: () ->
    # get, post, delete, put
    @routes = [
      {path: "/",     http_method: "get",   method: "index" },
      {path: "/index",     http_method: "get",   method: "index" },
      {path: "/stats",    http_method: "get",   method: "stats" },
      {path: "/comment",    http_method: "post",   method: "comment"}
    ]
    @sd = new SchemaDesigner()
    
   
  #show the shops
  index: (req, res) ->    
    res.render 'index.ejs' 

  #get the info of the shop 
  stats: (req,res) ->
    return

  #req: bad, good
  comment: (req, res) ->
  	return


  
  

module.exports = Controller