

class Userinfo_Schema
  constructor : () ->
  	@schemaDesigner = new Schema({
      username: {type:String, default:’fullname’}, #email #phone num
      useraddress: {type:String, default:’address’},
      userpassword: {type:String, default:’md5’}
      usertargetaddress: {type:String, default:’address’},
      useraddressgps: {“x”:0,”y”:0 },
      usertargetaddressgps: {“x”:0,”y”:0 },
      userphone: {type:Array, default: [‘010-22222222’]},
      logintime: [{type:Date, default: Date.now}],
      belogin: {type:Boolean, default: true}
  	})



module.exports = Userinfo_Schema