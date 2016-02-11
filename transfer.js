const q     = require('q');
const qexec = require('./quick_exec.js');

const isIgnored = function (file) {
  const d = q.defer();
  qexec(`git check-ignore "${file}"`).then(function (output) {

    if (output.indexOf(file) != -1) {
      // console.log(output.indexOf(file));
      d.reject();
    } else {
      d.resolve();
    }

  }, function (stderr) {
    d.reject(stderr);
  });
  return d.promise;
};


const transfer = function (file, remote) {
  isIgnored(file).then(function () {

    qexec('rsync --relative "' + file + '" markl@dev31-devc:' + remote).then(function (output) {
      console.log("Transfered " + file);
    });

  });

}

module.exports = transfer;