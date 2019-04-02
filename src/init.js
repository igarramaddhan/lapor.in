var fs = require('fs');
const path = require('path');

const config = require('./config');
const configs = config[config.mode];

fs.writeFile(
  path.join(__dirname, './config/config.json'),
  `{"${config.mode}":${JSON.stringify(configs)}}`,
  'utf8',
  err => {
    if (err) throw err;

    console.log('The config file was succesfully created!');
  }
);

fs.mkdirSync(path.join(__dirname, '../public'));
fs.mkdirSync(path.join(__dirname, '../public/images'));
