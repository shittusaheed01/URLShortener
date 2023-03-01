import express from 'express';
import cors from 'cors';
import path from 'path'
import { fileURLToPath } from 'url';

const app =express();

import urlRouter from './routes/urlRoutes.js';
import bodyParser from 'body-parser';

app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use("/", urlRouter)




// Handle error for unknown route
app.use("*", (req, res) => {
  const message = "route not found"
  return res.render('error', {message})
    // return res.status(404).json({ message: "route not found" });
  });
  //Error-handling middleware
  app.use((err, req, res, next) => {
    
    // console.log(err);
    let errorStatus;

    errorStatus = err.status || 500;
    if (err.code === 11000) {
       errorStatus = 400,
        err.message= "Custom Url already exists"
    }
    if (err.code === "ENOTFOUND") {
      errorStatus = 400,
        err.message= `${err.hostname} is not a valid url`
    }
  
    return res.render('error', {message: err.message})
    // res.status(errorStatus).send(err.message);

    next();
  });

export default app;
