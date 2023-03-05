/* eslint-disable import/no-named-as-default */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/extensions */
// const app = require('./app');
import mongoose from 'mongoose';

import app from './app.js';

import config from './utils/config.js';
// const config = require('./utils/config');
// const mongoose = require('mongoose');

function connectMongo(server) {
    mongoose.set('strictQuery', false);
    mongoose
        .connect(config.mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'URLShortener'
        })
        .then(() =>
            server.listen(config.PORT, () => {
                console.log(
                    `App running at PORT: ${config.PORT} and MongoDB Server started`
                );
            })
        )
        .catch(err => console.log(err));
}

connectMongo(app);
