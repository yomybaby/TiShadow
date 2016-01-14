/*
 * Copyright (c) 2011-2014 YY Digital Pty Ltd. All Rights Reserved.
 * Please see the LICENSE file included with this distribution for details.
 */

var config = require("../cli/support/config");
var notifier = require('node-notifier');
var path = require('path');

require('colors');

color = {
  DEBUG: 'blue',
  WARN: 'yellow',
  REPL: 'grey',
  TRACE: 'grey',
  ERROR: 'red',
  FAIL: 'red',
  PASS: 'green',
  COVER : 'yellow'
};

exports.log = function(level, name, msg) {
  var msg =  "[" + level + "] "  
  + (name ? "[" + name + "] ": "")
  + msg;
  if (color[level]) {
    msg = msg[color[level]];
  };
  if (config.isREPL) {
    process.stdout.write("\r" + msg + "\n> ");
  }else {
    console.log(msg);
  }
  
  if(level == 'ERROR'){
    notifier.notify({
      icon: path.join(__dirname,'..','app','Resources','iphone','appicon@2x.png'),
      title: 'TiShdow',
      // message: (name ? "[" + name + "] ": "") + msg,
      message: msg.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,''), //remove color ansi strings
      sticky : true
    });
  }
};

var levels = ['info','debug','error','warn', 'cover'];
levels.forEach(function(level) {
  exports[level] = function(msg) {
    exports.log(level.toUpperCase(),null,msg);
  };
});
