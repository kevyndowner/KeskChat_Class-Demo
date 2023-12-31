var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//this file imports the socket.js file
var io = require('./socket');

var app = express();

//test

//for storing number of socket id and count number of users connected
var socketConnectedCounts = new Set()

//The functions for displaying connections and messages
io.on('connection', function(socket) {
  //socket.id is a randomly generated hash for a user
  console.log('User ' + socket.id + " connected!");
  socketConnectedCounts.add(socket.id);
  io.emit('user-counts', socketConnectedCounts.size);
  console.log(socketConnectedCounts.size);

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('User ' + socket.id + " disconnected");
    socketConnectedCounts.delete(socket.id);
    io.emit('user-counts', socketConnectedCounts.size);
    console.log(socketConnectedCounts.size);
  });

  socket.on('message', (data) =>{
    //will call the chat-message in the scripts.js
    socket.broadcast.emit('chat-message', data);
  });

  //need to emit so it shows up for all users
  socket.on('feedback', (data) =>{
    //will change the user typing message
    socket.broadcast.emit('feedback', data);
  });

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); 
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
