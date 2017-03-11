var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var chat = {
	start: function(){
		server.listen(8000,'0.0.0.0');
		io.set("origins", "*:*");
		var rooms = [];

		io.on('connection', function(socket) {
	    var room;
			var user;
			var text;
	    socket.on('room', function(_room) {
	        room = _room.roomName;
					user = _room.userName;
	        socket.join(room);
	        if (room in rooms)
	            rooms[room]++;
	        else
	            rooms[room] = 1;
	        io.to(room).emit('intro', {'userName': user, 'text': "ha entrado en la sala"});
	    });

			socket.on('newMessage', function(_room) {
			 user = _room.userName;
			 text = _room.text;
			 io.to(room).emit('message', {'userName': user, 'text': text});
			});

	    socket.on('disconnect', function() {
	        leaveRoom();
	    });

	    var leaveRoom = function() {
	        rooms[room]--;
	        io.to(room).emit('client left', {'userName': user, 'text': "dejo la sala"});
	        if (rooms[room] === 0)
	            delete rooms[room];
	    };
		});

	}
}

module.exports = chat;
