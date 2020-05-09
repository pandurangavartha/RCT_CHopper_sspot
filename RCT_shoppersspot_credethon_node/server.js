/*
 * dotenv setup to manage environments
 */
console.log("111111111111111111111111111","---------app")

var argv = require('yargs')
        .command('environment', function (yargs) {
            yargs.options({
                location: {
                    demand: true,
                    alias: 'e',
                    type: 'string'
                }
            });
        })
        .help('help')
        .argv;
envFileName = argv.e;
require('dotenv').config({path: ".env." + envFileName});


/*
 * define all global and local variables
 */
var express = require('express');
var path = require('path');
global.http = require('http');

global.fs = require('fs');
global.app = express();
app.use('/content', express.static(path.join(__dirname, 'content')));
// app.use('/content', express.static(path.join(__dirname, 'content/profile')));
// app.use(express.static(__dirname + '/data/img'));
global.bodyParser = require('body-parser');
global.cors = require('cors');
global.router = express.Router();
global.helper = require('./app/helpers/_helpers');
//global._mongoose = require('./app/helpers/_mongoose');
//global.langCode = '';
global.appMessage = require('./app/helpers/language/' + process.env.MSGLANG + ".msg.js");

global.mongoose = require('mongoose');
mongoose.connect( process.env.mongo_server ,{
    useMongoClient: true,
});
//var mongo = require('mongodb');
//
//var Server = mongo.Server,
//    Db = mongo.Db
//var server = new Server('localhost', 27017, {auto_reconnect: true});
//db = new Db('demoapp', server);

mongoose.Promise = require('bluebird');
global.Schema = mongoose.Schema;

app.use(bodyParser.json());
//global.requestIp = require('request-ip');
//app.use(requestIp.mw());
//app.use(function(req, res) { 
//    global.ip = req.clientIp; 
//    res.end(ip); 
//    console.log("Getting..." + ip); 
//});
/*
 * for angular
 */
//app.options(cors({origin: '*'}));
app.use(cors({origin: '*'}));

/**
 * For validation using middleware
 */
app.use(function (req, res, next) { 
    res.header("Access-Control-Expose-Headers", "x-access-token");
    next();
});

global.auth = require('./app/middleware/auth.js');
app.use(auth('on'));

var colors = require('colors');
var settings = require('./config/settings');
global._ = require('lodash');
global.models = require('./app/models/');
global.admin = require('./app/admin/');
global.socketEvents = require('./app/socket.io');

//require('./config/error_log_handler.js');


var http = require('http').Server(app);

global.io = require('socket.io').listen(http);

//global.sio = io.listen(http);
//
//
//var users = 0;
//
//var address_list = new Array();
//sio.sockets.on('connection', function (socket) {
//    console.log("socket--",socket)
//  var address = socket.handshake.address;
//
//  if (address_list[address]) {
//    var socketid = address_list[address].list;
//    socketid.push(socket.id);
//    address_list[address].list = socketid;
//  } else {
//    var socketid = new Array();
//    socketid.push(socket.id);
//    address_list[address] = new Array();
//    address_list[address].list = socketid;
//  }
//
//  users = Object.keys(address_list).length;
//
//  socket.emit('count', { count: users });
//  socket.broadcast.emit('count', { count: users });
//
//
//models.products.find({}, function(err, todos) {
//    socket.emit('all',todos);
//    console.log("todos",todos)
//  });
//  })
//socketEvents(io);  

http.listen(settings.port, function () {
    console.log(("Listening on port-----------------" + settings.port).green);
}).on('error', function (e) {
    if (e.code == 'EADDRINUSE') {
        console.log('Address in use. Is the server already running?'.red);
    }
});