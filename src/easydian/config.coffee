# Configuration

global.config = {
  LOG_LEVEL: "info",
  LISTEN_PORT: 8888,
  DB_SHOPS_URL: "admin:admin@127.0.0.1:27017/shops?poolSize=10"
}

global._            = require 'underscore'
global.Async        = require 'async'
global.Step         = require 'step'
global.logger       = new (require './logger')("easydian")
global.mongoose     = require 'mongoose'
