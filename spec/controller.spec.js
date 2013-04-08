var Controller = require("../lib/easydian/controller")
require('../lib/easydian/config')

describe("Controller",function(){
  
  var cs = new Controller();
  var ExistID = '514b0e2c8b4309c20a000001';
  var req = {};
  var params = {};
  var res = {};
  
  it("contructor: can create an instance",function(){
    expect(typeof cs.ss).toEqual("object");
    expect(typeof cs.us).toEqual("object");
    expect(typeof cs.ns).toEqual("object");
    expect(typeof cs.ca).toEqual("object");
    waits(100);
  });
 
  // just have the simplest unit test right now
  it("get_shops: can get a number of shops",function(){
     runs(function(){
       params.start = 0;
       params.limit = 4;
       params.category = "Dining";
       params.fields = "shopname shoplogo";
       req.params = params;
       res.json = function(docs)
       {
        //console.log(docs);
        expect(docs.length).toEqual(4);
       }
       cs.get_shops(req, res);       
     });
     waits(100);
     
  });

  it("get_shop_info: can get shop detail",function(){
    params.id = ExistID;
    params.start = 0;
    params.limit = 5;
    params.category = "Dining";
    params.news = 0;
    params.comments = 0;
    params.fields = "shopname shoplogo shopwebsite";
    runs(function(){
      res.json = function(){
        
      };
    });
    waits(100);

  });

  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });
  
  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });
  
  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });
  
  it("",function(){

  });
})