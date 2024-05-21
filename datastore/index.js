const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');
//const Promise = require('bluebird');
//const readFilePromise = Promise.promisify(fs.readFile);

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId(function(err, id) {
    if (err) {
      console.log('Error getting id');
    } else {
      var newFile = path.join(exports.dataDir, `${id}.txt`);
      fs.writeFile(newFile, text, (err) => {
        if (err) {
          throw ('error writing text');
        } else {
          callback(null, { id, text });
        }
      });
    }
  });
};

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      console.log('no files');
    } else {
      var data = files.map(function(file) {
        //return readFilePromise(file).then((fileData) => {
        //return { id: id, text: fileData} }; });
        var id = file.split('.')[0];
        var text = fs.readFileSync(path.join(exports.dataDir, file));

        return ( { id: id, text: text.toString()});

      });
      callback(null, data);
      //Promise.all(data).then((items) => { callback(null, items); })
    }
  });
};


exports.readOne = (id, callback) => {
  fs.readFile(path.join(exports.dataDir, `${id}.txt`), (err, text) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, { id: id, text: text.toString()});
    }
  });
};

exports.update = (id, text, callback) => {
  let filePath = path.join(exports.dataDir, `${id}.txt`);
  fs.readFile(path.join(exports.dataDir, `${id}.txt`), (err, originalText) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {

      fs.writeFile(filePath, text, (err) => {
        if (err) {
          console.log('No item with id');
        } else {
          callback(null, { id: id, text: text.toString()});
        }
      });
    }
  });
};
// var item = items[id];
// if (!item) {
//   callback(new Error(`No item with id: ${id}`));
// } else {
//   items[id] = text;
//   callback(null, { id, text });
// }


exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
