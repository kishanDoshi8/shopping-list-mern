const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const items = require('./routes/api/Items');

const app = express();

// Bodyparse middleware
app.use(express.json());

//DB config
const db = require('./config/keys').mongoURI;

// Connect to mongo
mongoose.connect(db).then(() => console.log('Connected to MongoDB')).catch(() => console.log('Error connecting DB...'));

// User routes
app.use('/api/items', items);

// Serve static asset if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started at port: ' + port));