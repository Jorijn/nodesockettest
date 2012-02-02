exports.on_connect = function (socket) {
	var address = socket.handshake.address;
	global.clients.push(socket);
	
	socket._data = {};
	
	// register listener
	socket.on('message', function(data) {
		connection_handler.register_message(socket, data.message);
	});	
	
	socket.on('disconnect', function() {
		var nickname = socket._data.nickname;
		global.connection_handler.distribute('news', { message: nickname + ' (' + address.address + ') is niet langer bij ons.' })
	});
	
	socket.on('set_nickname', function(data) {
		socket._data.nickname = data.nickname;
		global.connection_handler.distribute('news', { message: data.nickname + ' (' + address.address + ') is nu verbonden.' })
	});
};