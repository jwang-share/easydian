dishes = require './dishes_controller'
user_ctrl = require './user_controller'

class Controller
  constructor: () ->
    @__dishes = new dishes()
    @__user_ctrl = new user_ctrl()

  get_all_controllers: () ->
    ctrllers = [
      @__dishes,
      @__user_ctrl
    ]
    return ctrllers


module.exports = Controller