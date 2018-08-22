//This code sends commands from our app to our Raspberry Pi in real-time
import openSocket from 'socket.io-client';
const  socket = openSocket('http://192.168.10.123:3000');

//Connect to Raspberry Pi on app launch
socket.on('connect', () => {
  console.log("Successfully connected!");
});

//Start of track control functions
function forward() {
  //Here we emit the command to the server on the Pi.
  socket.emit('forward');
  console.log("Forward!");
}

function backward() {
  socket.emit('backward');
  console.log("Backward ajsdhjls!");
}

function turnLeft() {
  socket.emit('left');
  console.log("Left!");
}

function turnRight() {
  socket.emit('right');
  console.log("Right!");
}

//Fire our robot's projectiles
function fire() {
  socket.emit('fire');
  console.log('Fire!');
}

//Export functions so they can be used in our App.js file
export { forward, backward, turnLeft, turnRight, fire };