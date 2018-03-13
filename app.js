"use strict";

var Cylon = require("cylon");
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressWs = require('express-ws');
var ews = expressWs(express());
var app = ews.app;
var counter = 0;

// Defines the robot's attributes 
var robot = Cylon.robot({

connections: { 
  adaptor: { adaptor: 'firmata', port: 'COM6' } 
},

devices: {
  led1: { driver: 'led', pin: 3 },
  led2: { driver: 'led', pin: 4 },
  led3: { driver: 'led', pin: 5 },        
},

// Defines the robot's functions 
work1: function(my) { this.led1.turnOn(); },
work2: function(my) { this.led1.turnOff(); },
work3: function(my) { this.led2.turnOn(); },
work4: function(my) { this.led2.turnOff(); },
work5: function(my) { every((20).second(), this.led3.toggle());},
});

// Starts the robot when live server is started
robot.start();  

// Recieves a message from the browser and if text matches, triggers a function in the robot
app.ws('/ws', function (ws, req) {
ws.on('message', function (msg) {

// A series of if statements waiting for browser to make a request
if(msg =="button1Pressed"){

  robot.work1();

  // Check the state of the TV (if it's on or off) to perform an action based on that.

  counter = counter +1;

  // If the counter is an odd number the TV if ON
  if (counter%2 == 1){

      // Turn the TV OFF
      console.log("TV is ON");
  }

  // If the counter is an even number the TV if OFF
  else{

    // Turn the TV ON
    console.log("TV is OFF");
  }

}	
if(msg =="button2Pressed"){
robot.work2();
}	
if(msg =="button3Pressed"){
robot.work3();
}	
if(msg =="button4Pressed"){
robot.work4();
}	
if(msg =="button5Pressed"){
robot.work5();
}	


// Get message from the client
var clients = ews.getWss('/ws').clients;

// Debug print messages
console.log(new Date().toLocaleTimeString() + '> ' + msg);

// Broadcast it to all other clients
clients.forEach(c => {
c.send(msg);
});
});
});

// var expressWs = require('express-ws')(app);
app.use(require('middleware-static-livereload')({
documentRoot: 'public/'
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
var err = new Error('Not Found');
err.status = 404;
next(err);
});

// error handler
app.use(function (err, req, res, next) {
if (err.status)
res.sendStatus(err.status);
else
res.sendStatus(500);
});

let port = 5000;
app.listen(port);
console.log('Webserver started: http://localhost:' + port);
module.exports = app;
\ No newline at end of file
