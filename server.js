var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require('express-session');
var port = process.env.PORT || 5000;

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'very secret'
}));

app.use(express.static('public'));
app.set('port', port);

var databaseUrl = 'mongodb://localhost/mean';
//var databaseUrl = process.env.MONGOLAB_URL;
//var databaseUrl = 'mongodb://user:password@ds061671.mongolab.com:61671/mongo';
mongoose.connect(databaseUrl);

require('./server/')(app, mongoose);

console.log('hello world');

var io = require('socket.io').listen(app.listen(app.get('port')));

io.sockets.on('connection', function(socket) {
    socket.emit('message', { message: 'welcome'});
    socket.on('send', function(data) {
        io.sockets.emit('message', data);
    });
});