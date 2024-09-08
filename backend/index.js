// =========== This is our main entry point of the backend ========

// Import the file that will connect us to MongoDB
const connectToMongo = require('./db');

// Export express for creating our own backend and routes
const express = require('express');
var cors = require('cors');

// Create the app object 
const app = express();

// Use the CORS middleware with the specified options
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));

// for connecting to MongoDB call the function
connectToMongo();

// Define a port for the backend 
const port = 5000;

app.use(express.json());

// Available Routes
app.get('/', (req, res) => {
    res.send('Hello');
});

//#1 Route for authentication
// When the user comes on this path we actually import the auth.js file
app.use('/api/auth', require('./routes/auth.js'));

//#2 Route for fetching notes from the db
app.use('/api/notes', require('./routes/notes.js'));

// Function for listening to the server and printing a message on the console
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
