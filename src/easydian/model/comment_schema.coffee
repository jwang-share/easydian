


#FIX me to emerge news and comment together
class Comment_Schema
  constructor : () ->
    @comm_schema = new Schema({
      shopid : {type:String, default:'shopid'}, 
      comment: {type:String, default:'context'},
      createtime:{type:Date, default: Date.now},
    })
  return

  insert_comment: (comment,category) ->
    @comm_model = Mongoose.model "comments", @comm_schema, category
    comment_doc = new @comm_model, comment
    comment_doc.save (err,doc) ->
      logger.info "failed to insert_comment: " + err  if err?
  
  #FIXme, use collection scope to search
  get_comment_by_id: (id,category,start,limit,callback) ->
    conn.db.collection category, (err, collec) ->
      collec.find({shopid:id})
      .skip(start)
      .limit(limit)
      .sort('-createtime')
      .select('news newsurl')
      .exec(callback)


module.exports = Shop_Comments