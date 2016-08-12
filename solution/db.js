var mongoose = require('mongoose');

var dbConn = mongoose.connection;

// CONNECTION EVENTS
dbConn.once('open', function() {
  console.log("Opened mongoose.");
});
dbConn.once('close', function() {
  console.log("Closed mongoose.");
});
dbConn.on('connected', function() {
  console.log('Mongoose connected to ' + dbConn.host + ':' + dbConn.port + '/' + dbConn.name);
});
dbConn.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
dbConn.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  dbConn.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app termination', function() {
    process.exit(0);
  });
});

// our app will not exit until we have disconnected from the dbConn.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

module.exports = {
  quit: quit,
  handleError: handleError
};
