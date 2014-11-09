require './homemade/config'

console.log "main...."

Server = require './homemade/server'
new Server().start()