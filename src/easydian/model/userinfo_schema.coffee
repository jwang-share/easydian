



class Userinfo_Schema
  constructor : () ->
    @user_schema = new Schema({
      username: {type:String, default:"fullname"},
      useraddress: [{address:String, usetime:Date}],
      userpassword: {type:String, default:"md5"}
      usertargetaddress: [{address:String, usetime:Date}],
      useraddressgps: {x:0,y:0 },
      usertargetaddressgps: {x:0,y:0 },
      userphone: {type:Array, default: ['010-22222222']},
      logintime: [{type:Date, default: Date.now}],
      belogin: {type:Boolean, default: true}
    })
    @user_model = Mongoose.model 'user_info', @user_schema
    return

  insert_user : (user) ->
    @user_model = Mongoose.model "users", @user_schema
    user_doc = new @user_model user
    user_doc.save (err,doc) ->
      logger.info "failed to insert_shop: " + err  if err?

  remove_user_address: (id, address) ->
    @user_model.findById id (err,doc) ->
      doc.useraddress.remove(address)

  add_user_address: (id, address) ->
    @user_model.findById id (err,doc) ->
      addr = {"address":address, usetime:Date.now()}
      for item in doc.useraddress
        if item.address is address
          return
      doc.useraddress.push(addr)

  add_user_target_address: (id, address) ->

  update_user_iphone: (id,newphone) ->

  update_user_logintime: (id) ->

  update_user_login_status: (id,status) ->

  get_user: (id) ->

  update_user: (id,newuser) ->









module.exports = Userinfo_Schema