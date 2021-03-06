var express = require('express');
var todoController = require('./controllers/todoController');
// set express app
var app = express();

// set up template engine
app.set('view engine','ejs');

// static files
app.use(express.static('./assets'));

// fire controllers
todoController(app);

// listen to port
app.listen(4200);
console.log('You are listening to port 4200');

// split in MVC structure:
// CONTROLLER
// MODEL => DATA
// VIEW => EJS
