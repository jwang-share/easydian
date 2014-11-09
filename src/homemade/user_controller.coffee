#mainpage and common apis are also here
class user_controller
  constructor: () ->

  get_route: () ->
    route = [
      {path: "user/:id", http_method: "get", method: "user_info"},
      {path: "login/", http_method: "post", method: "login"},
      {path: "register/", http_method: "post", method: "register"},
      {path: "logout/", http_method: "post", method: "logout"},
      {path: "delete/:id", http_method: "delete", method: "delete_user"}
    ]

  register: (req, res) ->

  login: (req, res) ->

  logout: (req, res) ->

  disable_user: (req, res)->

    #inner use only
  delete_user: (req, res)->


module.exports = user_controller