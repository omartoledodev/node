var http = require('http');
var expressServer = require('./app/expressServer');
var conf = require('./conf');

var app = new expressServer();//instancia de expressServer

var server = http.createServer(app.expressServer);
server.listen(conf.port);