SchemaDesigner = require("../lib/easydian/model/schemadesigner")
require('../lib/easydian/config')

describe("Schma Designer",function(){
  
  var sd, doc;
  sd = new SchemaDesigner();
  doc = new sd.shop_model;
  doc.shopname = "Kentucky Fried Chicken";
  doc.shopalias = "KFC";
  doc.shopwebsite = "http://www.kfc.com.cn/kfccda/index.aspx";
  doc.shopphone.push("400-882-3823");
  doc.monday[0] = 11;
  doc.shopdaystats[0] = 1000;
  doc.shoplogo = "./images/kfc_0.jpg";
  doc.shopcreatetime = new Date;

  it("constructor: can create an instance",function(){
    expect(typeof sd.shop_schema).toEqual("object");
    expect(typeof sd.shop_model).toEqual("function");
    expect(typeof sd.conn).toEqual("object");
    waits(500);
  });
  
  it("insert_shop: can insert shop to mongodb",function(){
    logger.info ("begin: insert_shop");
     runs(function(){
       sd.insert_shop(doc)
     });
     waits(500)
    
  });

  it("find_shops: can find docs from db",function(){
    runs(function(){
      var callback = function(err,docs){
        if(err) logger.info(err)
        logger.info("------->"+docs);     
      };
      sd.find_shops(callback);
    });
    waits(500);
    
  });


})
