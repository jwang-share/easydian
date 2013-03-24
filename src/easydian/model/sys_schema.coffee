


class Sys_Schema

  constructor: () ->
    shop_stats = new Schema({
      shopnum:{type:Number, default:0},
      column:{type:Number, default:4},
      createtime: {type:Date, default: Date.now}
    })
  	@sys_schema = new Schema({
      Dining:[shop_stats],
      zhuangxiu:[shop_stats],
      banjia:[shop_stats]
    })
    @sys_model = Mongoose.model "sys_manager", @sys_schema
    return
    
  create_sys_manager: (manager) ->
    sys_doc = new @sys_model manager
    sys_doc.save (err) ->
      logger.info "failed to create_sys_manager: " + err  if err?

  get_categories: (callback) ->
    @sys_model.findOne()
    .exec(callback)
  
  update_category_name: (category, newname) ->

  delete_category: (category) ->

  get_field: (field, category) ->

  increase_field: (field, category) ->

  update_field: (field, category, newnum) ->

  

 module.exports = Sys_Schema