module.exports = function(req, res, next){
	res.locals.nick = 'OmarTR';
	next();
};