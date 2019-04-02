import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from 'path';
import rimraf from 'rimraf';
import fs from 'fs';

import config from './config';
const app = express();

const IMAGE_PATH = path.join(__dirname, '../public/images');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

const models = require('./models');
models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to SQL database:', config[config.mode].database);
  })
  .catch(err => {
    console.error(
      'Unable to connect to SQL database:',
      config[config.mode].database,
      err
    );
  });

if (config.mode === 'development') {
  // models.sequelize.sync(); //creates table if they do not already exist
  models.sequelize.sync({ force: true }).then(() => {
    // Seed();
    rimraf(IMAGE_PATH, function(error) {
      if (error) {
        console.log('Error: ', error);
      }
      fs.mkdirSync(IMAGE_PATH);
    });
  }); //deletes all tables then recreates them useful for testing and development purposes
} else {
  models.sequelize.sync();
}

require('./routes')(app);
app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to the beginning of nothingness.'
  })
);

//Start server on Port 7000
app.listen(config.port, () => {
  console.log(`Server started on port`, config.port);
});
