"use strict";
const watch = require('watch');
const EventEmitter = require('events');

class FileWatcher extends EventEmitter {

  constructor(local_dir) {
    super();
    this.local_dir = local_dir;
    this.startWatch();
  }

  startWatch() {
    watch.watchTree(
      this.local_dir,
      {
        'ignoreDotFiles': true
      },
      this.handleFiles.bind(this)
    )
  }

  handleFiles(file, curr, prev) {
    if (typeof file == "object" && prev === null && curr === null) {
      // Finished walking the tree
    } else if (prev === null) {
      // file is a new file
    } else if (curr.nlink === 0) {
      // file was removed
    } else {
      let relativeFilePath = file.replace(this.local_dir, '');
      this.emit('saved', relativeFilePath);
    }
  }

}

module.exports = FileWatcher;

// watch.watchTree(
//   '/Users/markl/vpg/yelp-main',
//   { 
//     'ignoreDotFiles': true
//   },
//   function (f, curr, prev) {
//     if (typeof f == "object" && prev === null && curr === null) {
//       // Finished walking the tree
//     } else if (prev === null) {
//       // f is a new file
//     } else if (curr.nlink === 0) {
//       // f was removed
//     } else {
//       const relativeFilePath = f.replace('/Users/markl/vpg/yelp-main/', '');
//       transfer(relativeFilePath);
//     }
//   }
// );