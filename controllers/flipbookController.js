const catchAsync = require('./../utils/catchAsync');
const path = require('path');
const mime = require('mime');
const fs = require('fs');
const AppError = require('./../utils/appError');
const House = require('./../models/houseModel');
const Land = require('./../models/landModel');
const Hotel = require('./../models/hotelModel');
const WareHouse = require('./../models/warehouseModel');
const User = require('../models/userModel');
const { isNullOrUndefined, isUndefined } = require('util');
const SimilarPropQuery = require('../models/queryModels/similarPropertyModel');
const HouseQuery = require('../models/queryModels/houseModel');
const LandQuery = require('../models/queryModels/landModel');
const HotelQuery = require('../models/queryModels/hotelModel');
const WarehouseQuery = require('../models/queryModels/warehouseModel');

exports.addFlipbook = catchAsync(async (req, res, next) => {
  image2Dlinks = [];
  floorplan = [];
  floor = [];
  let {
    description,
    tour360Property,
    map,
    contactSeller,
    propertyAvailability,
    sendmessageToSeller,
  } = req.body;
  let banner = req.body.flipbookBanner;
  let title = req.body.title;

  let image2D = req.body.image2D;
  let image3D = req.body.image3D;
  floor = req.body.floorPlan;

  let _id = req.body._id;
  let showAttributes = req.body.showAttributes;

  var str = req.protocol;
  var n = str.startsWith('http', 0);

  /***********HOUSE***********/
  if (req.body.propertyType === 'House') {
    const updatedata = await House.updateMany(
      { _id },
      {
        $set: {
          'flipbook.title': title,
          'flipbook.description': description,
          'flipbook.tour360Property': tour360Property,
          'flipbook.map': map,
          'flippbook.contactSeller': contactSeller,
          'flipbook.propertyAvailability': propertyAvailability,
          'flipbook.sendmessageToSeller': sendmessageToSeller,
          'flipbook.showAttributes': showAttributes,
          isFlipbook: true,
        },
      }
    );
    /******************============BANNER==========********************/
    if (
      banner != isNullOrUndefined &&
      banner != '' &&
      banner != ' ' &&
      banner != undefined
    ) {
      var d = banner.startsWith('http', 0);
      if (d) {
        const updateflipbook = await House.findByIdAndUpdate(
          { _id },
          {
            $set: { 'flipbook.flipbookBanner': banner },
          }
        );
      }
      //BANNER
      if (!d) {
        let matches = await banner.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};
        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
        response.type = matches[1];

        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');

        const name1 = name[0];

        let extension = mime.extension(type);

        const rand = Math.ceil(Math.random() * 1000);

        const fileName = `${title}-${'BANNER'}.${extension}`;

        path3 = path.resolve(`./public/media/flipbook/House`);

        let localpath = `${path3}/${_id}/`;

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }

        fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';

        const url = `${req.protocol}://${ip}/media/flipbook/House/${_id}/${fileName}`;

        /************************************** */

        const updateflipbook = await House.findByIdAndUpdate(
          { _id },
          {
            $set: { 'flipbook.flipbookBanner': url },
          }
        );
      }
    }

    /***********  2D Image Array****** */
    if (
      image2D != isNullOrUndefined &&
      image2D != '' &&
      image2D != ' ' &&
      image2D != undefined
    ) {
      for (let i in image2D) {
        var e = image2D[i].startsWith('http', 0);
        if (e) {
          image2Dlinks.push(image2D[i]);
        }
        if (!e) {
          let matches = await image2D[i].match(
              /^data:([A-Za-z-+\/]+);base64,(.+)$/
            ),
            response = {};
          if (matches.length !== 3) {
            return new Error('Invalid input string');
          }
          response.type = matches[1];

          response.data = new Buffer.from(matches[2], 'base64');
          let decodedImg = response;
          let imageBuffer = decodedImg.data;
          let type = decodedImg.type;
          const name = type.split('/');

          const name1 = name[0];

          let extension = mime.extension(type);

          const rand = Math.ceil(Math.random() * 1000);

          const fileName = `${title}_${'2D'}_${[i]}.${extension}`;

          path3 = path.resolve(`./public/media/flipbook/House`);

          let localpath = `${path3}/${_id}/`;

          if (!fs.existsSync(localpath)) {
            fs.mkdirSync(localpath);
          }

          fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
          ip = 'cuboidtechnologies.com';

          const url = `${req.protocol}://${ip}/media/flipbook/House/${_id}/${fileName}`;

          image2Dlinks.push(url);

          /************************************** */
        }
      }
      const update2dimage = await House.findByIdAndUpdate(
        { _id },
        {
          $set: { 'flipbook.image2D': image2Dlinks },
        }
      );
    }
    /*****************======Image 3D==================***********/

    if (
      image3D != isNullOrUndefined &&
      image3D != '' &&
      image3D != ' ' &&
      image3D != undefined
    ) {
      var c = image3D.startsWith('http', 0);
      let image3DUrl = '';
      if (req.body.image3D) {
        if (c) {
          const update3dimage = await House.findByIdAndUpdate(
            { _id },
            {
              $set: { 'flipbook.image3D': image3D },
            }
          );
        }
        if (!c) {
          let matches = await image3D.match(
              /^data:([A-Za-z-+\/]+);base64,(.+)$/
            ),
            response = {};
          if (matches.length !== 3) {
            return new Error('Invalid input string');
          }
          response.type = matches[1];

          response.data = new Buffer.from(matches[2], 'base64');
          let decodedImg = response;
          let imageBuffer = decodedImg.data;
          let type = decodedImg.type;
          const name = type.split('/');

          const name1 = name[0];

          let extension = mime.extension(type);

          const rand = Math.ceil(Math.random() * 1000);

          const fileName = `${'3D'}_${title}.${extension}`;

          path3 = path.resolve(`./public/media/flipbook/House`);

          let localpath = `${path3}/${_id}/`;

          if (!fs.existsSync(localpath)) {
            fs.mkdirSync(localpath);
          }

          fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
          ip = 'cuboidtechnologies.com';

          const url = `${req.protocol}://${ip}/media/flipbook/House/${_id}/${fileName}`;
          image3DUrl = url;

          /************************************** */
          const update3dimage = await House.findByIdAndUpdate(
            { _id },
            {
              $set: { 'flipbook.image3D': image3DUrl },
            }
          );
        }
      }
    }

    /*******++++++++++++====Floor Plan=============********* */
    if (
      floor != isNullOrUndefined &&
      floor != '' &&
      floor != ' ' &&
      floor != undefined
    ) {
      for (let i in floor) {
        var f = floor[i].url.startsWith('http', 0);

        if (f) {
          floorplan.push(floor[i]);
        }
        if (!f) {
          let matches = await floor[i].url.match(
              /^data:([A-Za-z-+\/]+);base64,(.+)$/
            ),
            response = {};
          if (matches.length !== 3) {
            return new Error('Invalid input string');
          }
          response.type = matches[1];

          response.data = new Buffer.from(matches[2], 'base64');
          let decodedImg = response;
          let imageBuffer = decodedImg.data;
          let type = decodedImg.type;
          const name = type.split('/');

          const name1 = name[0];

          let extension = mime.extension(type);

          const rand = Math.ceil(Math.random() * 1000);
          //Random photo name with timeStamp so it will not overide previous images.
          const FileName = `${[i]}-${'floor-plan'}_${
            floor[i].Name
          } _${title}.${extension}`;

          path3 = path.resolve(`./public/media/flipbook/House`);

          let localpath = `${path3}/${_id}/`;

          if (!fs.existsSync(localpath)) {
            fs.mkdirSync(localpath);
          }

          fs.writeFileSync(`${localpath}` + FileName, imageBuffer, 'utf8');
          ip = 'cuboidtechnologies.com';

          const url = `${req.protocol}://${ip}/media/flipbook/House/${_id}/${FileName}`;

          let fileName = `${floor[i].fileName}`;
          floorplan.push({ fileName, url });
        }
      }

      const updatefloorPlan = await House.findByIdAndUpdate(
        { _id },
        {
          $set: { 'flipbook.floorPlan': floorplan },
        }
      );
    }

    /*************************************************************/

    res.status(201).json({
      status: 'success',
    });
  }
  if (req.body.propertyType === 'Hotel') {
    const updatedata = await Hotel.updateMany(
      { _id },
      {
        $set: {
          'flipbook.title': title,
          'flipbook.description': description,
          'flipbook.tour360Property': tour360Property,
          'flipbook.map': map,
          'flippbook.contactSeller': contactSeller,
          'flipbook.propertyAvailability': propertyAvailability,
          'flipbook.sendmessageToSeller': sendmessageToSeller,
          'flipbook.showAttributes': showAttributes,
          isFlipbook: true,
        },
      }
    );
    /******************============BANNER==========********************/
    if (
      banner != isNullOrUndefined &&
      banner != '' &&
      banner != ' ' &&
      banner != undefined
    ) {
      var d = banner.startsWith('http', 0);
      if (d) {
        const updateflipbook = await Hotel.findByIdAndUpdate(
          { _id },
          {
            $set: { 'flipbook.flipbookBanner': banner },
          }
        );
      }
      if (!d) {
        let matches = await banner.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};
        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
        response.type = matches[1];

        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');

        const name1 = name[0];

        let extension = mime.extension(type);

        const rand = Math.ceil(Math.random() * 1000);
        //Random photo name with timeStamp so it will not overide previous images.
        const fileName = `${title}-${'BANNER'}.${extension}`;

        path3 = path.resolve(`./public/media/flipbook/Hotel`);

        let localpath = `${path3}/${_id}/`;

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }

        fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';

        const url = `${req.protocol}://${ip}/media/flipbook/Hotel/${_id}/${fileName}`;

        /************************************** */

        const updateflipbook = await Hotel.findByIdAndUpdate(
          { _id },
          {
            $set: { 'flipbook.flipbookBanner': url },
            'flipbook.title': req.body.title,
          }
        );
      }
    }

    /***********  2D Image Array****** */
    if (
      image2D != isNullOrUndefined &&
      image2D != '' &&
      image2D != ' ' &&
      image2D != undefined
    ) {
      for (let i in image2D) {
        var e = image2D[i].startsWith('http', 0);
        if (e) {
          image2Dlinks.push(image2D[i]);
        }
        if (!e) {
          let matches = await image2D[i].match(
              /^data:([A-Za-z-+\/]+);base64,(.+)$/
            ),
            response = {};
          if (matches.length !== 3) {
            return new Error('Invalid input string');
          }
          response.type = matches[1];

          response.data = new Buffer.from(matches[2], 'base64');
          let decodedImg = response;
          let imageBuffer = decodedImg.data;
          let type = decodedImg.type;
          const name = type.split('/');

          const name1 = name[0];

          let extension = mime.extension(type);

          const rand = Math.ceil(Math.random() * 1000);
          //Random photo name with timeStamp so it will not overide previous images.
          const fileName = `${title}_${'2D'}_${[i]}.${extension}`;

          path3 = path.resolve(`./public/media/flipbook/Hotel`);

          let localpath = `${path3}/${_id}/`;

          if (!fs.existsSync(localpath)) {
            fs.mkdirSync(localpath);
          }

          fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
          ip = 'cuboidtechnologies.com';

          const url = `${req.protocol}://${ip}/media/flipbook/Hotel/${_id}/${fileName}`;

          image2Dlinks.push(url);

          /************************************** */
        }
      }
      const update2dimage = await Hotel.findByIdAndUpdate(
        { _id },
        {
          $set: { 'flipbook.image2D': image2Dlinks },
        }
      );
    }

    /*****************======Image 3D==================***********/
    if (
      image3D != isNullOrUndefined &&
      image3D != '' &&
      image3D != ' ' &&
      image3D != undefined
    ) {
      var c = image3D.startsWith('http', 0);
      let image3DUrl = '';
      if (req.body.image3D) {
        if (c) {
          const update3dimage = await Hotel.findByIdAndUpdate(
            { _id },
            {
              $set: { 'flipbook.image3D': image3D },
            }
          );
        }
        if (!c) {
          let matches = await image3D.match(
              /^data:([A-Za-z-+\/]+);base64,(.+)$/
            ),
            response = {};
          if (matches.length !== 3) {
            return new Error('Invalid input string');
          }
          response.type = matches[1];

          response.data = new Buffer.from(matches[2], 'base64');
          let decodedImg = response;
          let imageBuffer = decodedImg.data;
          let type = decodedImg.type;
          const name = type.split('/');

          const name1 = name[0];

          let extension = mime.extension(type);

          const rand = Math.ceil(Math.random() * 1000);
          //Random photo name with timeStamp so it will not overide previous images.
          const fileName = `${'3D'}_${title}.${extension}`;

          path3 = path.resolve(`./public/media/flipbook/Hotel`);

          let localpath = `${path3}/${_id}/`;

          if (!fs.existsSync(localpath)) {
            fs.mkdirSync(localpath);
          }

          fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
          ip = 'cuboidtechnologies.com';

          const url = `${req.protocol}://${ip}/media/flipbook/Hotel/${_id}/${fileName}`;
          image3DUrl = url;
          const update3dimage = await Hotel.findByIdAndUpdate(
            { _id },
            {
              $set: { 'flipbook.image3D': image3DUrl },
            }
          );

          /************************************** */
        }
      }
    }

    /*******++++++++++++====Floor Plan=============********* */
    if (
      floor != isNullOrUndefined &&
      floor != '' &&
      floor != ' ' &&
      floor != undefined
    ) {
      for (let i in floor) {
        var f = floor[i].url.startsWith('http', 0);

        if (f) {
          floorplan.push(floor[i]);
        }

        if (!f) {
          let matches = await floor[i].url.match(
              /^data:([A-Za-z-+\/]+);base64,(.+)$/
            ),
            response = {};
          if (matches.length !== 3) {
            return new Error('Invalid input string');
          }
          response.type = matches[1];

          response.data = new Buffer.from(matches[2], 'base64');
          let decodedImg = response;
          let imageBuffer = decodedImg.data;
          let type = decodedImg.type;
          const name = type.split('/');

          const name1 = name[0];

          let extension = mime.extension(type);

          const rand = Math.ceil(Math.random() * 1000);

          const FileName = `${[i]}-${'floor-plan'}_${title}.${extension}`;

          path3 = path.resolve(`./public/media/flipbook/Hotel`);

          let localpath = `${path3}/${_id}/`;

          if (!fs.existsSync(localpath)) {
            fs.mkdirSync(localpath);
          }

          fs.writeFileSync(`${localpath}` + FileName, imageBuffer, 'utf8');
          ip = 'cuboidtechnologies.com';

          const url = `${req.protocol}://${ip}/media/flipbook/Hotel/${_id}/${FileName}`;

          let fileName = `${floor[i].fileName}`;
          floorplan.push({ fileName, url });
        }
      }

      const updatefloorPlan = await Hotel.findByIdAndUpdate(
        { _id },
        {
          $set: { 'flipbook.floorPlan': floorplan },
        }
      );
    }

    /*************************************************************/

    res.status(201).json({
      status: 'success',
    });
  }
  if (req.body.propertyType === 'Land') {
    const updatedata = await Land.updateMany(
      { _id },
      {
        $set: {
          'flipbook.title': title,
          'flipbook.description': description,
          'flipbook.tour360Property': tour360Property,
          'flipbook.map': map,
          'flippbook.contactSeller': contactSeller,
          'flipbook.propertyAvailability': propertyAvailability,
          'flipbook.sendmessageToSeller': sendmessageToSeller,
          'flipbook.showAttributes': showAttributes,
          isFlipbook: true,
        },
      }
    );
    /******************============BANNER==========********************/
    if (
      banner != isNullOrUndefined &&
      banner != '' &&
      banner != ' ' &&
      banner != undefined
    ) {
      var d = banner.startsWith('http', 0);
      if (d) {
        const updateflipbook = await Land.findByIdAndUpdate(
          { _id },
          {
            $set: { 'flipbook.flipbookBanner': banner },
          }
        );
      }
      if (!d) {
        let matches = await banner.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};
        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
        response.type = matches[1];

        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');

        const name1 = name[0];

        let extension = mime.extension(type);

        const rand = Math.ceil(Math.random() * 1000);
        //Random photo name with timeStamp so it will not overide previous images.
        const fileName = `${title}-${'BANNER'}.${extension}`;

        path3 = path.resolve(`./public/media/flipbook/Land`);

        let localpath = `${path3}/${_id}/`;

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }

        fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';

        const url = `${req.protocol}://${ip}/media/flipbook/Land/${_id}/${fileName}`;

        /************************************** */

        const updateflipbook = await Land.findByIdAndUpdate(
          { _id },
          {
            $set: { 'flipbook.flipbookBanner': url },
          }
        );
      }
    }

    /***********  2D Image Array****** */
    if (
      image2D != isNullOrUndefined &&
      image2D != '' &&
      image2D != ' ' &&
      image2D != undefined
    ) {
      for (let i in image2D) {
        var e = image2D[i].startsWith('http', 0);
        if (e) {
          image2Dlinks.push(image2D[i]);
        }
        if (!e) {
          let matches = await image2D[i].match(
              /^data:([A-Za-z-+\/]+);base64,(.+)$/
            ),
            response = {};
          if (matches.length !== 3) {
            return new Error('Invalid input string');
          }
          response.type = matches[1];

          response.data = new Buffer.from(matches[2], 'base64');
          let decodedImg = response;
          let imageBuffer = decodedImg.data;
          let type = decodedImg.type;
          const name = type.split('/');

          const name1 = name[0];

          let extension = mime.extension(type);

          const rand = Math.ceil(Math.random() * 1000);
          //Random photo name with timeStamp so it will not overide previous images.
          const fileName = `${title}_${'2D'}_${[i]}.${extension}`;

          path3 = path.resolve(`./public/media/flipbook/Land`);

          let localpath = `${path3}/${_id}/`;

          if (!fs.existsSync(localpath)) {
            fs.mkdirSync(localpath);
          }

          fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
          ip = 'cuboidtechnologies.com';

          const url = `${req.protocol}://${ip}/media/flipbook/Land/${_id}/${fileName}`;

          image2Dlinks.push(url);

          /************************************** */
        }

        const update2dimage = await Land.findByIdAndUpdate(
          { _id },
          {
            $set: { 'flipbook.image2D': image2Dlinks },
          }
        );
      }
    }

    /*****************======Image 3D==================***********/

    if (
      image3D != isNullOrUndefined &&
      image3D != '' &&
      image3D != ' ' &&
      image3D != undefined
    ) {
      var c = image3D.startsWith('http', 0);
      let image3DUrl = '';
      if (req.body.image3D) {
        if (c) {
          // const update3dimage = await Land.findByIdAndUpdate(
          //   { _id },
          //   {
          //     $set: { 'flipbook.image3D': image3D },
          //   }
          // );
        }
        if (!c) {
          let matches = await image3D.match(
              /^data:([A-Za-z-+\/]+);base64,(.+)$/
            ),
            response = {};
          if (matches.length !== 3) {
            return new Error('Invalid input string');
          }
          response.type = matches[1];

          response.data = new Buffer.from(matches[2], 'base64');
          let decodedImg = response;
          let imageBuffer = decodedImg.data;
          let type = decodedImg.type;
          const name = type.split('/');

          const name1 = name[0];

          let extension = mime.extension(type);

          const rand = Math.ceil(Math.random() * 1000);
          //Random photo name with timeStamp so it will not overide previous images.
          const fileName = `${'3D'}_${title}.${extension}`;

          path3 = path.resolve(`./public/media/flipbook/Land`);

          let localpath = `${path3}/${_id}/`;

          if (!fs.existsSync(localpath)) {
            fs.mkdirSync(localpath);
          }

          fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
          ip = 'cuboidtechnologies.com';

          const url = `${req.protocol}://${ip}/media/flipbook/Land/${_id}/${fileName}`;
          image3DUrl = url;

          /************************************** */
          const update3dimage = await Land.findByIdAndUpdate(
            { _id },
            {
              $set: { 'flipbook.image3D': image3DUrl },
            }
          );
        }
      }
    }

    /*******++++++++++++====Floor Plan=============********* */
    if (
      floor != isNullOrUndefined &&
      floor != '' &&
      floor != ' ' &&
      floor != undefined
    ) {
      for (let i in floor) {
        var f = floor[i].url.startsWith('http', 0);
        if (f) {
          // const update2dimage = await House.findByIdAndUpdate(
          //   { _id },
          //   {
          //     $set: { 'flipbook.image2D': image2D[i] },
          //   }
          // );
          //image2Dlinks.push(image2D[i]);
          floorplan.push(floor[i]);
        }
        if (!f) {
          let matches = await floor[i].url.match(
              /^data:([A-Za-z-+\/]+);base64,(.+)$/
            ),
            response = {};
          if (matches.length !== 3) {
            return new Error('Invalid input string');
          }
          response.type = matches[1];

          response.data = new Buffer.from(matches[2], 'base64');
          let decodedImg = response;
          let imageBuffer = decodedImg.data;
          let type = decodedImg.type;
          const name = type.split('/');

          const name1 = name[0];

          let extension = mime.extension(type);

          const rand = Math.ceil(Math.random() * 1000);
          //Random photo name with timeStamp so it will not overide previous images.
          const FileName = `${[i]}-${'floor-plan'}_${title}.${extension}`;

          path3 = path.resolve(`./public/media/flipbook/Land`);

          let localpath = `${path3}/${_id}/`;

          if (!fs.existsSync(localpath)) {
            fs.mkdirSync(localpath);
          }

          fs.writeFileSync(`${localpath}` + FileName, imageBuffer, 'utf8');
          ip = 'cuboidtechnologies.com';

          const url = `${req.protocol}://${ip}/media/flipbook/Land/${_id}/${FileName}`;

          let fileName = `${floor[i].fileName}`;
          floorplan.push({ fileName, url });
        }
      }

      const updatefloorPlan = await Land.findByIdAndUpdate(
        { _id },
        {
          $set: { 'flipbook.floorPlan': floorplan },
        }
      );
    }
    /*************************************************************/

    res.status(201).json({
      status: 'success',
    });
  }
  if (req.body.propertyType === 'Warehouse') {
    const updatedata = await WareHouse.updateMany(
      { _id },
      {
        $set: {
          'flipbook.title': title,
          'flipbook.description': description,
          'flipbook.tour360Property': tour360Property,
          'flipbook.map': map,
          'flippbook.contactSeller': contactSeller,
          'flipbook.propertyAvailability': propertyAvailability,
          'flipbook.sendmessageToSeller': sendmessageToSeller,
          'flipbook.showAttributes': showAttributes,
          isFlipbook: true,
        },
      }
    );
    /******************============BANNER==========********************/
    if (
      banner != isNullOrUndefined &&
      banner != '' &&
      banner != ' ' &&
      banner != undefined
    ) {
      var d = banner.startsWith('http', 0);
      if (d) {
        const updateflipbook = await WareHouse.findByIdAndUpdate(
          { _id },
          {
            $set: { 'flipbook.flipbookBanner': banner },
          }
        );
      }
      if (!d) {
        let matches = await banner.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};
        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
        response.type = matches[1];

        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');

        const name1 = name[0];

        let extension = mime.extension(type);

        const rand = Math.ceil(Math.random() * 1000);
        //Random photo name with timeStamp so it will not overide previous images.
        const fileName = `${title}-${'BANNER'}.${extension}`;

        path3 = path.resolve(`./public/media/flipbook/WareHouse`);

        let localpath = `${path3}/${_id}/`;

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }

        fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';

        const url = `${req.protocol}://${ip}/media/flipbook/WareHouse/${_id}/${fileName}`;

        /************************************** */

        const updateflipbook = await WareHouse.findByIdAndUpdate(
          { _id },
          {
            $set: { 'flipbook.flipbookBanner': url },
          }
        );
      }
    }

    /***********  2D Image Array****** */
    if (
      image2D != isNullOrUndefined &&
      image2D != '' &&
      image2D != ' ' &&
      image2D != undefined
    ) {
    }
    for (let i in image2D) {
      var e = image2D[i].startsWith('http', 0);
      if (e) {
        // const update2dimage = await House.findByIdAndUpdate(
        //   { _id },
        //   {
        //     $set: { 'flipbook.image2D': image2D[i] },
        //   }
        // );
        image2Dlinks.push(image2D[i]);
      }
      if (!e) {
        let matches = await image2D[i].match(
            /^data:([A-Za-z-+\/]+);base64,(.+)$/
          ),
          response = {};
        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
        response.type = matches[1];

        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');

        const name1 = name[0];

        let extension = mime.extension(type);

        const rand = Math.ceil(Math.random() * 1000);

        const fileName = `${title}_${'2D'}_${[i]}.${extension}`;

        path3 = path.resolve(`./public/media/flipbook/WareHouse`);

        let localpath = `${path3}/${_id}/`;

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }

        fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';

        const url = `${req.protocol}://${ip}/media/flipbook/WareHouse/${_id}/${fileName}`;

        image2Dlinks.push(url);

        /************************************** */
      }
    }

    const update2dimage = await WareHouse.findByIdAndUpdate(
      { _id },
      {
        $set: { 'flipbook.image2D': image2Dlinks },
      }
    );

    /*****************======Image 3D==================***********/
    if (
      image3D != isNullOrUndefined &&
      image3D != '' &&
      image3D != ' ' &&
      image3D != undefined
    ) {
      var c = image3D.startsWith('http', 0);
      let image3DUrl = '';
      if (req.body.image3D) {
        if (c) {
          const update3dimage = await WareHouse.findByIdAndUpdate(
            { _id },
            {
              $set: { 'flipbook.image3D': image3D },
            }
          );
        }
        if (!c) {
          let matches = await image3D.match(
              /^data:([A-Za-z-+\/]+);base64,(.+)$/
            ),
            response = {};
          if (matches.length !== 3) {
            return new Error('Invalid input string');
          }
          response.type = matches[1];

          response.data = new Buffer.from(matches[2], 'base64');
          let decodedImg = response;
          let imageBuffer = decodedImg.data;
          let type = decodedImg.type;
          const name = type.split('/');

          const name1 = name[0];

          let extension = mime.extension(type);

          const rand = Math.ceil(Math.random() * 1000);
          //Random photo name with timeStamp so it will not overide previous images.
          const fileName = `${'3D'}_${title}.${extension}`;

          path3 = path.resolve(`./public/media/flipbook/WareHouse`);

          let localpath = `${path3}/${_id}/`;

          if (!fs.existsSync(localpath)) {
            fs.mkdirSync(localpath);
          }

          fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
          ip = 'cuboidtechnologies.com';

          const url = `${req.protocol}://${ip}/media/flipbook/WareHouse/${_id}/${fileName}`;
          image3DUrl = url;
          const update3dimage = await WareHouse.findByIdAndUpdate(
            { _id },
            {
              $set: { 'flipbook.image3D': image3DUrl },
            }
          );

          /************************************** */
        }
      }
    }

    /*******++++++++++++====Floor Plan=============********* */
    if (
      floor != isNullOrUndefined &&
      floor != '' &&
      floor != ' ' &&
      floor != undefined
    ) {
      for (let i in floor) {
        var f = floor[i].url.startsWith('http', 0);

        if (f) {
          // const update2dimage = await House.findByIdAndUpdate(
          //   { _id },
          //   {
          //     $set: { 'flipbook.image2D': image2D[i] },
          //   }
          // );
          //image2Dlinks.push(image2D[i]);
          floorplan.push(floor[i]);
        }
        if (!f) {
          let matches = await floor[i].url.match(
              /^data:([A-Za-z-+\/]+);base64,(.+)$/
            ),
            response = {};
          if (matches.length !== 3) {
            return new Error('Invalid input string');
          }
          response.type = matches[1];

          response.data = new Buffer.from(matches[2], 'base64');
          let decodedImg = response;
          let imageBuffer = decodedImg.data;
          let type = decodedImg.type;
          const name = type.split('/');

          const name1 = name[0];

          let extension = mime.extension(type);

          const rand = Math.ceil(Math.random() * 1000);
          //Random photo name with timeStamp so it will not overide previous images.
          const FileName = `${[i]}-${'floor-plan'}_${title}.${extension}`;
          //const FileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

          path3 = path.resolve(`./public/media/flipbook/WareHouse`);

          let localpath = `${path3}/${_id}/`;

          if (!fs.existsSync(localpath)) {
            fs.mkdirSync(localpath);
          }

          fs.writeFileSync(`${localpath}` + FileName, imageBuffer, 'utf8');
          ip = 'cuboidtechnologies.com';

          const url = `${req.protocol}://${ip}/media/flipbook/WareHouse/${_id}/${FileName}`;

          let fileName = `${floor[i].fileName}`;
          floorplan.push({ fileName, url });
        }
      }

      const updatefloorPlan = await WareHouse.findByIdAndUpdate(
        { _id },
        {
          $set: { 'flipbook.floorPlan': floorplan },
        }
      );
    }

    /*************************************************************/
    res.status(201).json({
      status: 'success',
    });
  }
});

exports.saveFlipbook = catchAsync(async (req, res, next) => {
  const _id = req.body.userID;
  let flipbookArray = [];

  const userData = await User.findById({ _id });

  if (_id) {
    for (var i in userData.savedflipbook) {
      if (userData.savedflipbook[i] === req.body.propertyId) {
        return next(new AppError('Already Saved!', 400));
      }
    }
  }

  for (var i in userData.savedflipbook) {
    flipbookArray.push(userData.savedflipbook[i]);
  }
  flipbookArray.push(req.body.propertyId);

  const user = await User.findByIdAndUpdate(
    { _id },
    {
      $set: { savedflipbook: flipbookArray },
    }
  );

  res.status(200).json({
    status: 'success',
    results: user.length,
    data: {
      user,
    },
  });
});

exports.getFlipbookSavedByUser = catchAsync(async (req, res) => {
  // query id

  let userData = await User.findById({ _id: req.params.id });

  let getflipbookid = [];
  for (var i in userData.savedflipbook) {
    let getqueryHouse = await HouseQuery.findById({
      _id: userData.savedflipbook[i],
    });
    if (getqueryHouse) {
      getflipbookid.push(getqueryHouse);
    }

    let getqueryland = await LandQuery.findById({
      _id: userData.savedflipbook[i],
    });
    if (getqueryland) {
      getflipbookid.push(getqueryland);
    }

    let getqueryhotel = await HotelQuery.findById({
      _id: userData.savedflipbook[i],
    });
    if (getqueryhotel) {
      getflipbookid.push(getqueryhotel);
    }

    let getquerywarehouse = await WarehouseQuery.findById({
      _id: userData.savedflipbook[i],
    });
    if (getquerywarehouse) {
      getflipbookid.push(getquerywarehouse);
    }
  }

  res.status(200).json({
    status: 'success',
    results: getflipbookid.length,
    getQuery: getflipbookid,
  });
});

exports.deleteFlipbook = catchAsync(async (req, res) => {
  const idtodelete = req.body.idToDelete;

  const user = await User.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { savedflipbook: idtodelete } }
  );

  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.getFlipbookbyID = catchAsync(async (req, res) => {
  const _id = req.params.id;

  const flipbookHouse = await House.findById({ _id });
  const flipbookHotel = await Hotel.findById({ _id });
  const flipbookLand = await Land.findById({ _id });
  const flipbookWarehouse = await WareHouse.findById({ _id });

  if (flipbookHouse) {
    res.status(200).json({
      status: 'success',
      flipbook: flipbookHouse,
    });
  }
  if (flipbookHotel) {
    res.status(200).json({
      status: 'success',
      flipbook: flipbookHotel,
    });
  }
  if (flipbookLand) {
    res.status(200).json({
      status: 'success',

      flipbook: flipbookLand,
    });
  }
  if (flipbookWarehouse) {
    res.status(200).json({
      status: 'success',
      flipbook: flipbookWarehouse,
    });
  }
});

exports.getsimilarproperties = catchAsync(async (req, res) => {
  let propertyID = req.body.propertyId;

  let getHouse = await House.findById({ _id: propertyID });
  let getLand = await Land.findById({ _id: propertyID });
  let getHotel = await Hotel.findById({ _id: propertyID });
  let getWarehouse = await WareHouse.findById({ _id: propertyID });

  if (getHouse) {
    let cost = getHouse.attributes.cost;
    let Type = getHouse.categoryType;

    let similarpropQuery = {
      propertyId: propertyID,
      cost: cost,
      Type: Type,
    };
    const getHouseFind = await House.find({
      _id: { $ne: propertyID },
      'attributes.cost': { $eq: cost },
    });

    let SData;
    if (getHouseFind.length > 0) {
      SData = await SimilarPropQuery.create(similarpropQuery);

      res.status(200).json({
        status: 'success',
        results: getHouseFind.length,
        similarProperties: getHouseFind,
        queryId: SData._id,
      });
      /**************************************************** */
    } else {
      res.status(200).json({
        status: 'success',
        results: getHouse.length,
        message: 'No Similar Properties Found',
      });
    }
  }
  if (getLand) {
    let cost = getLand.attributes.cost;
    let Type = getLand.categoryType;

    let similarpropQuery = {
      propertyId: propertyID,
      cost: cost,
      Type: Type,
    };
    const getLandFind = await Land.find({
      _id: { $ne: propertyID },
      'attributes.cost': { $eq: cost },
    });

    let SData;
    if (getLandFind.length > 0) {
      SData = await SimilarPropQuery.create(similarpropQuery);
      res.status(200).json({
        status: 'success',
        results: getLandFind.length,
        similarProperties: getLandFind,
        queryId: SData._id,
      });
      /**************************************************** */
    } else {
      res.status(200).json({
        status: 'success',
        results: getLandFind.length,
        message: 'No Similar Properties Found',
      });
    }
  }
  if (getHotel) {
    let cost = getHotel.attributes.bedbreakfastcost;

    let Type = getHotel.categoryType;

    let similarpropQuery = {
      propertyId: propertyID,
      bedbreakfastcost: cost,
      Type: Type,
    };

    const getHotelFind = await Hotel.find({
      _id: { $ne: propertyID },
      'attributes.bedbreakfastcost': { $eq: cost },
    });
    let SData;
    if (getHotelFind.length > 0) {
      SData = await SimilarPropQuery.create(similarpropQuery);
      res.status(200).json({
        status: 'success',
        results: getHotelFind.length,
        similarProperties: getHotelFind,
        queryId: SData._id,
      });
      /**************************************************** */
    } else {
      res.status(200).json({
        status: 'success',
        results: getHotelFind.length,
        message: 'No Similar Properties Found',
      });
    }
  }
  if (getWarehouse) {
    let cost = getWarehouse.attributes.cost;
    let Type = getWarehouse.categoryType;

    let similarpropQuery = {
      propertyId: propertyID,
      cost: cost,
      Type: Type,
    };
    const getWarehouseFind = await WareHouse.find({
      _id: { $ne: propertyID },
      'attributes.cost': { $eq: cost },
    });
    let SData;
    if (getWarehouseFind.length > 0) {
      SData = await SimilarPropQuery.create(similarpropQuery);
      res.status(200).json({
        status: 'success',
        results: getWarehouseFind.length,
        similarProperties: getWarehouseFind,
        queryId: SData._id,
      });
      /**************************************************** */
    } else {
      res.status(200).json({
        status: 'success',
        results: getWarehouseFind.length,
        message: 'No Similar Properties Found',
      });
    }
  }
});
