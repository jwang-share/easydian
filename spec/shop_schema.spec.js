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
            //logger.info(docs[one]); 
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
    sd.update_shop_account(ExistID, 1900);
   });
   waits(200);
   runs(function(){
    var callback = function(doc){
      expect(doc.shopaccount).toEqual(1900);
    };
    var fields = "shopaccount";
    sd.get_shop_by_id(ExistID, fields, callback);
   });
   waits(300);
  });

  it("update_visit: visit, priority, stats will be updated",function(){
    var visit, prio, wd, sds, sms,sws;
    var visit1, prio1, wd1, sds1, sms1,sws1;
    var curtime = new Date();
    var day = curtime.getDay();
    var hour = curtime.getHours() - 1; //0->23
    var month = curtime.getMonth();
    var fields = "shopvisit shopweekstats weekday shopdaystats shoppriority shopmonthstats"
    runs(function(){
      var callback = function(doc){
        visit = doc.shopvisit;
        sws = doc.shopweekstats[day][hour];
        wd = doc.weekday[day];
        sds = doc.shopdaystats[hour];
        prio = doc.shoppriority;
        sms = doc.shopmonthstats[month];       
      };
      sd.get_shop_by_id(ExistID, fields, callback);
    })
    waits(300);
    runs(function(){
      sd.update_visit(ExistID);
    });
    waits(500);
    runs(function(){
      var callback = function(doc){
        sws1 = doc.shopweekstats[day][hour];
        wd1 = doc.weekday[day];
        sds1 = doc.shopdaystats[hour];
        prio1 = doc.shoppriority;
        sms1 = doc.shopmonthstats[month];
        visit1 = doc.shopvisit;
      };
      sd.get_shop_by_id(ExistID, fields, callback);
    })
    waits(300);
    runs(function(){
      expect(sws).toEqual(sws1-1);
      expect(wd).toEqual(wd1-1);
      expect(sds).toEqual(sds1-1);
      expect(prio).toEqual(prio1-1);
      expect(sms).toEqual(sms1-1);
      expect(visit).toEqual(visit1-1);
    });

  });

  it("update_badgood",function(){
    var curtime = new Date();
    var day = curtime.getDay();
    var fields = "weekdaygood shoppriority shopgoodt shopbadt weekdaybad";
    runs(function(){
      var callback = function(){
        
      };
      sd.get_shop_by_id(ExistID, fields, callback);
    });
    waits(300);
    runs(function(){

    });
    waits(300);
    runs(function(){

    });
  });


})
