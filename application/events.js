exports.on_connect = function (socket) {
	var address = socket.handshake.address;
	global.connection_handler.distribute('news', { message: 'Persoon ' + address.address + ':' + address.port + ' is nu verbonden.' })

	global.clients.push(socket);
	
	// register listener
	socket.on('message', function(data) {
		connection_handler.register_message(socket, data.message);
	});
};

exports.on_message = function(socket) {
	var address = socket.handshake.address;
	global.connection_handler.distribute('news', { message: 'Persoon ' + address.address + ':' + address.port + ' is nu verbonden.' });
};