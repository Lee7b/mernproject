const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

// Middleware
app.use((req, res, next) => {
  console.log(Date().toString(), req.originalUrl);
  next();
})

app.use((err, req, res, next) => {
  console.error(err.stack);

})

//Import routes
const userRoutes = require('./routes/api/users');

//Routes
// app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

// Invalid request
// app.use((req, res, next) => {
//   res.status(404).send('We think you are lost');
// })

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

// Connect to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });
const db = mongoose.connection;

// On connection
db.on('connected', () => {
    console.log('Connected to db');
  })

// On error
db.on('error', console.error.bind(console, 'MongoDB Connection Error'));

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);