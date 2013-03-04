#desc:
###
  put all the shops into one collection, which is called 'shops'
  e.g:
  @shop_model = Mongoose.model('shops',@shop_schema)
  name->index, id->index
###

Mongoose = require "mongoose"
Schema = Mongoose.Schema
#be more graceful here
#Mongoose.connect "mongodb://127.0.0.1:27017/shops"

class SchemaDesigner
  
  constructor: () -> 
    @item_schema = new Schema({item:String})
    @shop_schema = new Schema({
       shopname : {type:String, default:'fullname'},
       shopalias : [{type:String, default:'short name'}],
       shopvisit : {type:Number, default:1000},
       shoppriority : {type: Number, default:1000},
       shopwebsite: {type:String, default: 'fullurl'},
       shopphone: {type:Array, default: ['010-22222222']},
       shoponbusiness: {type:Boolean, default: true},
       shoponadv: {type:Boolean, default: true},
       shopweekstats:[
         {monday:   {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},
         {tuesday:  {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},
         {wednesday:{type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},
         {thurday:  {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},
         {friday:   {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},
         {saturday: {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},
         {sunday:   {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}}
       ]
       weekday:     {type:Array, default:[0,0,0,0,0,0,0]},
       weekdaygood: {type:Array, default:[0,0,0,0,0,0,0]},
       weekdaybad:  {type:Array, default:[0,0,0,0,0,0,0]},
       shopdaystats:{type:Array,default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
       shopmonthstats: {type:Array,default:[0,0,0,0,0,0,0,0,0,0,0,0]},      
       shoplogo: {type:String, default: './images/default.jpg'},
       shopgoodt: {type:Number, default:0},
       shopbadt: {type:Number, default:0},
       shopcover:{type:Array, default: ['beijing','shanghai']},
       shopaccount: {type:Number, default:0}, 
       shopcreatetime: {type:Date, default: Date.now},
       shopcomments: [@item_schema],
       shopnews: [@item_schema]
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


  find_shops: (callback) ->
    @shop_model.find()
    .sort('-shoppriority')
    .select('shoplogo shopname')
    .exec(callback)
   
  update_visit: (id) -> 
    @shop_model.findById id, (err,doc) ->
      logger.info "update_visit.findbyIDd: "+err if err?
      doc.shopvisit = doc.shopvisit + 1
      curtime = new Date()
      day = curtime.getDay()
      hour = curtime.getHour()
      month = curtime.getMonth()
      doc.shopweekstats[day][hour] = doc.shopweekstats[day][hour] + 1
      doc.weekday[day] = doc.weekday[day] + 1
      doc.shopdaystats[hour] = doc.shopdaystats[hour] + 1
      doc.shoppriority = doc.shoppriority + 1
      doc.shopmonthstats[month] = doc.shopmonthstats[month] + 1
      doc.save (err)->
        logger.info "update_visit.save: "+err if err?

  update_badgood: (id) ->
    @shop_model.findById id, (err,doc) ->
      logger.info "update_visit.findbyIDd: "+err if err?
  
  #get all shops' information
  #id, shopname, shoplogo, weekdaygood, shopbadt, shopwebaddress,shoponbusiness,shopwithnew
  get_shops: (callback) ->
    return

  #get the shop's detail
  #weekday, shopcover, shopnews(only the newest 10 items) 
  get_shop_info: (id,callback) ->
    return

  insert_comment:(id,comment)->
    return
   
  #get the shop's detail
  #weekday, shopcover, shopnews(only the newest 10 items), with comments
  get_shop_info_comment: (id) ->
    return

  get_news: (id,num) ->
    return

  get_comments: (id,num) ->
    return






   

module.exports = SchemaDesigner
