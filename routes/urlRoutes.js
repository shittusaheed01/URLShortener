import express from 'express';


const urlRouter = express.Router();
import { getUrls, getUrlbyShortUrl, postUrl} from '../controllers/urlController.js';

urlRouter.get('/', getUrls);


urlRouter.post('/',postUrl);


urlRouter.get('/:link', getUrlbyShortUrl);

export  default urlRouter;