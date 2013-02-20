Mongoose = require "mongoose"
Schema = Mongoose.Schema
Mongoose.connect "mongodb://admin:admin@127.0.0.1:27017/shops"

class SchemaDesigner
  
  constructor: () ->  
	  @shop_schema = new Schema({
       shopname : {type:String, default:'fullname'},
       shopalias : [{type:String, default:'short name'}],
       shopvisit : {type:Number, default:1000},
       shoppriority : {type: Number, default:1000},
       shopwebsite: {type:String, default: 'fullurl'},
       shopphone:[
         {type:String, default: '000000000'}
       ],
       shoponbusiness: {type:Boolean, default: true},
       shopweekstats: {
         monday:   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         tuesday:  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         wednesday:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         thurday:  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         friday:   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         saturday: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         sunday:   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
    })
    
    return

      
  insert_to_db: () ->
    kittyschema = Schema { name: 'string' }
    Kitten = Mongoose.model 'kitty', kittyschema
    Silence = new Kitten {name:"BeSilence"}
    logger.info Silence.name
    try
      Silence.save (err) ->
        logger.info "error coming" if err
        logger.info "good"
    catch e
      logger.info e
    





module.exports = SchemaDesigner
