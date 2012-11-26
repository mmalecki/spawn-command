var util = require('util'),
    spawn = require('child_process').spawn,
    win32 = (process.platform === 'win32');

module.exports = function(command, options) {
  var file, args;
  if(win32) {
    file = 'cmd.exe';
    args = ['/s', '/c'];
    options = util._extend({}, options);
    options.windowsVerbatimArguments = true;
  } else {
    file = '/bin/sh';
    args = ['-c'];
  }
  args = appendCommand(args, command);
  return spawn(file, args, options);
};

function appendCommand(args, command) {
  if(Array.isArray(command)) {
    args = args.concat(command);
  } else {
    args.push(win32 ? '"' + command + '"' : command);    
  }
  return args;
}