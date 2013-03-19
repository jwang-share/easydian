



class News_Schema
  constructor : () ->
    @news_schema = new Schema({
      shopid : {type:String, default:'shopid'}, 
      news: {type:String, default:'abstract'},
      newsurl: {type:String, default:'full_url'},
      createtime:{type:Date, default: Date.now}
    })
    return

  insert_news: (news,category) ->
    @news_models = Mongoose.model "news", @news_schema, category
    news_doc = new @news_models news
    news_doc.save (err,doc) ->
      logger.info "failed to insert_comment: " + err  if err?
  
  #FIXme, use collection scope to search
  get_news_by_id: (id,category,start,limit,callback) ->
    conn.db.collection category, (err, collec) ->
      collec.find({shopid:id})
      .skip(start)
      .limit(limit)
  	  .sort('-createtime')
  	  .select('news newsurl')
  	  .exec(callback)


module.exports = News_Schema