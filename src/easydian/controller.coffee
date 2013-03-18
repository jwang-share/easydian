

class Controller
  constructor: () ->
    # get, post, delete, put
    @routes = [
      {path: "/",     http_method: "get",   method: "index" },
      {path: "/index",     http_method: "get",   method: "index" },
      {path: "/stats",    http_method: "get",   method: "stats" },
      {path: "/comment",    http_method: "post",   method: "comment"}, 
      {path: "/contact",    http_method: "get",   method: "contact"},
      {path: "/shop/:id",    http_method: "get",   method: "api_shop"}
    ]

    
  #show the shops
  index: (req, res) -> 
    res.render('index', { title: 'Easy Sou' });
  #get the info of the shop 
  stats: (req,res) ->
    return

  #req: bad, good
  comment: (req, res) ->
  	return

  #show the contact information
  contact: (req, res) ->
    res.render('contact', { title: 'Contact information' });
  
  api_shop: (req, res) ->
    res.json {
      attentionData: [10,20,30,40,50,60],
      commentGood: [10,20,30,40,50,60],
      commentBad: [15,25,35,45,55,65],
      categories: ['3/1/13', '3/2/13', '3/3/13', '3/4/13', '3/5/13', '3/6/13']
    }  

module.exports = Controller