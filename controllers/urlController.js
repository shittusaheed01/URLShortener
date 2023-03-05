/* eslint-disable import/extensions */
/* eslint-disable node/no-unsupported-features/es-syntax */
import { nanoid } from 'nanoid';
import Url from '../models/urlModel.js';
import isValidUrl from '../utils/urlValidator.js';

export const getUrls = async (req, res, next) => {
    try {
        const urls = await Url.find({}).sort({ createdAt: -1 });
        res.render('home', { urls });
    } catch (error) {
        next(error);
    }
};

export const getUrlbyShortUrl = async (req, res, next) => {
    const { link } = req.params;

    if (!link) {
        return res.render('error', { message: 'please provide a short url' });
    }

    try {
        const result = await Url.findOne({ link: `/${link}` });
        if (!result) {
            return res.render('error', {
                message: 'short url not found in database'
            });
        }

        //increment the read count
        result.read_Count += 1;
        await result.save();

        //redirect to the original URL
        res.redirect(result.originalURL);
    } catch (error) {
        next(error);
    }
};

export const postUrl = async (req, res, next) => {
    const { originalURL, customUrl } = req.body;
    let shortUrl = customUrl;

    if (!customUrl) {
        shortUrl = nanoid(6);
    }
    const link = `/${shortUrl}`;

    isValidUrl(`${originalURL}`)
        .then(() => {
            //Save the URLs in the database
            Url.create({ originalURL, shortUrl, link })
                .then(() => {
                    res.redirect('/');
                }) //check for db error
                .catch(error => {
                    return next(error);
                });
        })
        .catch(error => {
            return next(error);
        });
};
