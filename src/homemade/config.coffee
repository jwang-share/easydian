# Configuration

global.config = {
  LOG_LEVEL: "info",
  LISTEN_PORT: 8888,
  DB_SHOPS_URL: "mongodb://127.0.0.1:27017/homemade",
  SHOPS_COLLECTION: "shops"
}

global.Async        = require 'async'
global.Step         = require 'step'
global.logger       = new (require './logger')("homemade")
global.ShopCategory = ["Dishes"]

global.Mongoose = require "mongoose"
global.Schema = Mongoose.Schema
#be more graceful here
Mongoose.connect config.DB_SHOPS_URL
global.conn = Mongoose.connection
conn.on 'error', console.error.bind console, 'connection error:'
conn.once 'open', ()->
   logger.info "success to open mongodb"

#db detail
Shop_Schema = require './model/shop_schema'
Userinfo_Schema = require './model/userinfo_schema'
Controller_Assisstant = require './controller_assisstant'

global.GShop = new Shop_Schema()
global.GUser = new Userinfo_Schema()
global.GAssisstant = new Controller_Assisstant GShop, GUser
