var express = require('express');
var http = require('http');
var routes = require('./routes');

// Include express and server.io
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// Set up global options
app.configure(function() {

    // Set up views via Jade
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    // Set up middleware, faux method suppport
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // Use routing, set up static routes
    app.use(app.router);
    app.use(express.static(__dirname+'/public'));
    
});

// Set up development to be a pretty liberal 
app.configure('development', function() {
    app.use(express.errorHandler({
        dumpExceptions : true,
        showStack : true
    }));
});

// Set up production to be tighter
app.configure('production', function() {
    app.use(express.errorHandler());
});

// Load routes
require('./routes')(app);

// Bind to the http port
server.listen(3031);
console.log("Express server listening on port %d in %s mode!", server.address().port, app.settings.env);