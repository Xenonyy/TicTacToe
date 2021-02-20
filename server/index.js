const express = require("express");
const port = process.env.PORT || 3001;
const app = express();
const path = require('path');


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../react-ttt/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
	res.json({ message: "Hello to Heroku!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../react-ttt/build', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server listening on ${port}`);
});