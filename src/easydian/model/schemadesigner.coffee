#desc:
###
  put all the shops into one collection, which is called 'shops'
  e.g:
  @shop_model = Mongoose.model('shops',@shop_schema)
###

Mongoose = require "mongoose"
Schema = Mongoose.Schema
Mongoose.connect "mongodb://127.0.0.1:27017/shops"

class SchemaDesigner
  
  constructor: () ->  
	  @shop_schema = new Schema({
       shopname : {type:String, default:'fullname'},
       shopalias : [{type:String, default:'short name'}],
       shopvisit : {type:Number, default:1000},
       shoppriority : {type: Number, default:1000},
       shopwebsite: {type:String, default: 'fullurl'},
       shopphone: {type:Array, default: ['010-22222222']},
       shoponbusiness: {type:Boolean, default: true},
       shopweekstats: {
         monday:   {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
         tuesday:  {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
         wednesday:{type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
         thurday:  {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
         friday:   {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
         saturday: {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
         sunday:   {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
         weekday:{type:Array, default:[0,0,0,0,0]},
         weekdaygood:{type:Array, default:[0,0,0,0,0]},
         weekdaybad:{type:Array, default:[0,0,0,0,0]},
       },
       shopdaystats:{type:Array,default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
       shopmonthstats: {type:Array,default:[0,0,0,0,0,0,0,0,0,0,0,0]},      
       shoplogo: {type:String, default: './images/default.jpg'},
       shopgoodt: {type:Number, default:0},
       shopbadt: {type:Number, default:0},
       shopcover:{type:Array, default: ['beijing','shanghai']},
       shopaccount: {type:Number, default:0}, 
       shopcreatetime: {type:Date, default: Date.now},
       shopcomments: {type:Array, default: ['good commnets']},
       shopnews: {type:Array, default: ['good news']},
    })
    @shop_model = Mongoose.model('shops',@shop_schema)
    @conn = Mongoose.connection
    @conn.on 'error', console.error.bind console, 'connection error:'
    @conn.once 'open', ()->
      logger.info "success to open mongodb"
    return

  insert_shop: (shop) ->
    logger.info "begin to insert_shop"
    shop_doc = new @shop_model shop
    shop_doc.save (err,doc)->
      logger.info "insert_shop: " + err  if err?
      logger.info "insert_shop: " + doc

  find: (condition, fields, callback) ->
    if not callback?
      @shop_model.find condition, fields, (err, docs)=>
        logger.info "find: " + err if err?
        @cachedata = docs
    else  
      @shop_model.find condition, fields, callback
   




    





module.exports = SchemaDesigner
