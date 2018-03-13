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
