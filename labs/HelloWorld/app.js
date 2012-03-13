
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , mongooseAuth = require('mongoose-auth');

var SECRET_KEY = require('./settings.js').SECRET_KEY;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //app.use(app.router);
  app.use(express.cookieParser());
  app.use(express.session({secret: SECRET_KEY}));
  app.use(mongooseAuth.middleware());
  app.use(express.static(__dirname + '/public'));
});

mongooseAuth.helpExpress(app);

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.post('/users', routes.create_user);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
