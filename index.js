// const app = require('./app');
import app from './app.js';

import config from './utils/config.js';
import mongoose from 'mongoose';
// const config = require('./utils/config');
// const mongoose = require('mongoose');


function connectMongo (app){
    mongoose.set("strictQuery", false);
    mongoose
        .connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, dbName:"URLShortener" })
        .then(() => app.listen(config.PORT, ()=>{
          console.log(`App running at PORT: ${config.PORT} and MongoDB Server started`)
          }))
        .catch((err) => console.log(err));
      }
  
  connectMongo(app)
