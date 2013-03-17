


#FIX me to emerge news and comment together
class Comment_Schema
  constructor : () ->
    @schemaDesigner = new Schema({
      shopid : {type:String, default:'shopid'}, 
      comment: {type:String, default:'comment'},
      createtime:{type:Date, default: Date.now},
    })
  return

  insert_comment: (comment,category) ->
    comment_doc = new @schemaDesigner category, comment
    comment_doc.save (err,doc) ->
      logger.info "failed to insert_comment: " + err  if err?
  
  #FIXme, use collection scope to search
  get_comment_by_id: (id,start,limit,callback) ->
  	@schemaDesigner.find({shopid:id})
  	.sort('-createtime')
  	.select('comment createtime')
  	.exec(callback)


module.exports = Shop_Comments