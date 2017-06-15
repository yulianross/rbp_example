var socket = require('socket.io-client')('http://fast-oasis-25824.herokuapp.com');
var gpio = require('rpi-gpio');

process.on('SIGINT', function() {
  gpio.write(12, true, function() {
    gpio.destroy(function() {
      process.exit();
    });
  });
});

gpio.setup(12, gpio.DIR_OUT, function() {
  gpio.write(12, true);
});

socket.on('connect', function() {
  console.log('connected to a server');

  socket.on('pinChanged', function(state) {
    console.log(state);
    gpio.write(12, state);

  });
});
