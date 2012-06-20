var spawnCommand = require('../');
    child = spawnCommand('echo "Hello spawn" | base64');

child.stdout.on('data', function (data) {
  console.log('data', data.toString());
});

child.on('exit', function (exitCode) {
  console.log('exit', exitCode);
});
