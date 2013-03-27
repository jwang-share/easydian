
var ejs = require('ejs');
var fs = require('fs')
console.log(__dirname);
var str = fs.readFileSync(__dirname + '/views/comment.ejs', 'utf8');

var ret = ejs.render(str, {shops: [{shoplogo: 'wp-icon.png', shopwebsite: '#', shopname: 'EasySou', id: 'shop1'}] });

console.log(ret);
require('./lib/main.js');