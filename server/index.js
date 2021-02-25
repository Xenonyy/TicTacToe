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
	io.emit('chat message',`${socket.id} has connected.`);
	console.log('A user has connected.');
	socket.on('disconnect', () => {
		io.emit('chat message',`${socket.id} has disconnected.`);
		console.log('A user has disconnected.');
	});
	socket.on('chat message', (msg) => {
		console.log(`message: ${msg}`);
		io.emit('chat message', `${socket.id} - ${msg}`);
	})
});



http.listen(port, () => {
	console.log(`Server listening on ${port}`);
});