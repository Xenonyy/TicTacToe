const express = require("express");
const port = process.env.PORT || 3001;
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http, {
	cors: {
	  origin: "http://localhost:3000",
	}});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../react-ttt/build')));
// Handle GET requests to /api route
app.get("/api", (req, res) => {
	// res.json({ message: "Hello from server!" });
	res.json({ message: "Data from backend." });
});
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../react-ttt/build', 'index.html'));
});

// Socket.io
io.on('connection', (socket) => {
	socket.on('new user', (userName) => {
		let newUser = userName;
		console.log(newUser);
		io.emit('chat message',`Welcome to the chatroom ${userName}!`);
		console.log('A user has connected.');
		socket.on('disconnect', () => {
			io.emit('chat message',`${userName} has disconnected.`);
			console.log('A user has disconnected.');
		});
		socket.on('chat message', (msg) => {
			console.log(`message: ${msg}`);
			io.emit('chat message', `${userName} - ${msg}`);
			socket.on('typing', (data) => {
				socket.broadcast.emit('typing', data);
			});
		});

	})
	
	// Handle typing event
	// socket.on('typing', (data) =>{
    //      io.emit('display', data)
	// });
});



http.listen(port, () => {
	console.log(`Server listening on ${port}`);
});