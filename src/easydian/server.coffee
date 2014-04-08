

express         = require 'express'
querystring     = require 'querystring'
Controller      = require('./controller')

class Server
  constructor: () ->
    @app = express()
    @controllers = new Controller()
    @configure(@app)

  configure: (app) ->
    app.configure () ->
      app.use(express.cookieParser())
      app.use(express.bodyParser())
      app.use(express.methodOverride())
      app.use(app.router)
      console.log "-----------------------------" + __dirname
      app.use(express.static(__dirname + '/../../public'))
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
      app.set('views',__dirname + '/../../views')
      app.set('view engine', 'ejs')
      return

    #routes...
    self = this
    for ctrler in @controllers.get_all_controllers()
      console.log "-----------------------------"
      do (ctrler) ->
        for api in ctrler.get_route()
          do (api) ->
            fn_handler = (req, res) ->
              try
                ctrler[api.method](req,res)
              catch error
                res.json(error)
            app[api.http_method](api.path, fn_handler)
            logger.info("route: #{api.http_method.toUpperCase()} #{api.path} => #{api.method}")
            return #configure

  start: (port=config.LISTEN_PORT) ->
    @app.listen(port)
    logger.info "Server is listening to #{port}"


module.exports = Server