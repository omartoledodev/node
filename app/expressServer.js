var env = process.env.NODE_ENV || 'production';//variable de entorno

var express = require('express');
var middlewares = require('./middlewares/admin');
var swig = require('swig');
var router = require('./website/router');
var ExpressServer = function(config){
config = config || {};

this.expressServer = express();

//Middlewares
for (var middleware in middlewares){
	this.expressServer.use(middlewares[middleware]);//le dice a express que use un middlewares
}


//template swig
this.expressServer.engine('html', swig.renderFile);
this.expressServer.set('view engine', 'html');
this.expressServer.set('views', __dirname + '/website/views/templates');//donde encontrar templates
swig.setDefaults({varControls: ['[[',']]']});// se cambio la conf, ahora se usan [[]] como variables de control en ves de {{}}


if(env == 'development'){
	//quitar cache a swig y a express
	console.log('OK NO HAY CACHE');
	this.expressServer.set('views cache', false);
	swig.setDefaults({cache: false, varControls: ['[[',']]']})
}


/*this.expressServer.get('/article/see/:data', function(req, res, next){
	res.render('article_see', {nombre: 'Omar'});
});



});*/

for(var controller in router){
	for(var funcionalidad in router[controller].prototype){
		var method = funcionalidad.split('_')[0];
		var entorno = funcionalidad.split('_')[1];
		var data = funcionalidad.split('_')[2];
		data = (method == 'get' && data !== undefined) ? ':data' : '';
		var url = '/' + controller + '/' + entorno + '/' + data;

		this.router(controller, funcionalidad, method, url);
	}
}

};
ExpressServer.prototype.router = function(controller, funcionalidad, method, url){
	console.log(url);
	this.expressServer[method](url, function(req, res, next){
		var conf = {
			'funcionalidad': funcionalidad,
			'req': req,
			'res': res,
			'next': next
		}
		var Controller = new router[controller](conf);
		Controller.response();
	});
}
module.exports = ExpressServer;//ya es un objeto que se puede usar en otro codigo
