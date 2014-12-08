var ArticleView = require('../views/article');
//var ArticleModel = require('../models/article');

var Article = function(conf){
	this.conf = conf || {};

	this.view = new ArticleView();
	//this.models = new ArticleModel();

	this.response = function(){
		this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
	}
}

Article.prototype.post_save = function(req, res, next){
	//res.render('article_list', {nombre:'add'});
}

Article.prototype.get_add = function(req, res, next){
	//res.render('article_list', {nombre:'add'});
	var object = {nombre:'add'}
	this.view.add(res, object);
}

Article.prototype.get_edit_data = function(req, res, next){
	//res.render('article_list', {nombre:'edit'});
	var object = {nombre:'add'}
	this.view.edit(res, object);
}

Article.prototype.get_list = function(req, res, next){
	//res.render('article_list', {nombre:'list'});
	var object = {nombre:'add'}
	this.view.list(res, object);
}

module.exports = Article;
