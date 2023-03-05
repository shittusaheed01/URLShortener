/* eslint-disable import/extensions */
/* eslint-disable node/no-unsupported-features/es-syntax */
import express from 'express';

import {
    getUrls,
    postUrl,
    getUrlbyShortUrl
} from '../controllers/urlController.js';

const urlRouter = express.Router();

urlRouter.get('/', getUrls);

urlRouter.post('/', postUrl);

urlRouter.get('/:link', getUrlbyShortUrl);

export default urlRouter;
