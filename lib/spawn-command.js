var spawn = require('child_process').spawn;

module.exports = function (command, options) {
  var file, args;
  if (process.platform === 'win32') {
    file = 'cmd.exe';
    args = ['/s', '/c', '"' + command + '"'];
    options = Object.assign({}, options);
    options.windowsVerbatimArguments = true;
  }
  else {
    file = '/bin/sh';
    args = ['-c', command];
  }
  return spawn(file, args, options);
};
