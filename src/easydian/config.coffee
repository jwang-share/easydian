# Configuration

global.config = {
  LOG_LEVEL: "info",
  LISTEN_PORT: 8888
}

global._            = require 'underscore'
global.Async        = require 'async'
global.Step         = require 'step'
global.logger       = new (require './logger')("easydian")
global.mongoose     = require 'mongoose'
