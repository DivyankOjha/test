const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const userRouter = require('./routes/user');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const app = express();
// 1) MIDDLEWARES

//Set security HTTP headers
app.use(helmet());

//development logging
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan());
// }

app.use(morgan('dev'));

//body parser - reading data from the body into req.body
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }, { limit: '50mb' }));

//Data Sanitization against NoSql Query Injection
app.use(mongoSanitize());
//Data sanitization against xss

//app.use(express.json({ limit: '10kb' }));
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });

//test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

app.use('/api/users', userRouter);

module.exports = app;
