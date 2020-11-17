const catchAsync = require('../utils/catchAsync');
const request = require('request');
const Subs = require('../models/subscriptionModel');
const subTransaction = require('../models/subTransactionModel');
let fbImage = '../public/media/fb.jpeg';
const User = require('../models/userModel');

var PesaPal = require('pesapal')({
  consumerKey: 'RxVe4OeX7xkoUM1WeafMz42oGmW9ebDW',
  consumerSecret: 'GCHX2mpD00Lwlq16Ej7ix1ZNzGI=',
  testing: true,
});

const querySearch = require('stringquery');
const sendEmail = require('../utils/email');

/****************************************** */
exports.gatway = catchAsync(async (req, res, next) => {
  let body, response;
  request.get(
    'https://demo.pesapal.com/api/QueryPaymentDetails?oauth_consumer_key=RxVe4OeX7xkoUM1WeafMz42oGmW9ebDW&oauth_nonce=6icGm&oauth_signature=MjWhsBiPwUXbgmUcCDbwTqLR2p0%3D&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1604655972&pesapal_merchant_reference=12erwe&pesapal_transaction_tracking_id=40b2fce6-15b5-41e5-9d29-9b184b7d4856',

    catchAsync(async function (error, response, body) {
      res.status(200).json({
        status: 'success',
        body,
        response,
      });
    })
  );
});
/********************************************** */
exports.paymentgateway = catchAsync(async (req, res, next) => {
  let user = req.user;

  var postParams = {
    oauth_callback: 'http://localhost:3000/post-payment',
  };
  if (req.body.type === 'buy') {
    data = {
      subscriptionType: 'buy',
      userID: user._id,
      subscriptionAmount: 10000,
      email: user.email,
      totalpoints: 1500,
    };
    let createTransaction = await subTransaction.create(data);

    var requestData = {
      Amount: 10000,
      Description: 'buy',
      Type: 'MERCHANT',
      Reference: createTransaction._id,
      FirstName: user.firstname,
      LastName: user.lastname,
      Email: user.email,
      PhoneNumber: user.mobilenumber || '',
    };
  }
  if (req.body.type === 'let') {
    data = {
      subscriptionType: 'rent',
      userID: user._id,
      subscriptionAmount: 3000,
      email: user.email,
      totalpoints: 1500,
    };

    let createTransaction = await subTransaction.create(data);

    var requestData = {
      Amount: 3000,
      Description: 'let',
      Type: 'MERCHANT',
      Reference: createTransaction._id,
      FirstName: user.firstname,
      LastName: user.lastname,
      Email: user.email,
      PhoneNumber: user.mobilenumber || '',
    };
  }

  var url = PesaPal.postDirectOrder(postParams, requestData);

  var message = 'Thank you for doing business with us.';
  res.status(200).json({
    status: 'success',
    data: {
      requestData,
      url,
    },
  });
});

exports.paymentStatus = catchAsync(async (req, res, next) => {
  const obj = querySearch(req.body.path);

  var postParams1 = {
    pesapal_merchant_reference: obj.pesapal_merchant_reference,
    pesapal_transaction_tracking_id: obj.pesapal_transaction_tracking_id,
  };

  var url1 = PesaPal.queryPaymentStatus(postParams1);

  request.get(
    `${url1}`,

    catchAsync(async function (error, response, body) {
      let user = req.user;

      let Tstatus = body.split('=');
      let abc = Tstatus[1];

      let dce = abc.toString();

      const words = obj.pesapal_transaction_tracking_id.split('=');

      if (dce === 'PENDING' || dce === 'COMPLETED') {
        const getdata = await subTransaction.findById({
          _id: obj.pesapal_transaction_tracking_id,
        });

        if (getdata) {
          let userID = getdata.userID;
          let type = getdata.subscriptionType;

          const getUser = await User.findById({ _id: userID });

          const getSub = await Subs.findOne({ userID: userID });

          if (getSub) {
            const newSub = await Subs.findOne({ userID: userID });

            if (type === 'buy') {
              let currentTotalPoints = newSub.totalpoints.buy;
              let newTotalPoints = currentTotalPoints + getdata.totalpoints;
              let subscriptionFrequency = newSub.subscriptionFrequency;
              let newsubscriptionFrequency = subscriptionFrequency + 1;

              const renewSub = await Subs.findByIdAndUpdate(
                { _id: newSub._id },
                {
                  $set: {
                    'subscriptionType.buy': true,
                    'subscriptionAmount.buy': getdata.subscriptionAmount,
                    'totalpoints.buy': newTotalPoints,
                    subscriptionFrequency: newsubscriptionFrequency,
                  },
                }
              );

              const getUser = await User.findById({ _id: userID });
              const updateInUser = await User.findByIdAndUpdate(
                { _id: newSub.userID },
                {
                  $set: { isSubscribedBuy: true },
                }
              );

              const updateInNewSub = await Subs.findByIdAndUpdate(
                { _id: newSub._id },
                {
                  $set: { email: getUser.email },
                }
              );

              const message = `<!DOCTYPE html5>
<html>
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=euc-jp">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Columbuslost | OTP</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <style>
        html,
                body {
                    font-family: 'Montserrat', sans-serif;
                    background-color: #fff!important;
                    margin: 0 auto !important;
                    padding: 0 !important;
                    height: 100% !important;
                    width: 100% !important;
                    color:#888!important;
                }
                
                .email-container{
                    border-radius: 20px;
                    border-top: 4px solid #faa500;
                    border-left: 3px solid #faa500;
                    border-right: 3px solid #faa500;
                    border-bottom: 8px solid #faa500;
                        max-width: 800px!important;
                        margin: 10px auto!important;
                    }
                * {
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                }
                
                div[style*="margin: 16px 0"] {
                    margin: 0 !important;
                }
                table,
                td {
                    mso-table-lspace: 0pt !important;
                    mso-table-rspace: 0pt !important;
                }
                
                table { width: 100%;
                    border-spacing: 0 !important;
                    border-collapse: collapse !important;
                    table-layout: fixed !important;
                    margin: 0 auto !important;
                }
                
                img {
                    -ms-interpolation-mode:bicubic;
                }
                
                a {
                    text-decoration: none!important;
                }
                
                *[x-apple-data-detectors],  
                .unstyle-auto-detected-links *,
                .aBn {
                    border-bottom: 0 !important;
                    cursor: default !important;
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                }
                @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                    u ~ div .email-container {
                        min-width: 320px !important;
                    }
                
                }
                
                @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                    u ~ div .email-container {
                        min-width: 375px !important;
                    }
                }
                
                
                @media only screen and (min-device-width: 414px) {
                    u ~ div .email-container {
                        min-width: 414px !important;
                    }
                }
    </style>
</head>

<body>
    <div class="email-container">
        <table style="border-bottom: 2px solid #faa500;background-color: black;border-top-left-radius: 15px;border-top-right-radius: 15px; ">
            <tr>
                <td align="center">
                    <img src="https://cuboidtechnologies.com/static/media/cuboid.04182065.png" style="width: 10%">
                </td>
            </tr>
            <tr>
                <td align="center">
                    <h1 style="color:#faa500;  margin-bottom: 0px;font-size: 22px;
                     text-align: center;"> Hi, ${getUser.firstname}, Congratulations!  Your Subscription has been activated!
                   </h1>
                </td>
            </tr>
        </table>
        <table style="color: #000;font-size: 20px; text-align: inherit; ">
            <tr>
                <td style="font-size: 17px; padding: 12px;">You signed up - now it's time to search for properties like a hero within the shortest time possible</td>
            </tr>
            <tr>
                <td style="text-align: inherit; font-size: 17px;padding: 10px 0px;padding: 12px;">You can start at our <a href="https://cuboidtechnologies.com" target="_blank" style="color: gold;"> Home page</a> we have classified the properties in a way that get you started easily.</td>
            </tr>
            <tr>
                <td style="font-size: 17px; padding: 10px 0px;text-align: justify;position: relative;
                 right: 0px;padding: 12px;">You then specify the features of that house or that land or a hotel that you have in mind.</td>
            </tr>
            <tr>
                <td style="font-size: 17px; padding: 10px 0px;   position: relative; text-align: justify;padding: 12px;">Please note you can be as specific as possible or as general as you want.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Feel free to pray with the different selectors and see how many items are getting displayed.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Once you are satisfied that we have displayed the number of items that are easy to evaluate, <span style="color: gold;">save</span> your search as a <span style="color: gold;">flip book</span>.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Flip book ensures that on your next visit you will not start all over again.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Moreover the flip book has been designed to create a feel as if you are reading a newspaper.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Flip through the pages, move on, and explore the images in a 360 degrees view and virtual tours.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Flip through the pages, move on, and explore the images in a <span style="color: gold;">360 degrees view</span> and<span style="color: gold;"> virtual tours</span>.</td>
            </tr>
        </table>

        <table class="table table-borderless" style=" background: black;  color: white;
             font-size: 10px;">
            <tbody>
                <tr>
                    <td style=" width: 31%; text-align: center; padding: 15px;">
                        <table>
                            <tr>
                                <td scope="col">
                                    <img src="https://cuboidtechnologies.com/static/media/cuboid.04182065.png" style="width: 30%; position: relative; left: 0px;">
                                </td>
                            </tr>
                            <tr>
                                <td scope="col"><a href="" style="color: white;">care@cuboidtechnologies.com</a>
                                </td>
                            </tr>
                            <tr>
                                <td><a href="" style="color: white;">martin@cuboidtechnologies.com</a>
                                </td>
                            </tr>
                            <tr>
                                <td><a href="" style="color: white; text-align: center;">grace@cuboidtechnologies.com</a>
                                </td>
                            </tr>

                        </table>
                    </td>
                    <td style="width: 63%;position: relative; left: 4px;">
                        <table>
                            <tr>
                                <td scope="col" style="text-align: inherit; color: #faa500; font-weight: bold;text-align: center;">Contact US</td>
                                <!-- <td scope="col" style="text-align: inherit; color: #faa500; font-weight: bold;">Quick Links</td> -->
                                <td scope="col" style="text-align: inherit; color: #faa500; font-weight: bold;text-align: center;">Download the app</td>
                            </tr>
                            <td style="position: relative;top: 18px;text-align: center;">In case you need support call us
                                <br>on our hotline</td>
                            <!--  <td><a href="" style=" position: relative; top: 17px;color: white;">Home</a></td> -->
                            <td style="text-align: center;">
                                <a href="">
                                    <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" style="width: 117px; position: relative; top: 20px; left: 0px;">
                                </a>
                            </td>
                </tr>
                <tr>
                    <td style="text-align: center;"><a href="" style="color: white; position: relative;top: 17px;left: 0px;">+254770820696 </a>
                    </td>
                    <!-- <td><a href="" style="color: white;">Contact Us</a></td> -->
                    <td style=" position: relative; top: 15px; text-align: center;">Thank You,</td>
                </tr>
                <tr>
                    <td style="position: relative;top: 17px;text-align: center;">Email US</td>
                    <!-- <td><a href="" style="color: white;">About Us</a></td> -->
                    <td style="position: relative; top: 18px; text-align: center;">Martin</td>
                </tr>
                <tr>
                    <td style="text-align: center;"><a href="" style="color: white;position: relative;top: 17px;left: 0px;">care@cuboid<br>technologies.com</a>
                    </td>
                    <!-- <td><a href="" style="color: white;">FAQ</a></td> -->
                    <td style="position: relative;top: 18px;text-align: center;">Co-founder cuboid
                        <br>Technologies Ltd.</td>
                </tr>
                <tr>
                    <td></td>
                    
                </tr>
                <tr>
                    <td></td>
                  
                </tr>
                <tr>
                    <td></td>
                   
                </tr>
                </table>
                </td>
                </tr>
            </tbody>
            <tr>
                <td style="padding: 15px; text-align: center;">
                    <a href="https://www.facebook.com/">
                        <img src="https://cuboidtechnologies.com/media/fb.png">
                    </a>
                    <a href="https://in.linkedin.com/">
                        <img src="https://cuboidtechnologies.com/media/link.png" style="position: relative;left: 5px;">
                    </a>
                    <a href="https://twitter.com/">
                        <img src="https://cuboidtechnologies.com/media/twi.png" style="position: relative;left: 10px;">
                    </a>
                    <a href="https://www.instagram.com/">
                        <img src="https://cuboidtechnologies.com/media/insta.png" style="position: relative;left: 15px;">
                    </a>
                </td>
            </tr>
        
        </table>
    </div>
</body>
</html>`;

              await sendEmail({
                email: getUser.email,
                subject: `Hi, ${getUser.firstname}, Congratulations! Your Subscription for BUY PACK has been activated`,

                message,
              });
            } else if (type === 'rent') {
              let currentTotalPoints = newSub.totalpoints.rent;
              let newTotalPoints = currentTotalPoints + getdata.totalpoints;
              let subscriptionFrequency = newSub.subscriptionFrequency;
              let newsubscriptionFrequency = subscriptionFrequency + 1;
              const renewSub = await Subs.findByIdAndUpdate(
                { _id: newSub._id },
                {
                  $set: {
                    'subscriptionType.rent': true,
                    'subscriptionAmount.rent': getdata.subscriptionAmount,
                    'totalpoints.rent': newTotalPoints,
                    subscriptionFrequency: newsubscriptionFrequency,
                  },
                }
              );

              const updateInUser = await User.findByIdAndUpdate(
                { _id: newSub.userID },
                {
                  $set: { isSubscribedRent: true },
                }
              );
              const updateInNewSub = await Subs.findByIdAndUpdate(
                { _id: newSub._id },
                {
                  $set: { email: updateInUser.email },
                }
              );

              const message = `<!DOCTYPE html5>
<html>
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=euc-jp">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Columbuslost | OTP</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <style>
        html,
                body {
                    font-family: 'Montserrat', sans-serif;
                    background-color: #fff!important;
                    margin: 0 auto !important;
                    padding: 0 !important;
                    height: 100% !important;
                    width: 100% !important;
                    color:#888!important;
                }
                
                .email-container{
                    border-radius: 20px;
                    border-top: 4px solid #faa500;
                    border-left: 3px solid #faa500;
                    border-right: 3px solid #faa500;
                    border-bottom: 8px solid #faa500;
                        max-width: 800px!important;
                        margin: 10px auto!important;
                    }
                * {
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                }
                
                div[style*="margin: 16px 0"] {
                    margin: 0 !important;
                }
                table,
                td {
                    mso-table-lspace: 0pt !important;
                    mso-table-rspace: 0pt !important;
                }
                
                table { width: 100%;
                    border-spacing: 0 !important;
                    border-collapse: collapse !important;
                    table-layout: fixed !important;
                    margin: 0 auto !important;
                }
                
                img {
                    -ms-interpolation-mode:bicubic;
                }
                
                a {
                    text-decoration: none!important;
                }
                
                *[x-apple-data-detectors],  
                .unstyle-auto-detected-links *,
                .aBn {
                    border-bottom: 0 !important;
                    cursor: default !important;
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                }
                @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                    u ~ div .email-container {
                        min-width: 320px !important;
                    }
                
                }
                
                @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                    u ~ div .email-container {
                        min-width: 375px !important;
                    }
                }
                
                
                @media only screen and (min-device-width: 414px) {
                    u ~ div .email-container {
                        min-width: 414px !important;
                    }
                }
    </style>
</head>

<body>
    <div class="email-container">
        <table style="border-bottom: 2px solid #faa500;background-color: black;border-top-left-radius: 15px;border-top-right-radius: 15px; ">
            <tr>
                <td align="center">
                    <img src="https://cuboidtechnologies.com/static/media/cuboid.04182065.png" style="width: 10%">
                </td>
            </tr>
            <tr>
                <td align="center">
                    <h1 style="color:#faa500;  margin-bottom: 0px;font-size: 22px;
                     text-align: center;"> Hi, ${getUser.firstname}, Congratulations!  Your Subscription has been activated!
                   </h1>
                </td>
            </tr>
        </table>
        <table style="color: #000;font-size: 20px; text-align: inherit; ">
            <tr>
                <td style="font-size: 17px; padding: 12px;">You signed up - now it's time to search for properties like a hero within the shortest time possible</td>
            </tr>
            <tr>
                <td style="text-align: inherit; font-size: 17px;padding: 10px 0px;padding: 12px;">You can start at our <a href="https://cuboidtechnologies.com" target="_blank" style="color: gold;"> Home page</a> we have classified the properties in a way that get you started easily.</td>
            </tr>
            <tr>
                <td style="font-size: 17px; padding: 10px 0px;text-align: justify;position: relative;
                 right: 0px;padding: 12px;">You then specify the features of that house or that land or a hotel that you have in mind.</td>
            </tr>
            <tr>
                <td style="font-size: 17px; padding: 10px 0px;   position: relative; text-align: justify;padding: 12px;">Please note you can be as specific as possible or as general as you want.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Feel free to pray with the different selectors and see how many items are getting displayed.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Once you are satisfied that we have displayed the number of items that are easy to evaluate, <span style="color: gold;">save</span> your search as a <span style="color: gold;">flip book</span>.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Flip book ensures that on your next visit you will not start all over again.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Moreover the flip book has been designed to create a feel as if you are reading a newspaper.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Flip through the pages, move on, and explore the images in a 360 degrees view and virtual tours.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Flip through the pages, move on, and explore the images in a <span style="color: gold;">360 degrees view</span> and<span style="color: gold;"> virtual tours</span>.</td>
            </tr>
        </table>

        <table class="table table-borderless" style=" background: black;  color: white;
             font-size: 10px;">
            <tbody>
                <tr>
                    <td style=" width: 31%; text-align: center; padding: 15px;">
                        <table>
                            <tr>
                                <td scope="col">
                                    <img src="https://cuboidtechnologies.com/static/media/cuboid.04182065.png" style="width: 30%; position: relative; left: 0px;">
                                </td>
                            </tr>
                            <tr>
                                <td scope="col"><a href="" style="color: white;">care@cuboidtechnologies.com</a>
                                </td>
                            </tr>
                            <tr>
                                <td><a href="" style="color: white;">martin@cuboidtechnologies.com</a>
                                </td>
                            </tr>
                            <tr>
                                <td><a href="" style="color: white; text-align: center;">grace@cuboidtechnologies.com</a>
                                </td>
                            </tr>

                        </table>
                    </td>
                    <td style="width: 63%;position: relative; left: 4px;">
                        <table>
                            <tr>
                                <td scope="col" style="text-align: inherit; color: #faa500; font-weight: bold;text-align: center;">Contact US</td>
                                <!-- <td scope="col" style="text-align: inherit; color: #faa500; font-weight: bold;">Quick Links</td> -->
                                <td scope="col" style="text-align: inherit; color: #faa500; font-weight: bold;text-align: center;">Download the app</td>
                            </tr>
                            <td style="position: relative;top: 18px;text-align: center;">In case you need support call us
                                <br>on our hotline</td>
                            <!--  <td><a href="" style=" position: relative; top: 17px;color: white;">Home</a></td> -->
                            <td style="text-align: center;">
                                <a href="">
                                    <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" style="width: 117px; position: relative; top: 20px; left: 0px;">
                                </a>
                            </td>
                </tr>
                <tr>
                    <td style="text-align: center;"><a href="" style="color: white; position: relative;top: 17px;left: 0px;">+254770820696 </a>
                    </td>
                    <!-- <td><a href="" style="color: white;">Contact Us</a></td> -->
                    <td style=" position: relative; top: 15px; text-align: center;">Thank You,</td>
                </tr>
                <tr>
                    <td style="position: relative;top: 17px;text-align: center;">Email US</td>
                    <!-- <td><a href="" style="color: white;">About Us</a></td> -->
                    <td style="position: relative; top: 18px; text-align: center;">Martin</td>
                </tr>
                <tr>
                    <td style="text-align: center;"><a href="" style="color: white;position: relative;top: 17px;left: 0px;">care@cuboid<br>technologies.com</a>
                    </td>
                    <!-- <td><a href="" style="color: white;">FAQ</a></td> -->
                    <td style="position: relative;top: 18px;text-align: center;">Co-founder cuboid
                        <br>Technologies Ltd.</td>
                </tr>
                <tr>
                    <td></td>
                    
                </tr>
                <tr>
                    <td></td>
                  
                </tr>
                <tr>
                    <td></td>
                   
                </tr>
                </table>
                </td>
                </tr>
            </tbody>
            <tr>
                <td style="padding: 15px; text-align: center;">
                    <a href="https://www.facebook.com/">
                        <img src="https://cuboidtechnologies.com/media/fb.png">
                    </a>
                    <a href="https://in.linkedin.com/">
                        <img src="https://cuboidtechnologies.com/media/link.png" style="position: relative;left: 5px;">
                    </a>
                    <a href="https://twitter.com/">
                        <img src="https://cuboidtechnologies.com/media/twi.png" style="position: relative;left: 10px;">
                    </a>
                    <a href="https://www.instagram.com/">
                        <img src="https://cuboidtechnologies.com/media/insta.png" style="position: relative;left: 15px;">
                    </a>
                </td>
            </tr>
        
        </table>
    </div>
</body>
</html>`;

              await sendEmail({
                email: updateInUser.email,
                subject: `Hi, ${updateInUser.firstname}, Congratulations! Your Subscription for RENT PACK has been activated`,
                message,
              });
            }
          } else {
            const getUser = await User.findById({ _id: getdata.userID });

            let data = {};
            if (getdata.subscriptionType === 'buy') {
              data = {
                userID: getdata.userID,
                'subscriptionType.buy': true,
                'subscriptionAmount.buy': getdata.subscriptionAmount,
                'totalpoints.buy': getdata.totalpoints,
                email: getdata.email,
              };
            }

            if (getdata.subscriptionType === 'rent') {
              data = {
                userID: getdata.userID,
                'subscriptionType.rent': true,
                'subscriptionAmount.rent': getdata.subscriptionAmount,
                'totalpoints.rent': getdata.totalpoints,
                email: getdata.email,
              };
            }

            const newSub = await Subs.create(data);

            // update issubscribed true in user
            if (getdata.subscriptionType === 'buy') {
              const updateInUser1 = await User.findByIdAndUpdate(
                { _id: newSub.userID },
                {
                  $set: { isSubscribedBuy: true },
                }
              );
            }
            if (getdata.subscriptionType === 'rent') {
              const updateInUser2 = await User.findByIdAndUpdate(
                { _id: newSub.userID },
                {
                  $set: { isSubscribedRent: true },
                }
              );
            }

            const updateInNewSub = await Subs.findByIdAndUpdate(
              { _id: newSub._id },
              {
                $set: { email: getUser.email },
              }
            );

            const message = `<!DOCTYPE html5>
<html>
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=euc-jp">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Columbuslost | OTP</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <style>
        html,
                body {
                    font-family: 'Montserrat', sans-serif;
                    background-color: #fff!important;
                    margin: 0 auto !important;
                    padding: 0 !important;
                    height: 100% !important;
                    width: 100% !important;
                    color:#888!important;
                }
                
                .email-container{
                    border-radius: 20px;
                    border-top: 4px solid #faa500;
                    border-left: 3px solid #faa500;
                    border-right: 3px solid #faa500;
                    border-bottom: 8px solid #faa500;
                        max-width: 800px!important;
                        margin: 10px auto!important;
                    }
                * {
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                }
                
                div[style*="margin: 16px 0"] {
                    margin: 0 !important;
                }
                table,
                td {
                    mso-table-lspace: 0pt !important;
                    mso-table-rspace: 0pt !important;
                }
                
                table { width: 100%;
                    border-spacing: 0 !important;
                    border-collapse: collapse !important;
                    table-layout: fixed !important;
                    margin: 0 auto !important;
                }
                
                img {
                    -ms-interpolation-mode:bicubic;
                }
                
                a {
                    text-decoration: none!important;
                }
                
                *[x-apple-data-detectors],  
                .unstyle-auto-detected-links *,
                .aBn {
                    border-bottom: 0 !important;
                    cursor: default !important;
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                }
                @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                    u ~ div .email-container {
                        min-width: 320px !important;
                    }
                
                }
                
                @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                    u ~ div .email-container {
                        min-width: 375px !important;
                    }
                }
                
                
                @media only screen and (min-device-width: 414px) {
                    u ~ div .email-container {
                        min-width: 414px !important;
                    }
                }
    </style>
</head>

<body>
    <div class="email-container">
        <table style="border-bottom: 2px solid #faa500;background-color: black;border-top-left-radius: 15px;border-top-right-radius: 15px; ">
            <tr>
                <td align="center">
                    <img src="https://cuboidtechnologies.com/static/media/cuboid.04182065.png" style="width: 10%">
                </td>
            </tr>
            <tr>
                <td align="center">
                    <h1 style="color:#faa500;  margin-bottom: 0px;font-size: 22px;
                     text-align: center;"> Hi, ${getUser.firstname}, Congratulations!  Your Subscription has been activated!
                   </h1>
                </td>
            </tr>
        </table>
        <table style="color: #000;font-size: 20px; text-align: inherit; ">
            <tr>
                <td style="font-size: 17px; padding: 12px;">You signed up - now it's time to search for properties like a hero within the shortest time possible</td>
            </tr>
            <tr>
                <td style="text-align: inherit; font-size: 17px;padding: 10px 0px;padding: 12px;">You can start at our <a href="https://cuboidtechnologies.com" target="_blank" style="color: gold;"> Home page</a> we have classified the properties in a way that get you started easily.</td>
            </tr>
            <tr>
                <td style="font-size: 17px; padding: 10px 0px;text-align: justify;position: relative;
                 right: 0px;padding: 12px;">You then specify the features of that house or that land or a hotel that you have in mind.</td>
            </tr>
            <tr>
                <td style="font-size: 17px; padding: 10px 0px;   position: relative; text-align: justify;padding: 12px;">Please note you can be as specific as possible or as general as you want.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Feel free to pray with the different selectors and see how many items are getting displayed.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Once you are satisfied that we have displayed the number of items that are easy to evaluate, <span style="color: gold;">save</span> your search as a <span style="color: gold;">flip book</span>.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Flip book ensures that on your next visit you will not start all over again.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Moreover the flip book has been designed to create a feel as if you are reading a newspaper.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Flip through the pages, move on, and explore the images in a 360 degrees view and virtual tours.</td>
            </tr>
            <tr>
                <td style="font-size: 17px;  padding: 10px 0px;  position: relative;padding: 12px;">Flip through the pages, move on, and explore the images in a <span style="color: gold;">360 degrees view</span> and<span style="color: gold;"> virtual tours</span>.</td>
            </tr>
        </table>

        <table class="table table-borderless" style=" background: black;  color: white;
             font-size: 10px;">
            <tbody>
                <tr>
                    <td style=" width: 31%; text-align: center; padding: 15px;">
                        <table>
                            <tr>
                                <td scope="col">
                                    <img src="https://cuboidtechnologies.com/static/media/cuboid.04182065.png" style="width: 30%; position: relative; left: 0px;">
                                </td>
                            </tr>
                            <tr>
                                <td scope="col"><a href="" style="color: white;">care@cuboidtechnologies.com</a>
                                </td>
                            </tr>
                            <tr>
                                <td><a href="" style="color: white;">martin@cuboidtechnologies.com</a>
                                </td>
                            </tr>
                            <tr>
                                <td><a href="" style="color: white; text-align: center;">grace@cuboidtechnologies.com</a>
                                </td>
                            </tr>

                        </table>
                    </td>
                    <td style="width: 63%;position: relative; left: 4px;">
                        <table>
                            <tr>
                                <td scope="col" style="text-align: inherit; color: #faa500; font-weight: bold;text-align: center;">Contact US</td>
                                <!-- <td scope="col" style="text-align: inherit; color: #faa500; font-weight: bold;">Quick Links</td> -->
                                <td scope="col" style="text-align: inherit; color: #faa500; font-weight: bold;text-align: center;">Download the app</td>
                            </tr>
                            <td style="position: relative;top: 18px;text-align: center;">In case you need support call us
                                <br>on our hotline</td>
                            <!--  <td><a href="" style=" position: relative; top: 17px;color: white;">Home</a></td> -->
                            <td style="text-align: center;">
                                <a href="">
                                    <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" style="width: 117px; position: relative; top: 20px; left: 0px;">
                                </a>
                            </td>
                </tr>
                <tr>
                    <td style="text-align: center;"><a href="" style="color: white; position: relative;top: 17px;left: 0px;">+254770820696 </a>
                    </td>
                    <!-- <td><a href="" style="color: white;">Contact Us</a></td> -->
                    <td style=" position: relative; top: 15px; text-align: center;">Thank You,</td>
                </tr>
                <tr>
                    <td style="position: relative;top: 17px;text-align: center;">Email US</td>
                    <!-- <td><a href="" style="color: white;">About Us</a></td> -->
                    <td style="position: relative; top: 18px; text-align: center;">Martin</td>
                </tr>
                <tr>
                    <td style="text-align: center;"><a href="" style="color: white;position: relative;top: 17px;left: 0px;">care@cuboid<br>technologies.com</a>
                    </td>
                    <!-- <td><a href="" style="color: white;">FAQ</a></td> -->
                    <td style="position: relative;top: 18px;text-align: center;">Co-founder cuboid
                        <br>Technologies Ltd.</td>
                </tr>
                <tr>
                    <td></td>
                    
                </tr>
                <tr>
                    <td></td>
                  
                </tr>
                <tr>
                    <td></td>
                   
                </tr>
                </table>
                </td>
                </tr>
            </tbody>
            <tr>
                <td style="padding: 15px; text-align: center;">
                    <a href="https://www.facebook.com/">
                        <img src="https://cuboidtechnologies.com/media/fb.png">
                    </a>
                    <a href="https://in.linkedin.com/">
                        <img src="https://cuboidtechnologies.com/media/link.png" style="position: relative;left: 5px;">
                    </a>
                    <a href="https://twitter.com/">
                        <img src="https://cuboidtechnologies.com/media/twi.png" style="position: relative;left: 10px;">
                    </a>
                    <a href="https://www.instagram.com/">
                        <img src="https://cuboidtechnologies.com/media/insta.png" style="position: relative;left: 15px;">
                    </a>
                </td>
            </tr>
        
        </table>
    </div>
</body>
</html>`;
            await sendEmail({
              email: getUser.email,
              subject: `Hi, ${getUser.firstname}, Congratulations! Your Subscription has been activated`,
              message,
            });
          }
        }
        res.status(200).json({
          status: 'success',
          message: Tstatus[1],
        });
      } else if (dce === 'INVALID' || dce === 'FAILED') {
        res.status(200).json({
          status: 'success',
          message: Tstatus[1],
        });
      }
    })
  );
});
