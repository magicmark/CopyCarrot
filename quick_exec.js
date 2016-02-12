"use strict";

const q     = require('q');
const exec  = require('child_process').exec;

const LastLineRegex = new RegExp('\n$');

class QuickExec {

  constructor (directory) {
    this.options =  { cwd: directory, uid: 1839881517, shell: '/bin/zsh' };
  }

  $(command) {
    var d = q.defer();
    exec(command, this.options, function(err, stdout, stderr) {

      console.log(stderr);

      if (stderr) {
        d.reject(stderr);
      } else {
        d.resolve(stdout.replace(LastLineRegex, ''));
      }
    });

    return d.promise;
  }

}

module.exports = QuickExec;