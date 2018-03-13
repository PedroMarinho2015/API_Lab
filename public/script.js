var socket = null;

if (document.readyState != 'loading') ready();
else document.addEventListener('DOMContentLoaded', ready);

function ready() {
	const url = 'ws://' + location.host + '/ws';
	socket = new ReconnectingWebsocket(url);
	socket.onopen = function(evt) {};
	socket.onmessage = function(evt) {
		logReceived(evt.data);
	};
}

function send(str) {
	socket.send(str);
}

function logReceived(d) {
	console.log(d);
}

function turnTVON(){

	console.log("TV is ON");
	document.getElementById("TV-frame").src="tv-on.png"

}

function turnTVOFF(){
	
	console.log("TV is OFF");
	document.getElementById("TV-frame").src="tv-off.png"

}

function LEDflicker(){ //LED-Flicker

	console.log ("Flickering LED on PIN 4")
var Flickering
Flickering.robot({
	connections: {
		arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' }
	  },
	  devices: {
		led: { driver: 'led', pin: 4 }
	  },
	  work: function(my) {
		every((1).second(), my.led.toggle);
	  }
	}).start();
}