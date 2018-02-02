const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// App props
const hostname = '/api/';

// Get all routes
const routes = require('./routes/routes');

// Enable CORS
app.use(cors());

// Parse incoming req bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set all routes
app.use(hostname, routes);

// 404, endpoint not found
app.use((req, res, next) => {
    const err = new Error('Sorry! Route not found.');
    err.status = 404;
    next(err);
})

// Final fallback, error handler
app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .send({ message: 'An error occurred' });
});

// Start server
app.listen(9000, () => {
    console.log('Listening on port 9000....');
})
