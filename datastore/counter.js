const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

// Your first goal is to save the current state of the counter to the hard drive, so it's persisted between server restarts.
/*
func(null,
input- num
-output- "num"
//reads number
//callbck func that pullls out current counter value
cb must take 2 aruments, data is contents of file
*/



exports.getNextUniqueId = (callback) => {
//  run function
//  success ? return next UID : throw err
//  get current UID
//  use readCounter to get counter

  //  num++
  //  use writecounter to write result to file
  //  convert back toStr
  //  return str

  readCounter(function(err, counter) {
    if (err) {
      console.log('Error reading counter');
    } else {
      counter++;
      writeCounter(counter, function(err, newCount) {
        if (err) {
          callback(err, null);
        } else {
          callback(err, newCount);
        }
      });
    }
  });
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
