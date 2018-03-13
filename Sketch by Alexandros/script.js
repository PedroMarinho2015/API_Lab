var socket = null;

if (document.readyState != 'loading') ready();
else document.addEventListener('DOMContentLoaded', ready);

function ready() {
	const url = 'ws://' + location.host + '/ws';
	socket = new ReconnectingWebsocket(url);
	socket.onmessage = function(evt) {
		logReceived(evt.data);
	};
}

function send(str) {
	socket.send(str);

}

function LightOn(){

	document.getElementById("Light").src="light-on.png"

}

function LightOff(){
	
	document.getElementById("Light").src="light-off.png"

}
