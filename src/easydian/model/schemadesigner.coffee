Mongoose = require "mongoose"

class SchemaDesigner
  constructor: () ->
	@shop_schema = new Schema({
       shopname : {type:String, default:'fullname'},
       shopvisit : {type:Number, default:1000},
       shoppriority : {type: Number, default:1000},
       shopwebsite: {type:String, default: 'fullurl'},
       shopphone:[
         phone1 : {type:String, default: '000000000'}
       ],
       shoponbusiness: {type:Boolean, default: true},
       shopextra: {type:Number, default:0},
       shopweekvisit: [
         monday: {
         good: {type:Number, default:0},
         bad: {type:Number, default:0},
         totalv: {type:Number, default:0}
         },
         tuesday: {
           good: {type:Number, default:0},
           bad: {type:Number, default:0},
           totalv: {type:Number, default:0}
          },
         wendesday: {
           good: {type:Number, default:0},
           bad: {type:Number, default:0},
           totalv: {type:Number, default:0}
         },
         thursday: {
           good: {type:Number, default:0},
           bad: {type:Number, default:0},
           totalv: {type:Number, default:0}
         },
         friday: {
           good: {type:Number, default:0},
           bad: {type:Number, default:0},
           totalv: {type:Number, default:0}
         },
         saturday: {
           good: {type:Number, default:0},
           bad: {type:Number, default:0},
           totalv: {type:Number, default:0}
         },
         sunday: {
           good: {type:Number, default:0},
           bad: {type:Number, default:0},
           totalv: {type:Number, default:0}
         }
       ],
       shoplogo: {type:String, default: 'relative path'},
       shopgoodt: {type:Number, default:0},
       shopbadt: {type:Number, default:0},
       shopcover:[
             
       ],
       shopday : {},
       shopnews: Buffer,
       shopbeside: Boolean,
       shopcreatetime: Date
    });

    insetshopschema: ()->