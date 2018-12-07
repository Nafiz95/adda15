//ALL THE REQUIRES
var http = require('http');
var express =require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var io = require('socket.io')(server);


//CONNECTS TO MONGODB AT PORT 27017 OR ITS LOCAL SERVER
var db;
var db_url = "mongodb://"+process.env.IP+":27017"
//var db_url = "mongodb://localhost:27017"

// MONGOOSE SERVER CONNECTION
mongoose.connect(db_url+"/msn");
mongoose.connection.on('error', function(err){
  console.log(err);
  console.log('Could not connect to mongodb');
})
//SOCKET IO CONNECTION
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
});
});

app.use(express.static(__dirname+"/public"));  //INCLUDE STATIC FILES FROM PUBLIC
app.use(bodyParser.json());                    // FOR SOME REASON
app.use(bodyParser.urlencoded({extended:true}));

// HOME PAGE
app.get('/', function(request, response){
  response.render('index.ejs');
});

//OTHER ROUTES
require('./routes/messenger-routes.js')(app);
server.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function(){
  console.log('Server running');
});
