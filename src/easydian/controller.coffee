

banjia = require './banjia_controller'
canyin = require './canyin_controller'
zhuangxiu = require './zhuangxiu_controller'
user_ctrl = require './user_controller'

class Controller
  constructor: () ->
    @__banjia = new banjia()
    @__canyin = new canyin()
    @__zhuangxiu = new zhuangxiu()
    @__user_ctrl = new user_ctrl()

  get_all_controllers: () ->
    ctrllers =  [
      @__banjia,
      @__canyin,
      @__zhuangxiu,
      @__user_ctrl
    ]
    return ctrllers



module.exports = Controller