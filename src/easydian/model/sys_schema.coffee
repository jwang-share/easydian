


class Sys_Schema

  constructor: () ->
  	@sys_schema = new Schema({
      canyin:{shopnum:Number,column:Number,createtime:Date},
      banjia:{shopnum:Number,column:Number,createtime:Date},
      zhuangxiu:{shopnum:Number,column:Number,createtime:Date}
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

  update_categories: (newitem) ->
    @sys_model.findOneAndUpdate("",{$push,newitem},{upsert:true})

  remove_category: (category) ->
    @sys_model.findOne (err,doc) ->
      if doc.categories[category]?
        doc.categories.remove(category)

  get_col_num: (category) ->
    @sys_model.findOne  (err,doc) ->
      return doc.categories[category]

  update_col_num: (category, num) ->
    @sys_model.findOne (err,doc) ->
      if doc.categories[category]?
         doc.categories[category].column = num
         doc.save (err) ->
           logger.info "failed to update_col_num: " + err  if err? 

  update_shop_num: (category) ->
    @sys_model.findOne (err,doc) ->
      if doc.categories[category]?
        doc.categories[category].shopnum = doc.categories[category].shopnum + 1
        doc.save (err) ->
          logger.info "failed to update_shop_num: " + err  if err?




 module.exports = Sys_Schema