#desc:
###
  put all the shops into one collection, which is called 'shops'
  e.g:
  @shop_model = Mongoose.model('shops',@shop_schema)
  name->index, id->index
###

class Shop_Schema
  
  constructor: () -> 
    @shop_schema = new Schema({
       id : {type:String, default:'id'}, #id
       shopname : {type:String, default:'fullname'},
       shopalias : [{type:String, default:'short name'}],
       shoptype : {type:String, default:'Dining'},
       shopvisit : {type:Number, default:1000},
       shoppriority : {type: Number, default:1000},
       shopwebsite: {type:String, default: 'fullurl'},
       shopphone: {type:Array, default: ['010-22222222']},
       shoponbusiness: {type:Boolean, default: true},
       shoponadv: {type:Boolean, default: true},
       shopweekstats:[
         {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},#mon
         {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},#tues
         {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},#wesdn
         {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},#thur
         {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},#fri
         {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},#sat
         {type:Array, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]} #sun
       ]
       weekday:     {type:Array, default:[0,0,0,0,0,0,0]},#visit
       weekdaygood: {type:Array, default:[0,0,0,0,0,0,0]},
       weekdaybad:  {type:Array, default:[0,0,0,0,0,0,0]},
       shopgoodt: {type:Number, default:0},
       shopbadt: {type:Number, default:0},
       shopdaystats:{type:Array,default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},#visit
       shopmonthstats: {type:Array,default:[0,0,0,0,0,0,0,0,0,0,0,0]}, #visit     
       shoplogo: {type:String, default: './images/default.jpg'}, 
       shopcover:{type:Array, default: ['beijing','shanghai']},
       shopaccount: {type:Number, default:0}, 
       shopcreatetime: {type:Date, default: Date.now},
       shopcommentsnum: {type:Number, default:0}
    })
    return

  insert_shop: (shop) ->
    logger.info "begin to insert_shop"
    shop_doc = new @shop_model shop
    shop_doc.save (err,doc)->
      logger.info "failed to insert_shop: " + err  if err?

  #callback: (err,docs)
  get_shops: (category, fields, start, limit, callback) ->
    if typeof category is 'function'
      @shop_model.find()
      .sort('-shoppriority')
      .select(fields)
      .exec(callback)
    else
      @shop_model.find({shoptype:category})
      .skip(start)
      .limit(limit)
      .sort('-shoppriority')
      .select(fields)
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
        logger.info "failed to update_visit.save: "+err if err?

  update_badgood: (id,type) ->
    @shop_model.findById id, (err,doc) ->
      logger.info "update_visit.findbyID: "+err if err?
      curtime = new Date()
      day = curtime.getDay()
      hour = curtime.getHour()
      month = curtime.getMonth()
      if type is 'good'
        doc.weekdaygood[day] = doc.weekdaygood[day] + 1
        doc.shoppriority = doc.shoppriority + 1
        doc.shopgoodt = doc.shopgoodt + 1
      else
        doc.weekdaybad[day] = doc.weekdaybad[day] + 1
        doc.shoppriority = doc.shoppriority - 2
        doc.shopbadt = doc.shopbadt + 1
      doc.save: (err) ->
        logger.info "failed to update_badgood.save: "+err if err?
  
  #get all shops' 
  #id, shopname, shoplogo, weekdaygood, shopbadt, shopwebaddress,shoponbusiness,shopwithnew
  get_shop_by_id: (id,callback) ->
    @shop_model.findById id, (err,doc) ->
      logger.info "failed to get_shop_by_id.findById: "  + err if err?
      callback(doc)  

  update_shop_account: (id,num) ->
    @shop_model.findbyId id, (err,doc) ->
      logger.info "failed to update_shop_account.findById: "  + err if err?
      doc.shopaccount = doc.shopaccount + 1
      doc.save: (err) ->
        logger.info "failed to update_shop_account.save: "+err if err?

  get_shop_field: (id, fields, callback) ->
    @shop_model.findById id, fields, (err,doc) ->
      logger.info "failed to get_shop_field.findById: "  + err if err?
      callback(doc)

  update_comments_num: (id) ->
    @shop_model.findbyId id, (err,doc) ->
      logger.info "failed to update_comments_num.findById: "  + err if err?
      doc.shopcommentsnum = doc.shopcommentsnum + 1
      doc.save: (err) ->
        logger.info "failed to update_comments_num.save: "+err if err?


module.exports = Shop_Schema
