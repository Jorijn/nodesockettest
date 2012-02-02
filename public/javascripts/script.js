var socket;

$(function() {
	// connect
	socket = io.connect('http://' + window.location.host);
	add_rule_to_chat(' *** Verbinding maken.. ');
	
	register_binds();
	register_key_event();
});

function add_rule_to_chat(message)
{
	$('.chatbox ul ').append($('<li />').html(message));
}

function register_binds()
{
	socket.on('connect', function () {
		add_rule_to_chat(' *** Verbonden! ');
	});
	
	socket.on('disconnect', function (data) {
		add_rule_to_chat(' *** Verbinding verloren :-(');
	});
	
	socket.on('news', function (data) {
		add_rule_to_chat(' *** ' + data.message);
	});
	
	socket.on('message', function (data) {
		add_rule_to_chat('&lt;' + data.nickname + '&gt; ' + data.message);
		$('pre').scrollTop($('pre').height() * 10);
	});
}

function register_key_event()
{
	$('#input').keydown(function(event) {
		if (event.which == 13) {
			var text = $(this).val();
			$(this).val('');
			
			socket.emit('message', { message: text });
			
			event.preventDefault();
		}
	});
}