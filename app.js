
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes');

var app = module.exports = express.createServer(),
	io = require('socket.io').listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// set globals, there has to be a better way for this :-/
global.clients = new Array;
global.connection_handler = require('./application/connectionhandler');
global.connection_events = require('./application/events');

// events
io.sockets.on('connection', global.connection_events.on_connect);
io.sockets.on('message', global.connection_events.on_message);