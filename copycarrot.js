#!/usr/bin/env node
"use strict";
const argv = require('optimist').argv;
const FileWatcher = require('./file_watcher.js');
const Transporter = require('./transporter.js');

let config_file = require('./config.json')

let project = argv.project;

if (!project || !config_file[project]) {
  console.log('Please specify a valid project from config.json')
} else {
  let config = config_file[project];

  let watcher = new FileWatcher(config.watch_dir);
  let transporter = new Transporter(config.watch_dir, config.remote_dir);

  watcher.on('saved', function (file) {
    transporter.transfer(file, config.remote_dir);
  });

}