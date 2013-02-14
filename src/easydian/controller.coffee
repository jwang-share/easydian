

class Controller
  constructor: () ->
    # get, post, delete, put
    @routes = [
      {path: "/index",     http_method: "get",   method: "index" },
      {path: "/stats",    http_method: "get",   method: "stats" },
      {path: "/comment",    http_method: "post",   method: "comment"}
    ]

    
  #show the shops
  index: (req, res) -> 
    res.render 'index.ejs' 
  #get the info of the shop 
  stats: (req,res) ->
    res.render 'stats.ejs'

  #req: bad, good
  comment: (req, res) ->

  )
  
  

module.exports = Controller