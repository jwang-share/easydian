SchemaDesigner = require("../lib/easydian/model/schemadesigner")
require('../lib/easydian/config')

describe("Schma Designer",function(){
  
  var sd;
  beforeEach(function(){
    sd = new SchemaDesigner();
  });
  afterEach(function(){
    sd = undefined;
  });

  it("constructor: can create an instance",function(){
    expect(typeof sd.shop_schema).toEqual("object");
  });

  it("insert_to_db: can open mongodb connection",function(){
    sd. insert_to_db();
  });

})
