"use strict";
const q     = require('q');
const QuickExec = require('./quick_exec.js');


class Transporter {

  constructor (local_path, remote_path) {
    this.local_path  = local_path;
    this.remote_path = remote_path;
    this.qexec       = new QuickExec(local_path);
  }

  _isIgnored (file) {
    const d = q.defer();
    this.qexec.$(`git check-ignore "${file}"`).then(function (output) {

      if (output.indexOf(file) != -1) {
        d.reject();
      } else {
        d.resolve();
      }

    }, function (stderr) {
      d.reject(stderr);
    });
    return d.promise;
  }


  transfer (file) {
    this._isIgnored(file).then(() => {
      const command = `rsync --relative "${file}" markl@dev31-devc:${this.remote_path}`;
      this.qexec.$(command).then((output) => {
        console.log("Transfered " + file);
      });
    });
  }

}

module.exports = Transporter;