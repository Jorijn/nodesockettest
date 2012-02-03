var socket, nickname;

$(function() {
	$('#modal_content').modal('show');
	
	$('#nick_button').click(function() {
		if ($('#nickname').val().length > 0)
		{
			$('#modal_content').modal('hide');
			
			nickname = $('#nickname').val();
			
			init_chat();
		}
	});
});

function init_chat()
{
	// connect
	socket = io.connect('http://' + window.location.host);
	add_rule_to_chat(' *** Verbinding maken.. ');
	
	register_binds();
	register_key_event();
}

function add_rule_to_chat(message)
{
	$('.chatbox ul ').append($('<li />').html(message));
}

function register_binds()
{
	socket.on('connect', function () {
		add_rule_to_chat(' *** Verbonden! ');
		socket.emit('set_nickname', { nickname: nickname });
		scroll_to_bottom();
	});
	
	socket.on('disconnect', function (data) {
		add_rule_to_chat('<span class="typ"> *** Verbinding verloren :-(</span>');
		scroll_to_bottom();
	});
	
	socket.on('news', function (data) {
		add_rule_to_chat('<span class="typ"> *** ' + data.message + '</span>');
		scroll_to_bottom();
	});
	
	socket.on('message', function (data) {
		add_rule_to_chat('<span class="kwd">&lt;' + data.nickname + '&gt;</span> ' + data.message);
		scroll_to_bottom();
	});
}

function scroll_to_bottom()
{
	$('pre').scrollTop($('pre ul').height());
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