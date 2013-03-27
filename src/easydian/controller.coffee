

class Controller
  constructor: () ->
    # get, post, delete, put
    @routes = [
      {path: "/",     http_method: "get",   method: "index" },
      {path: "/index",     http_method: "get",   method: "index" },
      {path: "/stats",    http_method: "get",   method: "stats" },
      {path: "/comment/:id",    http_method: "get",   method: "comment"},
      {path: "/commentview/:id",    http_method: "get",   method: "api_commentview"}, 
      {path: "/contact",    http_method: "get",   method: "contact"},
      {path: "/shops",    http_method: "get",   method: "api_shops"},
      {path: "/shop/:id",    http_method: "get",   method: "api_shop"}
    ]

    
  #show the shops
  index: (req, res) -> 
    data = { title: 'Easy Sou', shops: [{shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop1'}, 
      {shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop2'},
      {shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop3'},
      {shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop4'}
      {shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop5'}] };
    res.render('index', data);
  #get the info of the shop 
  stats: (req,res) ->
    return

  #req: bad, good
  comment: (req, res) ->
  	res.json {
      comments: ['comment1', 'comment2', 'comment3', 'comment4', 'comment5', 'comment6', 'comment7']   
    }; 

  #req: bad, good
  api_commentview: (req, res) ->
    res.render('commentview', { title: 'Comment View' }); 

  #show the contact information
  contact: (req, res) ->
    res.render('contact', { title: 'Contact information' });
  
  api_shop: (req, res) ->
    res.json {
      commentGood: [10, 120, 230, 340, 350, 360],
      commentBad: [115, 25, 135, 245, 255, 365]    
    };  

  api_shops: (req, res) ->
    data = { title: 'Easy Sou', shops: [{shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop1'}, 
      {shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop2'},
      {shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop3'},
      {shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop4'}
      {shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop5'}] };
    res.render('shops', data); 

module.exports = Controller