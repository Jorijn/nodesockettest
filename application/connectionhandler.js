exports.distribute = function (type, object)
{
	for (var num = 0; num < global.clients.length; num++)
	{
		global.clients[num].emit(type, object);
	}
};

exports.register_message = function (socket, message) 
{
	var address = socket.handshake.address;
	
	global.connection_handler.distribute('message', { nickname: address.address + ':' + address.port, message: message });
}