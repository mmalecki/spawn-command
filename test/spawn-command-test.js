var path = require('path'),
    assert = require('assert'),
    spawnCommand = require('../');

var child = spawnCommand('grep commit < ' + path.join(__dirname, 'fixtures', 'commit')),
    stderr = '',
    stdout = '',
    exited = false;

child.stdout.on('data', function (chunk) {
  stdout += chunk;
});

child.stderr.on('data', function (chunk) {
  stderr += chunk;
});

child.on('exit', function (exitCode) {
  exited = true;
  assert.equal(exitCode, 0);
  assert.equal(stdout, 'commit 26b11915b1c16440468a4b5f4b07d2409b98c68c\n');
  assert.equal(stderr, '');
});

process.on('exit', function () {
  assert(exited);
});
