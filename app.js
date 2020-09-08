const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');

const userRouter = require('./routes/user');
const emailRouter = require('./routes/email');
const houseRouter = require('./routes/house');
const landRouter = require('./routes/land');
const hotelRouter = require('./routes/hotel');
const warehouseRouter = require('./routes/warehouse');

const searchRoutes = require('./routes/search');

const inquiryRoutes = require('./routes/inquiry');
const subscriptionRoutes = require('./routes/subscription');
const propertyRoutes = require('./routes/property');
const dashboardRoutes = require('./routes/dashboard');
const flipbookRoutes = require('./routes/flipbook');
const allAttributes = require('./routes/allAttributes');
const review = require('./routes/review');

const globalErrorHandler = require('./controllers/errorController');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );

  next();
});
// 1) MIDDLEWARES

//Set security HTTP headers
app.use(helmet());

//development logging
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan());
// }

app.use(morgan('dev'));

// Limit requests from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

//body parser - reading data from the body into req.body

app.use(bodyParser.json({ limit: '50mb' }));

//app.use(bodyParser.urlencoded({ extended: false }, { limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 5000,
  })
);
app.use(cookieParser());
//app.use(express.json({ limit: '50mb' }));

//Data Sanitization against NoSql Query Injection
app.use(mongoSanitize());
//Data sanitization against xss

//app.use(express.json({ limit: '10kb' }));
//app.use(express.json());

//app.use(express.static(`${__dirname}/public`));
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });

//test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(res.cookies);
  next();
});

// 3) ROUTES
app.use('/api/users', userRouter);
app.use('/api/admin/email', emailRouter);
app.use('/api/admin/house', houseRouter);
app.use('/api/admin/land', landRouter);
app.use('/api/admin/hotel', hotelRouter);
app.use('/api/admin/warehouse', warehouseRouter);

app.use('/api/search', searchRoutes);

app.use('/api/inquiry', inquiryRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/property', propertyRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/admin/flipbook', flipbookRoutes);
app.use('/api/admin/attributes', allAttributes);

app.use('/api/review', review);

app.use(globalErrorHandler);

module.exports = app;
