"use strict";
//let config = require('./config.json');
const EventEmitter = require('events');

class Polygon extends EventEmitter {

  constructor(height, width) {
    super();
    this.height = height;
    this.width = width;
    setTimeout(this.giveArea.bind(this), 50);
  }
  
  giveArea () {
    console.log(this.height * this.width);
    emit('event', 'whoha!')
  }

}

let p = new Polygon(5, 10);
p.on('event', function (yolo) {
  console.log(yolo);
});

// const EventEmitter = require('events');
// let ee = new EventEmitter()
// ee.on('event', function (yolo) {
//   console.log(yolo);
// });
// ee.emit('event', 'shalom');