var Shop_Schema = require("../lib/easydian/model/shop_schema")
require('../lib/easydian/config')

describe("shop schema",function(){
  
  var sd, doc;
  var ExistID = '514ace690a16f3140c000001';
  sd = new Shop_Schema();
  doc = {
    shopname : 'fullname',
    shopalias : ['short name'],
    shoptype : 'Dining',
    shopvisit : 1000,
    shoppriority : 1000,
    shopwebsite: 'fullurl',
    shopphone:  ['010-22222222'],
    shoponbusiness: true,
    shoponadv: true,
    shopweekstats:[
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],
    weekday:     [0,0,0,0,0,0,0],
    weekdaygood: [0,0,0,0,0,0,0],
    weekdaybad:  [0,0,0,0,0,0,0],
    shopgoodt: 0,
    shopbadt: 10,
    shopdaystats:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    shopmonthstats: [0,0,0,0,0,0,0,0,0,0,0,0],    
    shoplogo: './images/default.jpg', 
    shopcover: ['beijing','shanghai'],
    shopaccount: 0, 
    shopcreatetime: Date.now,
    shopcommentsnum: 0
  };

  doc.shopname = "Kentucky Fried Chicken";
  doc.shopalias.push("KFC");
  doc.shopwebsite = "http://www.kfc.com.cn/kfccda/index.aspx";
  doc.shopphone.push("400-882-3823");
  doc.shopweekstats[0][1] = 550;
  doc.shopweekstats[1][1] = 550;
  doc.shopmonthstats[1] = 1000;
  doc.shoplogo = "./images/kfc_0.jpg";
  doc.shopcreatetime = new Date;
  doc.shopcommentsnum = 10;

  it("constructor: can create an instance",function(){
    expect(typeof sd.shop_schema).toEqual("object");
    expect(typeof sd.shop_model).toEqual("function");
    waits(500);
  });
  
  xit("insert_shop: can insert shop to mongodb",function(){
    logger.info ("begin: insert_shop");
     runs(function(){
       sd.insert_shop(doc)
     });
     waits(500)
    
  });

  it("get_shops: can find docs from db",function(){
    var index = 0;
    var fields = "shopname shoplogo";
    runs(function(){
      var callback = function(err,docs){
        if(err) logger.info(err)
          for (var one in docs){
            logger.info(docs[one]); 
            index = index + 1;
          }      
      }; 
      sd.get_shops("Dining",fields,0,2,callback);
    });
    waits(500);
    runs(function(){
      expect(index).toEqual(2);
    })

  });

  it("get_shop_by_id: get a shop by id", function(){
    runs(function(){
      var callback = function(doc){
        expect(doc._id).toEqual(Mongoose.Types.ObjectId(ExistID));
        expect(doc.shopname).toBeDefined();
        expect(doc.shoplogo).toBeDefined();
        expect(doc.weekdaygood).toBeDefined();
      };
      var fields = "shopname shoplogo weekdaygood";
      sd.get_shop_by_id(ExistID, fields, callback);
    });
    waits(500);
  });

  it("update_shop_account: update shop account", function(){
   runs(function(){
    sd.update_shop_account(ExistID, 500);
   });
   waits(200);
   runs(function(){
    var callback = function(doc){
      expect(doc.shopaccount).toEqual(500);
    };
    var fields = "shopaccount";
    sd.get_shop_by_id(ExistID, fields, callback);
   });
   waits(300);
  });


})
