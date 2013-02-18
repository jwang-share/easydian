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
         weekdaybad:[0,0,0,0,0]
       },
       shopdaystats:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
       shopmonthstats:[0,0,0,0,0,0,0,0,0,0,0,0],      
       shoplogo: {type:String, default: 'relative path'},
       shopgoodt: {type:Number, default:0},
       shopbadt: {type:Number, default:0},
       shopcover:[ {type:String, default: 'beijing'}],
       shopnews: Buffer,
       shopaccount: {type:Number, default:0}, 
       shopcreatetime: {type:Date, default: Date.now},
       shopcomments: [ {body:String, date: Date}],
       shopnews: [ 
         {type:String, default: 'full name 1'},
         {type:String, default: 'full name 2'},
         {type:String, default: 'full name 3'},
         {type:String, default: 'full name 4'},
         {type:String, default: 'full name 5'},
         {type:String, default: 'full name 6'},
         {type:String, default: 'full name 7'}
       ]
    });

    insertshopschema: ()->