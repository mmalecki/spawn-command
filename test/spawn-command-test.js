var path = require('path'),
    assert = require('assert'),
    assertCalled = require('assert-called'),
    spawnCommand = require('../');

var grep = (process.platform === 'win32') ? 'findstr' : 'grep';
var fixture = path.join(__dirname, 'fixtures', 'commit');

test(grep + ' commit < ' + fixture);  // test string (concatenated) command
test([grep, 'commit', '<', fixture]); // test array command

function test(command) {
  var child = spawnCommand(command),
      stderr = '',
      stdout = '',
      exited = false;

  child.stdout.on('data', function(chunk) {
    stdout += chunk;
  });

  child.stderr.on('data', function(chunk) {
    stderr += chunk;
  });

  child.on('exit', assertCalled(function(exitCode) {
    assert.equal(exitCode, 0);
    assert.equal(stdout, 'commit 26b11915b1c16440468a4b5f4b07d2409b98c68c\n');
    assert.equal(stderr, '');
  }));
}