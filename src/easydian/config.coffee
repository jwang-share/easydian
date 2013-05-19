# Configuration

global.config = {
  LOG_LEVEL: "info",
  LISTEN_PORT: 8888,
  DB_SHOPS_URL: "mongodb://127.0.0.1:27017/easydian",
  SHOPS_COLLECTION: "shops"
}

global.Async        = require 'async'
global.Step         = require 'step'
global.logger       = new (require './logger')("easydian")
global.ShopCategory = ["Dining", "Banjia", "Zhuangxiu"]

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
News_Schema = require './model/news_schema'
Comment_Schema = require './model/comment_schema'
Controller_Assisstant = require './controller_assisstant'

global.GShop = new Shop_Schema()
global.GUser = Userinfo_Schema()
global.GNews = new News_Schema()
global.GComment = new Comment_Schema()
global.GAssisstant = new Controller_Assisstant Shop, User




