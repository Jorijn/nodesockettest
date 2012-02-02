exports.distribute = function (type, object)
{
	for (var num = 0; num < global.clients.length; num++)
	{
		global.clients[num].emit(type, object);
	}
};

exports.register_message = function (socket, message) 
{
	var nickname = socket._data.nickname;
	global.connection_handler.distribute('message', { nickname: nickname, message: message });
}