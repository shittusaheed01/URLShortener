import Url from '../models/urlModel.js';
import { nanoid } from 'nanoid';
import slug from 'slug'
import { isValidUrl } from '../utils/urlValidator.js';

export const getUrls = async(req, res, next) => {
  req.page = 0 * 1
  console.log(req.page, "get URL")
  try {
    const urls = await Url.find({}).sort({createdAt: -1})
    res.render('home', {urls})
  } catch (error) {
    next(error)
  }
  }

export const getUrlbyShortUrl = async(req, res, next) => {
    const {link} = req.params;
    console.log(link)
    if(!link){
      return res.render('error', {message: "please provide a short url"})
    }
    
    try {
      const result = await Url.findOne({link: `/${link}`});
      console.log(result)

      if(!result){
        return res.render('error', {message: "short url not found in database"})
      }
      
      //increment the read count
      result.read_Count += 1;
      await result.save();

      //redirect to the original URL
      res.redirect(result.originalURL)

    } catch (error) {
      next(error)
      
    }
  }

export const postUrl = async(req, res, next) => {
    const { originalURL, customUrl } = req.body;
    let shortUrl = customUrl;

    if(!customUrl){
   shortUrl= nanoid(6);
  }


  isValidUrl(`${originalURL}`)
  .then(result => {
    //Save the URLs in the database
      Url.create({ originalURL, shortUrl, link:`/${slug(shortUrl)}`})
        .then(result => {
          res.redirect('/')
        }) //check for db error
        .catch(error => {
          return next(error)
        });
    })
    .catch(error => {
      return next(error)
    } );
  }