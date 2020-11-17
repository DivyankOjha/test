const catchAsync = require('./../utils/catchAsync');
const Subs = require('../models/subscriptionModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const sendEmail = require('./../utils/email');

const AppError = require('./../utils/appError');
const subTransaction = require('../models/subTransactionModel');

exports.Subscription = catchAsync(async (req, res, next) => {
  const getUser = await User.findById({ _id: req.body.userID });

  if (getUser.isSubscribedRent === true && getUser.isSubscribedBuy === true) {
    return next(new AppError('You are Already Subscribed!', 400));
  } else if (
    getUser.isSubscribedBuy === false &&
    getUser.isSubscribedRent === true &&
    req.body.subscriptionType.buy === true
  ) {
    const findSub = await Subs.findOne({ userID: req.body.userID });

    const getBuySub = await Subs.findByIdAndUpdate(
      { _id: findSub._id },
      {
        $set: {
          'subscriptionType.buy': true,
          'subscriptionAmount.buy': req.body.subscriptionAmount.buy,
          'totalpoints.buy': req.body.totalpoints.buy,
        },
      }
    );

    const updateInUser = await User.findByIdAndUpdate(
      { _id: req.body.userID },
      {
        $set: { isSubscribedBuy: true },
      }
    );

    const updateInNewSub = await Subs.findByIdAndUpdate(
      { _id: req.body.userID },
      {
        $set: { email: updateInUser.email },
      }
    );

    let addInRecordData = {
      userID: req.body.userID,
      subscriptionType: 'buy',
      subscriptionAmount: req.body.subscriptionAmount.buy,
      totalpoints: req.body.totalpoints.buy,
      email: getUser.email,
    };

    let home = 'https://cuboidtechnologies.com';
    let addRecord = await subTransaction.create(addInRecordData);
    const message = `<h1>Hi, ${getUser.firstname} , <br> Congratulations!<br>  Your subscription has been activated! </h1>
     <br><p>You signed up - now it's time to search for properties like a hero within the shortest time possible <br> </p>
     </p>
     You can start at our  <a href = "${home}"> <b>Home Page</b></a> we have classified the properties in a way that get you
     started easily. <br> 
     You then specify the featurse of that house or that land or a hotel that you have in mind.<br>
     Please note you can  be as specific as possible or as general as you want.<br>
     Feel free to pray with the different selectors and see how many items are gettig displayed. <br>
     Once you are satisfies that we have dislayed the number of items that are easy to evaluate, save your search as a flip book.<br>
     Flip book ensures that on your next vist you will not start all over again.<br>
     Moreover the flip book has been designed to create a feel as if you are reading a newspaper.<br
     Flip through the pages, move on, and explore the images in a 360 degrees view and virtual tours.<br>
     In case you need support call us on our hotline <b>+254770820696</b> or email us <a href = "care@cuboidtechnologies.com">care@cuboidtechnologies.com</a><br>
     Enhance your feel even more by using our mobile app.
     </p> `;

    await sendEmail({
      email: getUser.email,
      subject: `Hi, ${getUser.firstname}, Congratulations! Your Buy Pack Subscription has been activated`,
      //  subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    res.status(201).json({
      status: 'success',
    });
  } else if (
    getUser.isSubscribedRent === false &&
    getUser.isSubscribedBuy === true &&
    req.body.subscriptionType.rent === true
  ) {
    const findSub = await Subs.findOne({ userID: req.body.userID });

    const getBuySub = await Subs.findByIdAndUpdate(
      { _id: findSub._id },
      {
        $set: {
          'subscriptionType.rent': true,
          'subscriptionAmount.rent': req.body.subscriptionAmount.rent,
          'totalpoints.rent': req.body.totalpoints.rent,
        },
      }
    );

    const updateInUser = await User.findByIdAndUpdate(
      { _id: req.body.userID },
      {
        $set: { isSubscribedRent: true },
      }
    );

    const updateInNewSub = await Subs.findByIdAndUpdate(
      { _id: req.body.userID },
      {
        $set: { email: updateInUser.email },
      }
    );
    let addInRecordData = {
      userID: req.body.userID,
      subscriptionType: 'rent',
      subscriptionAmount: req.body.subscriptionAmount.rent,
      totalpoints: req.body.totalpoints.rent,
      email: getUser.email,
    };

    let addRecord = await subTransaction.create(addInRecordData);
    const message = `<p> Your are Subscribed  </p> `;

    await sendEmail({
      email: getUser.email,
      subject: `Hi, ${getUser.firstname}, Congratulations! Your Rent Pack Subscription has been activated`,
      //  subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    res.status(201).json({
      status: 'success',
      // data: {
      //   Subscription: newSub,
      // },
    });
  } else {
    const newSub = await Subs.create(req.body);

    if (req.body.subscriptionType.buy) {
      const updateInUser1 = await User.findByIdAndUpdate(
        { _id: newSub.userID },
        {
          $set: { isSubscribedBuy: true },
        }
      );
    }
    if (req.body.subscriptionType.rent) {
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

    if (req.body.subscriptionType.buy) {
      let addInRecordData = {
        userID: req.body.userID,
        subscriptionType: 'buy',
        subscriptionAmount: req.body.subscriptionAmount.buy,
        totalpoints: req.body.totalpoints.buy,
        email: getUser.email,
      };

      let addRecord = await subTransaction.create(addInRecordData);
    }

    if (req.body.subscriptionType.rent) {
      let addInRecordData = {
        userID: req.body.userID,
        subscriptionType: 'rent',
        subscriptionAmount: req.body.subscriptionAmount.rent,
        totalpoints: req.body.totalpoints.rent,
        email: getUser.email,
      };
      //  let addRecord = await subTransaction.create(addInRecordData);
    }

    let home = 'https://cuboidtechnologies.com';
    const message = `<!DOCTYPE html>
<html>
<head>
    <title></title>
       <meta http-equiv="Content-Type" content="text/html; charset=euc-jp">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Cuboid Technologies</title>
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
            border-top: 4px solid #3f51b5;
            border-left: 3px solid #3f51b5;
            border-right: 3px solid #3f51b5;
            border-bottom: 8px solid #3f51b5;
                max-width: 600px!important;
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
        <table style="border-bottom: 2px solid #3055ad;background-color: black;border-top-left-radius: 15px;border-top-right-radius: 15px; ">
            <tr><td align="center">
                    <img src="https://cuboidtechnologies.com/static/media/cuboid.04182065.png" style="width: 10%">
                </td></tr>
            <tr>
                <td align="center">
                    <h1 style="color:#fff;  margin-bottom: 0px;font-size: 22px;
    text-align: center;"> Hi, ${getUser.firstname}, Congratulations! 
Your Subscription has been activated!
</h1>
                </td>
                
            </tr>

        </table>
        <table style="color: #000;font-size: 20px; text-align: inherit; font-weight: bold;">
            <tr>
               <td style="font-size: 17px;">You signed up —— now it's time to search for properties like a hero within the shortest time possible</td>
            </tr>
            <tr>
            
               <td style="text-align: inherit; font-size: 17px;padding: 10px 0px;">You can start at our <a href = "${home}"> <b>Home Page</b></a>  we have classified the properties in a way that get you started easily.</td>
            
            </tr>
                 <tr>
                 <td style="font-size: 17px; padding: 10px 0px;text-align: justify;position: relative;
    right: 0px;">You then specify the features of that house or that land or a hotel that you have in mind.</td>
                 
                 </tr>
                 <tr>
                    <td style="font-size: 17px; padding: 10px 0px;   position: relative; text-align: justify;">Please note you can be as specific as possible or as general as you want.</td>
                 </tr>

                  <tr>
                 <td style="font-size: 17px;  padding: 10px 0px;  position: relative;">Feel free to pray with the different selectors and see how many items are getting displayed.</td>
                 
                 </tr>
                     
                  <tr>
                 <td style="font-size: 17px;  padding: 10px 0px;  position: relative;">Once you are satisfied that we have displayed the number of items that are easy to evaluate, <span style="color: gold;">save</span> your search as a <span style="color: gold;">flip book</span>.</td>
                 
                 </tr>

                 <tr>
                 <td style="font-size: 17px;  padding: 10px 0px;  position: relative;">Flip book ensures that on your next visit you will not start all over again.</td>
                 
                 </tr>
                <tr>
                 <td style="font-size: 17px;  padding: 10px 0px;  position: relative;">Moreover the flip book has been designed to create a feel as if you are reading a newspaper.</td>
                 
                 </tr>

                  <tr>
                 <td style="font-size: 17px;  padding: 10px 0px;  position: relative;">Flip through the pages, move on, and explore the images in a 360 degrees view and virtual tours.</td>
                 
                 </tr>

                 <tr>
                 <td style="font-size: 17px;  padding: 10px 0px;  position: relative;">Flip through the pages, move on, and explore the images in a <span style="color: gold;">360 degrees view</span> and<span style="color: gold;"> virtual tours</span>.</td>
                 
                 </tr>
                 



             </table>
             
             <table style="background-color: black;color: white;
    font-size: 14px;">
               <tr>
                 <td style="padding-left: 50px;">In case you need support call us on our hotline<br> <a href="" style="color: blue;">+254770820696</a> or <br>email us <a href="" style="color: blue;">care@cuboidtechnologies.com</a></td>
               </tr>
              <tr>
                <td style="padding: 10px 0px; padding-left: 50px;">Enhance your feel even more by using our mobile app.</td>
              </tr>
               <tr>
                <td style="padding: 10px 0px; color: yellow; padding-left: 48px;" >Download the app<a href=""><img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" style="    width: 117px;
    position: relative;
    top: 20px;"></a></td>
              </tr>
               

               <tr>
                <td style="padding: 10px 0px; padding-left: 49px;">Thankyou</td>
              </tr>
              <tr>
                <td style="padding: 10px 0px;padding-left: 49px;">Martin<br>Co-founder Cuboid<br> Technologies Ltd.</td>
              </tr>


               <tr>
                <td style="padding: 10px 0px; padding-left: 49px;"><img src="https://cuboidtechnologies.com/static/media/cuboid.04182065.png"></td>
              </tr>

               <tr>
                <td style="padding: 10px 0px; padding-left: 49px;"><a href="" style="color: blue;">support@cuboidtechnologies.com</a></td>
              </tr>

               <tr>
                <td style="padding: 10px 0px;padding-left: 49px;"><a href="" style="color: blue;">martin@cuboidtechnologies.com</a></td>
              </tr>

               <tr>
                <td style="padding: 10px 0px;padding-left: 49px;"><a href="" style="color: blue;">grace@cuboidtechnologies.com</a></td>
              </tr>
             </table>
          

                

        </table>
    </div>
</body>
</html> `;

    await sendEmail({
      email: getUser.email,
      subject: `Hi, ${getUser.firstname}, Congratulations! Your Subscription has been activated`,

      message,
    });
    res.status(201).json({
      status: 'success',
      data: {
        Subscription: newSub,
      },
    });
  }
});

exports.NewRenewSubscriptionAPi = catchAsync(async (req, res, next) => {
  let userID = req.body.userID;
  let type = req.body.type;
  const getUser = await User.findById({ _id: userID });

  const getSub = await Subs.findOne({ userID: userID });

  if (getSub) {
    const newSub = await Subs.findOne({ userID: req.body.userID });

    if (type === 'buy') {
      let currentTotalPoints = newSub.totalpoints.buy;
      let newTotalPoints = currentTotalPoints + req.body.totalpoints.buy;

      let subscriptionFrequency = newSub.subscriptionFrequency;
      let newsubscriptionFrequency = subscriptionFrequency + 1;

      const renewSub = await Subs.findByIdAndUpdate(
        { _id: newSub._id },
        {
          $set: {
            'subscriptionType.buy': req.body.subscriptionType.buy,
            'subscriptionAmount.buy': req.body.subscriptionAmount.buy,
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
      let addInRecordData = {
        userID: req.body.userID,
        subscriptionType: 'buy',
        subscriptionAmount: req.body.subscriptionAmount.buy,
        totalpoints: req.body.totalpoints.buy,
        email: getUser.email,
      };
      let addRecord = await subTransaction.create(addInRecordData);

      const message = `<p> Your are Subscription is Renewed  </p>`;

      await sendEmail({
        email: getUser.email,
        subject: `Hi, ${getUser.firstname}, Congratulations! Your Subscription for BUY PACK has been activated`,

        message,
      });
      res.status(201).json({
        status: 'success',
        data: {
          Subscription: renewSub,
        },
      });
    } else if (type === 'rent') {
      let currentTotalPoints = newSub.totalpoints.rent;
      let newTotalPoints = currentTotalPoints + req.body.totalpoints.rent;

      let subscriptionFrequency = newSub.subscriptionFrequency;
      let newsubscriptionFrequency = subscriptionFrequency + 1;

      const renewSub = await Subs.findByIdAndUpdate(
        { _id: newSub._id },
        {
          $set: {
            'subscriptionType.rent': req.body.subscriptionType.rent,
            'subscriptionAmount.rent': req.body.subscriptionAmount.rent,
            'totalpoints.rent': newTotalPoints,
            subscriptionFrequency: newsubscriptionFrequency,
          },
        }
      );

      //update issubscribed true in user
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
      let addInRecordData = {
        userID: req.body.userID,
        subscriptionType: 'rent',
        subscriptionAmount: req.body.subscriptionAmount.rent,
        totalpoints: req.body.totalpoints.rent,
        email: getUser.email,
      };
      //let addRecord = await subTransaction.create(addInRecordData);

      const message = `<p> Your are Subscription is Renewed  </p>`;

      await sendEmail({
        email: updateInUser.email,
        subject: `Hi, ${updateInUser.firstname}, Congratulations! Your Subscription for RENT PACK has been activated`,

        message,
      });
      res.status(201).json({
        status: 'success',
        data: {
          Subscription: renewSub,
        },
      });
    }
  } else {
    const getUser = await User.findById({ _id: userID });
    const newSub = await Subs.create(req.body);

    // update issubscribed true in user
    if (req.body.subscriptionType.buy) {
      const updateInUser1 = await User.findByIdAndUpdate(
        { _id: newSub.userID },
        {
          $set: { isSubscribedBuy: true },
        }
      );

      let addInRecordData = {
        userID: req.body.userID,
        subscriptionType: 'buy',
        subscriptionAmount: req.body.subscriptionAmount.buy,
        totalpoints: newSub.totalpoints.buy,
        email: getUser.email,
      };
      let addRecord = await subTransaction.create(addInRecordData);
    }
    if (req.body.subscriptionType.rent) {
      const updateInUser2 = await User.findByIdAndUpdate(
        { _id: newSub.userID },
        {
          $set: { isSubscribedRent: true },
        }
      );

      let addInRecordData = {
        userID: req.body.userID,
        subscriptionType: 'rent',
        subscriptionAmount: req.body.subscriptionAmount.rent,
        totalpoints: newSub.totalpoints.rent,
        email: getUser.email,
      };
      let addRecord = await subTransaction.create(addInRecordData);
    }

    const updateInNewSub = await Subs.findByIdAndUpdate(
      { _id: newSub._id },
      {
        $set: { email: getUser.email },
      }
    );

    const message = `<p> Your are Subscribed  </p> `;

    await sendEmail({
      email: getUser.email,
      subject: `Hi, ${getUser.firstname}, Congratulations! Your Subscription has been activated`,

      message,
    });
    res.status(201).json({
      status: 'success',
      data: {
        Subscription: newSub,
      },
    });
  }
});
exports.renewSubscription = catchAsync(async (req, res, next) => {
  const getUser = await User.findById({ _id: req.body.userID });

  const newSub = await Subs.findOne({ userID: req.body.userID });

  if (req.body.type === 'buy') {
    let currentTotalPoints = newSub.totalpoints.buy;
    let newTotalPoints = currentTotalPoints + req.body.totalpoints.buy;

    let subscriptionFrequency = newSub.subscriptionFrequency;
    let newsubscriptionFrequency = subscriptionFrequency + 1;

    const renewSub = await Subs.findByIdAndUpdate(
      { _id: newSub._id },
      {
        $set: {
          'subscriptionType.buy': req.body.subscriptionType.buy,
          'subscriptionAmount.buy': req.body.subscriptionAmount.buy,
          'totalpoints.buy': newTotalPoints,
          subscriptionFrequency: newsubscriptionFrequency,
        },
      }
    );

    //update issubscribed true in user
    const updateInUser = await User.findByIdAndUpdate(
      { _id: newSub.userID },
      {
        $set: { isSubscribedBuy: true },
      }
    );
    const updateInNewSub = await Subs.findByIdAndUpdate(
      { _id: newSub._id },
      {
        $set: { email: updateInUser.email },
      }
    );

    let addInRecordData = {
      userID: req.body.userID,
      subscriptionType: 'buy',
      subscriptionAmount: req.body.subscriptionAmount.buy,
      totalpoints: req.body.totalpoints.buy,
      email: getUser.email,
    };
    let addRecord = await subTransaction.create(addInRecordData);

    const message = `<p> Your are Subscription is Renewed  </p>`;

    await sendEmail({
      email: updateInUser.email,
      subject: `Hi, ${updateInUser.firstname}, Congratulations! Your Subscription for BUY PACK has been activated`,
      //  subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    res.status(201).json({
      status: 'success',
      data: {
        Subscription: renewSub,
      },
    });
  } else if (req.body.type === 'rent') {
    let currentTotalPoints = newSub.totalpoints.rent;
    let newTotalPoints = currentTotalPoints + req.body.totalpoints.rent;

    let subscriptionFrequency = newSub.subscriptionFrequency;
    let newsubscriptionFrequency = subscriptionFrequency + 1;

    const renewSub = await Subs.findByIdAndUpdate(
      { _id: newSub._id },
      {
        $set: {
          'subscriptionType.rent': req.body.subscriptionType.rent,
          'subscriptionAmount.rent': req.body.subscriptionAmount.rent,
          'totalpoints.rent': newTotalPoints,
          subscriptionFrequency: newsubscriptionFrequency,
        },
      }
    );

    //update issubscribed true in user
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
    let addInRecordData = {
      userID: req.body.userID,
      subscriptionType: 'rent',
      subscriptionAmount: req.body.subscriptionAmount.rent,
      totalpoints: req.body.totalpoints.rent,
      email: getUser.email,
    };
    let addRecord = await subTransaction.create(addInRecordData);

    const message = `<p> Your are Subscription is Renewed  </p>`;

    await sendEmail({
      email: updateInUser.email,
      subject: `Hi, ${updateInUser.firstname}, Congratulations! Your Subscription for RENT PACK has been activated`,
      //  subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    res.status(201).json({
      status: 'success',
      data: {
        Subscription: renewSub,
      },
    });
  }
});
//if id renew else buy
exports.getAllSubscription = catchAsync(async (req, res) => {
  const subscription = await Subs.find({}).sort({ _id: -1 }); //.skip(skip).limit(limit);
  res.status(200).json({
    status: 'success',
    results: subscription.length,
    data: {
      subscription,
    },
  });
});

//by user id from user schema
exports.getUserSubscription = catchAsync(async (req, res) => {
  //by user id
  const subscription = await Subs.find({ userID: req.params.id });
  res.status(200).json({
    status: 'success',
    data: {
      subscription,
    },
  });
});

exports.SubscriptionfilterbyRentBuy = catchAsync(async (req, res) => {
  if (req.body.subscriptionType.buy === 'buy') {
    const subs = await Subs.find({
      subscriptionType: 'buy',
    }).sort({ _id: -1 });
    res.status(200).json({
      status: 'success',
      results: subs.length,
      data: subs,
    });
  }
  if (req.body.subscriptionType.rent === 'rent') {
    const subs = await Subs.find({
      subscriptionType: 'rent',
    }).sort({ _id: -1 });
    res.status(200).json({
      status: 'success',
      results: subs.length,
      data: subs,
    });
  }
});

exports.Subscriptionfilterbydate = catchAsync(async (req, res) => {
  let { startDate, endDate } = req.body;

  const subs = await Subs.find({
    subscriptionDate: { $gte: startDate, $lte: endDate + 'T' + '23:59:59' },
  }).sort({ _id: -1 });

  res.status(200).json({
    status: 'success',
    results: subs.length,
    data: subs,
  });
});

//searching by email and subscription id
exports.searchSubscription = catchAsync(async (req, res, next) => {
  //by subscriptionid/email
  let searchquery = req.body.searchquery;
  let str = searchquery;
  let substr = '@';

  try {
    if (mongoose.Types.ObjectId.isValid(searchquery)) {
      const subs = await Subs.findById(searchquery);

      res.status(200).json({
        status: 'success',
        results: subs.length,
        data: subs,
      });
    } else {
      const subs = await Subs.find({
        $expr: {
          $regexMatch: {
            input: '$email',
            regex: searchquery,
            options: 'm',
          },
        },
      });

      res.status(200).json({
        status: 'success',
        results: subs.length,
        data: subs,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 'Not Found',
      message: 'Subscription Details Not Found! Try again.',
    });
  }
});

exports.updateUsedPoints = catchAsync(async (req, res, next) => {
  let id = req.params.id;

  if (req.body.type === 'buy') {
    let subscription = await Subs.findOne({ userID: id });

    if (subscription.usedPointsBuy < subscription.totalpoints.buy) {
      let n = 1;

      let ups = subscription.usedPointsBuy;
      up = parseInt(ups);
      let sum = up + n;

      const update = await Subs.findOneAndUpdate(
        { userID: id },
        {
          $set: {
            usedPointsBuy: sum,
          },
        }
      );

      const checkUsedPoints = await Subs.find({ userID: id });

      let math70 = (checkUsedPoints[0].totalpoints.buy / 100) * 75;
      let math98 = (checkUsedPoints[0].totalpoints.buy / 100) * 98;

      const finduser = await User.findById({ _id: id });
      if (checkUsedPoints[0].usedPointsBuy === math70) {
        //math70

        const message = `<p> Subscription Message : You have consumed 70 percent of the total points of your Buy Pack </p> `;

        await sendEmail({
          email: finduser.email,
          subject: `Hi, ${finduser.firstname}, Subscription expiring soon!`,
          //  subject: 'Your password reset token (valid for 10 min)',
          message,
        });
      }
      if (checkUsedPoints[0].usedPointsBuy === math98) {
        url = `https://cuboidtechnologies.com/renew-subscription/buy/${checkUsedPoints[0].userID}`;

        const message = `<p>You have consumed 98 percent of the total points in you <b>buy pack</b>.<br> 
      <br> To renew your subcription, please <a href = "${url}"> <b>Visit this link</b> </a> </p> <hr>  
      <h3> <b>Having Trouble? </b> </h3> 
      <p>If the above link does not work try copying this link into your browser. </p> 
      <p>${url}</p>  <hr>
      <h3><b> Questions? <b> </h3>
      <p>Please let us know if there's anything we can help you with by replying to this email or by emailing <b>support@cuboid.com</b></p>
      `;

        await sendEmail({
          email: finduser.email,
          subject: `Hi, ${finduser.firstname}, Subscription expiring soon!`,

          message,
        });
      }

      if (
        checkUsedPoints[0].usedPointsBuy === checkUsedPoints[0].totalpoints.buy
      ) {
        const updateinUser = await User.findOneAndUpdate(
          { _id: id },
          { $set: { isSubscribedBuy: false } }
        );

        const message = `<p> Your subscription has expired! Please Subscribe / renew to resume services of your Buy Pack </p> `;

        await sendEmail({
          email: finduser.email,
          subject: `Hi, ${finduser.firstname}, Subscription expired!`,

          message,
        });
      }
      res.status(200).json({
        status: 'success',

        data: {
          checkUsedPoints,
        },
      });
    } else {
      return next(new AppError('error', 200));
    }
  } else if (req.body.type === 'rent') {
    let subscription = await Subs.findOne({ userID: id });

    if (subscription.usedPointsRent < subscription.totalpoints.rent) {
      let n = 1;

      let up = await subscription.usedPointsRent;
      let sum = up + n;

      const update = await Subs.findOneAndUpdate(
        { userID: id },
        {
          $set: {
            usedPointsRent: sum,
          },
        }
      );

      const checkUsedPoints = await Subs.find({ userID: id });

      let math70 = (checkUsedPoints[0].totalpoints.rent / 100) * 75;
      let math98 = (checkUsedPoints[0].totalpoints.rent / 100) * 98;

      const finduser = await User.findById({ _id: id });
      if (checkUsedPoints[0].usedPointsRent === math70) {
        const message = `<p> Subscription Message : You have consumed 70 percent of the total points of your <b>Rent Pack</b> </p> `;

        await sendEmail({
          email: finduser.email,
          subject: `Hi, ${finduser.firstname}, Subscription expiring soon!`,

          message,
        });
      }
      if (checkUsedPoints[0].usedPointsRent === math98) {
        url = `https://cuboidtechnologies.com/renew-subscription/rent/${checkUsedPoints[0].userID}`;

        const message = `<p>You have consumed 98 percent of the total points of your <b>Rent Pack</b>.<br> 
      <br> To renew your subcription, please <a href = "${url}"> <b>Visit this link</b> </a> </p> <hr>  
      <h3> <b>Having Trouble? </b> </h3> 
      <p>If the above link does not work try copying this link into your browser. </p> 
      <p>${url}</p>  <hr>
      <h3><b> Questions? <b> </h3>
      <p>Please let us know if there's anything we can help you with by replying to this email or by emailing <b>support@cuboid.com</b></p>
      `;

        await sendEmail({
          email: finduser.email,
          subject: `Hi, ${finduser.firstname}, Subscription expiring soon!`,

          message,
        });
      }

      if (
        checkUsedPoints[0].usedPointsRent ===
        checkUsedPoints[0].totalpoints.rent
      ) {
        const updateinUser = await User.findOneAndUpdate(
          { _id: id },
          { $set: { isSubscribedRent: false } }
        );

        const message = `<p> Your subscription has expired for the Rent Pack! Please Subscribe / renew to resume services </p> `;

        await sendEmail({
          email: finduser.email,
          subject: `Hi, ${finduser.firstname}, Subscription expired!`,

          message,
        });
      }
      res.status(200).json({
        status: 'success',

        data: {
          checkUsedPoints,
        },
      });
    } else return next(new AppError('Fail', 200));
  }
});

exports.deleteSubscription = catchAsync(async (req, res) => {
  var ids = req.body.deleteSubscription;

  for (var i in ids) {
    const getsub = await Subs.findById({ _id: ids[i] });
   
    const getuser = await User.findByIdAndUpdate(
      { _id: getsub.userID },
      {
        $set: { isSubscribed: false },
      }
    );
  
  }
  const deletemany = await Subs.deleteMany({
    _id: { $in: ids },
  });
  if (deletemany.deletedCount === 0) {
    res.status(200).json({
      message: 'Subscription not found or Already Deleted! Please refresh!',
    });
  } else {
    res.status(200).json({
      status: 'success',
      message: 'Deleted Successfully',
      deleted: deletemany.deletedCount,
    });
  }
});
