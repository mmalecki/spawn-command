var util = require('util'),
    spawn = require('child_process').spawn,
    win32 = (process.platform === 'win32');

module.exports = function(command, options) {
  var file, args;
  if(win32) {
    file = 'cmd.exe';
    args = ['/s', '/c'];
  } else {
    file = '/bin/sh';
    args = ['-c'];
  }
  var cmd = appendCommand(args, command, options);
  return spawn(file, cmd.args, cmd.opts);
};

function appendCommand(args, command, options) {
  if(Array.isArray(command)) {
    args = args.concat(command);
  } else {
    if(win32) {
      command = '"' + command + '"';
      options = util._extend({}, options);
      options.windowsVerbatimArguments = true;
    }
    args.push(command);
  }
  return {
    args: args,
    opts: options
  }
}