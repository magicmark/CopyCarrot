const q     = require('q');
const exec  = require('child_process').exec;

const LastLineRegex = new RegExp('\n$');

module.exports = function (command, directory) {
  const d = q.defer();
  const options =  { cwd: '/Users/markl/vpg/yelp-main', uid: 1839881517, shell: '/bin/zsh' };

  exec(command, options, function(err, stdout, stderr) {
    if (stderr) {
      d.reject(stderr);
    } else {
      d.resolve(stdout.replace(LastLineRegex, ''));
    }
  });

  return d.promise;
};