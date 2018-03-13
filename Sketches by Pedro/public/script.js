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

function turnMixerON(){

	console.log("Mixer is ON");
	document.getElementById("mixer").src="mixer.gif"

}

function turnMixerOFF(){
	
	console.log("Mixer is OFF");
	document.getElementById("mixer").src="still.jpg"

}
