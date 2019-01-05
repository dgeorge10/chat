var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

	socket.username = "Anonymous";

  	socket.on('change username', (data) => {
  		socket.username = data.username;
  	})
  	
  	socket.on('typing', (data) => {
  		socket.broadcast.emit('typing', {username: socket.username})
  	}); 

  	socket.on('empty typing', () => {
  		socket.broadcast.emit('empty typing')
  	})

  	socket.on('new message', (data) => {
  		io.sockets.emit('new message', {message: data.message, username:socket.username});
  	});

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
