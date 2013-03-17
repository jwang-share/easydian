


class Sys_Schema
  constructor: () ->
  	@SchemaDesigner = new Schema({
      categories:[
        {canyin:{shopnum:Number,column:Number,createtime:Date}},
        {banjia:{shopnum:Number,column:Number,createtime:Date}},
        {zhuangxiu:{shopnum:Number,column:Number,createtime:Date}}
      ]
    }
  	})
    return

  create_sys_manager: (manager) ->
    sys_doc = new @SchemaDesigner manager
    sys_doc.save (err) ->
      logger.info "failed to create_sys_manager: " + err  if err?

  get_categories: (callback) ->
    @SchemaDesigner.findOne()
    .select('categories')
    .exec(callback)

  update_categories: (newitem) ->
    @SchemaDesigner.findOneAndUpdate("",{$push,newitem},{upsert:true})

  remove_category: (category) ->
    @SchemaDesigner.findOne (err,doc) ->
      if doc.categories[category]?
        doc.categoriesremove(category)

  get_col_num: (category) ->
    @SchemaDesigner.findOne  (err,doc) ->
      return doc.categories[category]

  update_col_num: (category, num) ->
    @SchemaDesigner.findOne (err,doc) ->
      if doc.categories[category]?
         doc.categories[category].column = num
         doc.save (err) ->
           logger.info "failed to update_col_num: " + err  if err? 

  update_shop_num: (category) ->
    @SchemaDesigner.findOne (err,doc) ->
      if doc.categories[category]?
        doc.categories[category].shopnum = doc.categories[category].shopnum + 1
        doc.save (err) ->
          logger.info "failed to update_shop_num: " + err  if err?




 module.exports = Sys_Schema