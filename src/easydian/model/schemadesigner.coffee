Mongoose = require "mongoose"

class SchemaDesigner
  constructor: () ->
	@shop_schema = new Schema({
       shopname : {type:String, default:'fullname'},
       shopvisit : {type:Number, default:1000},
       shoppriority : {type: Number, default:1000},
       shopwebsite: {type:String, default: 'fullurl'},
       shopphone:[
         {type:String, default: '000000000'}
       ],
       shoponbusiness: {type:Boolean, default: true},
       shopextra: {type:Number, default:0},
       shopweekstats: {
         weekhours: [
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]        
         ],
         weekday:[0,0,0,0,0],
         weekdaygood:[0,0,0,0,0],
         weekdaybad:[0,0,0,0,0],
       },
       shopdaystats:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
       shopmonthstats:[0,0,0,0,0,0,0,0,0,0,0,0],      
       shoplogo: {type:String, default: 'relative path'},
       shopgoodt: {type:Number, default:0},
       shopbadt: {type:Number, default:0},
       shopcover:[ {type:String, default: 'beijing'}],
       shopnews: Buffer,
       shopbeside: Boolean,
       shopcreatetime: Date
    });

    insertshopschema: ()->