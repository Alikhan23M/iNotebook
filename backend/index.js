// =========== This is our main entry point of the backend ========

// Import the file that will connect us to Mongodb
const connectToMongo = require('./db');

// Export express for cteating our own backend and routes
const express = require('express')
var cors = require('cors');

// for connecting to mongo db call the function
connectToMongo();

// Create the app object 
const app = express();


// Define CORS options


// Use the CORS middleware with the specified options
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));

// define a port for the backend 
const port = 5000


app.use(express.json());

// Available Routes
app.get('/', (req, res) => {
    res.send('Hello');
});

//#1 Route for authentication

// When the user comes on this path we actually import the auth.js file
app.use('/api/auth', require('./routes/auth.js'));

//#2 Route for fetching notes from the db
app.use('/api/notes', require('./routes/notes.js'))

// function for listning the server and printing a message on the console
app.listen(port, () => {
    console.log(`listning at http://localhost:${port}`);
})
