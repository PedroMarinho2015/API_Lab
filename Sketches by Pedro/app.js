"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    adaptor: { adaptor: "firmata", port: "COM6" }
  },

  devices: {
    servo: {
      driver: "servo",
      pin: 3,
      limits: { bottom: 20, top: 160 }
    }
  },

  work: function(my) {
    var angle = 0,
        increment = 20;

    every((0.01).seconds(), function() {
      angle += increment;

      my.servo.angle(angle);

      console.log("Current Angle: " + (my.servo.currentAngle()));

      if ((angle == 0) || (angle == 160)) {
        increment = -increment;
      }
    });
  }
}).start();

if(msg =="button1Pressed"){

  robot.work();


}	

// Recieves a message from the browser and if text matches, triggers a function in the robot
app.ws('/ws', function (ws, req) {
ws.on('message', function (msg) {

// A series of if statements waiting for browser to make a request



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

