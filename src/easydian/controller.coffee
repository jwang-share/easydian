

class Controller
  constructor: () ->
    # get, post, delete, put
    @routes = [
      {path: "/",     http_method: "get",   method: "index" },
      {path: "/index",     http_method: "get",   method: "index" },
      {path: "/stats",    http_method: "get",   method: "stats" },
      {path: "/comment/:id",    http_method: "get",   method: "comment"},
      {path: "/shopchartview/:id",    http_method: "get",   method: "api_shopchartview"}, 
      {path: "/contact",    http_method: "get",   method: "contact"},
      {path: "/shops",    http_method: "get",   method: "api_shops"},
      {path: "/shopviewtmpl/:id",    http_method: "get",   method: "api_shopviewtmpl"},
      {path: "/welcome",    http_method: "get",   method: "api_welcome"},
      {path: "/password",    http_method: "get",   method: "api_password"},
      {path: "/shopcomment/:id",    http_method: "get",   method: "api_shopcomment"},
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
  api_shopchartview: (req, res) ->
    res.render('shopchartview', { title: 'Shop Chart View', id: req.params.id }); 

  #show the contact information
  contact: (req, res) ->
    res.render('contact', { title: 'Contact information' });
  
  api_shop: (req, res) ->
    res.json {
      commentGood: [10, 120, 230, 340, 350, 360],
      commentBad: [115, 25, 135, 245, 255, 365]    
    };  

  api_shops: (req, res) ->
    data = { title: 'Easy Sou', shops: [{shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop5'}, 
      {shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop6'},
      {shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop7'},
      {shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop8'}] };
    res.render('shops', data); 

  api_welcome: (req, res) ->
    res.render('welcome', {title: 'Welcome(Login)'}); 

  api_password: (req, res) ->
    res.render('password', {title: 'Reset Password'}); 

  api_shopcomment: (req, res) ->
    res.render('shopcomment', {title: 'Reset Password', id: req.params.id});     

  api_shopviewtmpl: (req, res) ->   
    data = { title: 'Easy Sou', shops: [{shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop' + (req.params.id + 1)}, 
      {shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop' + (req.params.id + 2)},
      {shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop' + (req.params.id + 3)},
      {shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop' + (req.params.id + 4)}] };      
    res.render('shopviewtmpl', data); 

module.exports = Controller