$(function(){
    // make connection

    // var port = process.env.PORT || 8080;

    var socket = io.connect(window.location.hostname);

    //buttons and input
    var message = $("#message");
    var username = $("#username");
    var send_message = $("#send_message");
    var send_username = $("#send_username");
    var chatroom = $("#chatroom");
    var feedback = $("#feedback")

    // Emit a username
    send_username.click(function() {
        socket.emit('change_username', {username: username.val()})
    })

    // Emit a message
    send_message.click(function() {
        socket.emit('new_message', {message: message.val()})
    })

    // listen on new message
    socket.on("new_message", (data) => {
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    //Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})

});