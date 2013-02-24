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
  doc.shopweekstats.monday[0] = 10;
  doc.shopdaystats[0] = 1000;
  doc.shoplogo = "./images/kfc_0.jpg";
  doc.shopcreatetime = new Date;

  it("constructor: can create an instance",function(){
    expect(typeof sd.shop_schema).toEqual("object");
    expect(typeof sd.shop_model).toEqual("function");
    expect(typeof sd.conn).toEqual("object");
    waits(500);
  });
  
  xit("insert_shop: can insert shop to mongodb",function(){
    logger.info ("begin: insert_shop");
     runs(function(){
       sd.insert_shop(doc)
     });
     waits(500)
    
  });

  xit("find: can find docs from db",function(){
    
  });


})
