const catchAsync = require('./../utils/catchAsync');
const path = require('path');
const mime = require('mime');
const fs = require('fs');

const House = require('./../models/houseModel');
const Land = require('./../models/landModel');
const Hotel = require('./../models/hotelModel');
const WareHouse = require('./../models/warehouseModel');
const User = require('../models/userModel');

exports.addFlipbook = catchAsync(async (req, res, next) => {
  // console.log(updatefields);
  //let floorPlantest;
  //floorPlantest = req.body.floortest[0].image;
  //console.log('floorPlanTest : ' + floorPlantest);

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
  //let id = req.body._id;
  let image2D = req.body.image2D;
  let image3D = req.body.image3D;
  floor = req.body.floorPlan;
  //console.log(floor);
  let _id = req.body._id;
  let showAttributes = req.body.showAttributes;
  //console.log(req.body.showAttributes);

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
    var d = banner.startsWith('http', 0);
    if (d) {
      //  console.log('true');
      const updateflipbook = await House.findByIdAndUpdate(
        { _id },
        {
          $set: { 'flipbook.flipbookBanner': banner },
        }
      );
    }
    //BANNER
    if (!d) {
      // console.log('false');
      let matches = await banner.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      // console.log(response.type);
      response.data = new Buffer.from(matches[2], 'base64');
      let decodedImg = response;
      let imageBuffer = decodedImg.data;
      let type = decodedImg.type;
      const name = type.split('/');
      // console.log(name);
      const name1 = name[0];
      // console.log(name1);
      let extension = mime.extension(type);
      // console.log(extension);
      const rand = Math.ceil(Math.random() * 1000);
      //Random photo name with timeStamp so it will not overide previous images.
      const fileName = `${title}-${'BANNER'}.${extension}`;
      //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

      // let fileName = name1 ++ '.' + extension;
      // console.log(filename);

      path3 = path.resolve(`./public/media/flipbook/House`);

      let localpath = `${path3}/${_id}/`;
      //console.log(localpath);

      if (!fs.existsSync(localpath)) {
        fs.mkdirSync(localpath);
      }
      // console.log(localpath);

      fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
      ip = 'cuboidtechnologies.com';
      //console.log(ip);
      const url = `${req.protocol}://${ip}/media/flipbook/House/${_id}/${fileName}`;

      //const imagepath2 = fs.readFileSync(localpath + fileName);
      //console.log('imagepath2  ' + imagepath2);
      // const updating = User.findByIdAndUpdate(req.user._id, {
      //   $set: { imagepath: url },
      // });
      // console.log(url);

      /************************************** */

      const updateflipbook = await House.findByIdAndUpdate(
        { _id },
        {
          $set: { 'flipbook.flipbookBanner': url },
        }
      );
    }

    /***********  2D Image Array****** */
    for (let i in image2D) {
      var e = image2D[i].startsWith('http', 0);
      if (e) {
        // console.log('true');
        // const update2dimage = await House.findByIdAndUpdate(
        //   { _id },
        //   {
        //     $set: { 'flipbook.image2D': image2D[i] },
        //   }
        // );
        image2Dlinks.push(image2D[i]);
        //  console.log(image2Dlinks);
      }
      if (!e) {
        //  console.log('false');
        let matches = await image2D[i].match(
            /^data:([A-Za-z-+\/]+);base64,(.+)$/
          ),
          response = {};
        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
        response.type = matches[1];
        // console.log(response.type);
        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');
        // console.log(name);
        const name1 = name[0];
        // console.log(name1);
        let extension = mime.extension(type);
        // console.log(extension);
        const rand = Math.ceil(Math.random() * 1000);
        //Random photo name with timeStamp so it will not overide previous images.
        const fileName = `${title}_${'2D'}_${[i]}.${extension}`;
        //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

        // let fileName = name1 ++ '.' + extension;
        // console.log(filename);

        path3 = path.resolve(`./public/media/flipbook/House`);

        let localpath = `${path3}/${_id}/`;
        //console.log(localpath);

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }
        // console.log(localpath);

        fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';
        //console.log(ip);
        const url = `${req.protocol}://${ip}/media/flipbook/House/${_id}/${fileName}`;

        image2Dlinks.push(url);

        //const imagepath2 = fs.readFileSync(localpath + fileName);
        //console.log('imagepath2  ' + imagepath2);
        // const updating = User.findByIdAndUpdate(req.user._id, {
        //   $set: { imagepath: url },
        // });

        /************************************** */
      }
    }
    const update2dimage = await House.findByIdAndUpdate(
      { _id },
      {
        $set: { 'flipbook.image2D': image2Dlinks },
      }
    );

    /*****************======Image 3D==================***********/

    // for (let i in image3D)
    //var str = req.protocol;
    var c = image3D.startsWith('http', 0);
    let image3DUrl = '';
    if (req.body.image3D) {
      if (c) {
        // console.log('true');
        const update3dimage = await House.findByIdAndUpdate(
          { _id },
          {
            $set: { 'flipbook.image3D': image3D },
          }
        );
      }
      if (!c) {
        // console.log('false');
        //console.log(image3D);
        // console.log(image3D);
        let matches = await image3D.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};
        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
        response.type = matches[1];
        // console.log(response.type);
        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');
        // console.log(name);
        const name1 = name[0];
        // console.log(name1);
        let extension = mime.extension(type);
        // console.log(extension);
        const rand = Math.ceil(Math.random() * 1000);
        //Random photo name with timeStamp so it will not overide previous images.
        const fileName = `${'3D'}_${title}.${extension}`;
        //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

        // let fileName = name1 ++ '.' + extension;
        // console.log(filename);

        path3 = path.resolve(`./public/media/flipbook/House`);

        let localpath = `${path3}/${_id}/`;
        //console.log(localpath);

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }
        // console.log(localpath);

        fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';
        //console.log(ip);
        const url = `${req.protocol}://${ip}/media/flipbook/House/${_id}/${fileName}`;
        image3DUrl = url;
        //const imagepath2 = fs.readFileSync(localpath + fileName);
        //console.log('imagepath2  ' + imagepath2);
        // const updating = User.findByIdAndUpdate(req.user._id, {
        //   $set: { imagepath: url },
        // });

        /************************************** */
        const update3dimage = await House.findByIdAndUpdate(
          { _id },
          {
            $set: { 'flipbook.image3D': image3DUrl },
          }
        );
      }
      //console.log(image3DUrl);
    }

    /*******++++++++++++====Floor Plan=============********* */

    for (let i in floor) {
      var f = floor[i].url.startsWith('http', 0);
      console.log('f : ' + f);
      if (f) {
        console.log('true');
        // const update2dimage = await House.findByIdAndUpdate(
        //   { _id },
        //   {
        //     $set: { 'flipbook.image2D': image2D[i] },
        //   }
        // );
        //image2Dlinks.push(image2D[i]);
        floorplan.push(floor[i]);
        console.log(floorplan);
      }
      if (!f) {
        console.log(floor[i].Name);
        let matches = await floor[i].url.match(
            /^data:([A-Za-z-+\/]+);base64,(.+)$/
          ),
          response = {};
        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
        response.type = matches[1];
        // console.log(response.type);
        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');
        // console.log(name);
        const name1 = name[0];
        // console.log(name1);
        let extension = mime.extension(type);
        // console.log(extension);
        const rand = Math.ceil(Math.random() * 1000);
        //Random photo name with timeStamp so it will not overide previous images.
        const FileName = `${[i]}-${'floor-plan'}_${
          floor[i].Name
        } _${title}.${extension}`;
        //const FileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

        // let FileName = name1 ++ '.' + extension;
        console.log('filename' + FileName);

        path3 = path.resolve(`./public/media/flipbook/House`);

        let localpath = `${path3}/${_id}/`;
        //console.log(localpath);

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }
        // console.log(localpath);

        fs.writeFileSync(`${localpath}` + FileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';
        //console.log(ip);
        const url = `${req.protocol}://${ip}/media/flipbook/House/${_id}/${FileName}`;
        //  let image = url;
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

    /*************************************************************/

    // const data = await House.find({ _id }, { flipbook: 1 });
    res.status(201).json({
      status: 'success',
      // banner: url,
      // image2D: image2Dlinks,
      // image3D: image3DUrl,
      // floorplan: floorplan,
      // description,
      // tour360Property,
      // map,
      // contactSeller,
      // propertyAvailability,
      // sendmessageToSeller,
      // data,
      // data: {
      //   flipbook: newFlipbook,
      // },
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
    var d = banner.startsWith('http', 0);
    if (d) {
      //  console.log('true');
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
      // console.log(response.type);
      response.data = new Buffer.from(matches[2], 'base64');
      let decodedImg = response;
      let imageBuffer = decodedImg.data;
      let type = decodedImg.type;
      const name = type.split('/');
      // console.log(name);
      const name1 = name[0];
      // console.log(name1);
      let extension = mime.extension(type);
      // console.log(extension);
      const rand = Math.ceil(Math.random() * 1000);
      //Random photo name with timeStamp so it will not overide previous images.
      const fileName = `${title}-${'BANNER'}.${extension}`;
      //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

      // let fileName = name1 ++ '.' + extension;
      // console.log(filename);

      path3 = path.resolve(`./public/media/flipbook/Hotel`);

      let localpath = `${path3}/${_id}/`;
      //console.log(localpath);

      if (!fs.existsSync(localpath)) {
        fs.mkdirSync(localpath);
      }
      // console.log(localpath);

      fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
      ip = 'cuboidtechnologies.com';
      //console.log(ip);
      const url = `${req.protocol}://${ip}/media/flipbook/Hotel/${_id}/${fileName}`;

      //const imagepath2 = fs.readFileSync(localpath + fileName);
      //console.log('imagepath2  ' + imagepath2);
      // const updating = User.findByIdAndUpdate(req.user._id, {
      //   $set: { imagepath: url },
      // });
      console.log(url);

      /************************************** */

      const updateflipbook = await Hotel.findByIdAndUpdate(
        { _id },
        {
          $set: { 'flipbook.flipbookBanner': url },
          'flipbook.title': req.body.title,
        }
      );
    }

    /***********  2D Image Array****** */
    for (let i in image2D) {
      var e = image2D[i].startsWith('http', 0);
      if (e) {
        // console.log('true');
        // const update2dimage = await House.findByIdAndUpdate(
        //   { _id },
        //   {
        //     $set: { 'flipbook.image2D': image2D[i] },
        //   }
        // );
        image2Dlinks.push(image2D[i]);
        //  console.log(image2Dlinks);
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
        // console.log(response.type);
        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');
        // console.log(name);
        const name1 = name[0];
        // console.log(name1);
        let extension = mime.extension(type);
        // console.log(extension);
        const rand = Math.ceil(Math.random() * 1000);
        //Random photo name with timeStamp so it will not overide previous images.
        const fileName = `${title}_${'2D'}_${[i]}.${extension}`;
        //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

        // let fileName = name1 ++ '.' + extension;
        // console.log(filename);

        path3 = path.resolve(`./public/media/flipbook/Hotel`);

        let localpath = `${path3}/${_id}/`;
        //console.log(localpath);

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }
        // console.log(localpath);

        fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';
        //console.log(ip);
        const url = `${req.protocol}://${ip}/media/flipbook/Hotel/${_id}/${fileName}`;

        image2Dlinks.push(url);
        //const imagepath2 = fs.readFileSync(localpath + fileName);
        //console.log('imagepath2  ' + imagepath2);
        // const updating = User.findByIdAndUpdate(req.user._id, {
        //   $set: { imagepath: url },
        // });

        /************************************** */
      }
    }
    const update2dimage = await Hotel.findByIdAndUpdate(
      { _id },
      {
        $set: { 'flipbook.image2D': image2Dlinks },
      }
    );

    /*****************======Image 3D==================***********/

    // for (let i in image3D)
    var c = image3D.startsWith('http', 0);
    let image3DUrl = '';
    if (req.body.image3D) {
      if (c) {
        // console.log('true');
        const update3dimage = await Hotel.findByIdAndUpdate(
          { _id },
          {
            $set: { 'flipbook.image3D': image3D },
          }
        );
      }
      if (!c) {
        let matches = await image3D.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};
        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
        response.type = matches[1];
        // console.log(response.type);
        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');
        // console.log(name);
        const name1 = name[0];
        // console.log(name1);
        let extension = mime.extension(type);
        // console.log(extension);
        const rand = Math.ceil(Math.random() * 1000);
        //Random photo name with timeStamp so it will not overide previous images.
        const fileName = `${'3D'}_${title}.${extension}`;
        //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

        // let fileName = name1 ++ '.' + extension;
        // console.log(filename);

        path3 = path.resolve(`./public/media/flipbook/Hotel`);

        let localpath = `${path3}/${_id}/`;
        //console.log(localpath);

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }
        // console.log(localpath);

        fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';
        //console.log(ip);
        const url = `${req.protocol}://${ip}/media/flipbook/Hotel/${_id}/${fileName}`;
        image3DUrl = url;
        //const imagepath2 = fs.readFileSync(localpath + fileName);
        //console.log('imagepath2  ' + imagepath2);
        // const updating = User.findByIdAndUpdate(req.user._id, {
        //   $set: { imagepath: url },
        // });

        /************************************** */
      }
      //console.log(image3DUrl);

      const update3dimage = await Hotel.findByIdAndUpdate(
        { _id },
        {
          $set: { 'flipbook.image3D': image3DUrl },
        }
      );
    }
    //console.log(image3D);
    // console.log(image3D);

    /*******++++++++++++====Floor Plan=============********* */
    for (let i in floor) {
      var f = floor[i].url.startsWith('http', 0);
      console.log('f : ' + f);
      if (f) {
        console.log('true');
        // const update2dimage = await House.findByIdAndUpdate(
        //   { _id },
        //   {
        //     $set: { 'flipbook.image2D': image2D[i] },
        //   }
        // );
        //image2Dlinks.push(image2D[i]);
        floorplan.push(floor[i]);
        console.log(floorplan);
      }
      // console.log(floor[i]);
      //console.log(image3D);
      // console.log(image3D);
      if (!f) {
        let matches = await floor[i].url.match(
            /^data:([A-Za-z-+\/]+);base64,(.+)$/
          ),
          response = {};
        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
        response.type = matches[1];
        // console.log(response.type);
        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');
        // console.log(name);
        const name1 = name[0];
        // console.log(name1);
        let extension = mime.extension(type);
        // console.log(extension);
        const rand = Math.ceil(Math.random() * 1000);
        //Random photo name with timeStamp so it will not overide previous images.
        const FileName = `${[i]}-${'floor-plan'}_${title}.${extension}`;
        //const FileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

        // let FileName = name1 ++ '.' + extension;
        // console.log(filename);

        path3 = path.resolve(`./public/media/flipbook/Hotel`);

        let localpath = `${path3}/${_id}/`;
        //console.log(localpath);

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }
        // console.log(localpath);

        fs.writeFileSync(`${localpath}` + FileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';
        //console.log(ip);
        const url = `${req.protocol}://${ip}/media/flipbook/Hotel/${_id}/${FileName}.${extension}`;

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

    /*************************************************************/

    // const data = await House.find({ _id }, { flipbook: 1 });
    res.status(201).json({
      status: 'success',
      // banner: url,
      // image2D: image2Dlinks,
      // image3D: image3DUrl,
      // floorplan: floorplan,
      // description,
      // tour360Property,
      // map,
      // contactSeller,
      // propertyAvailability,
      // sendmessageToSeller,
      // data,
      // data: {
      //   flipbook: newFlipbook,
      // },
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
    var d = banner.startsWith('http', 0);
    if (d) {
      //  console.log('true');
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
      // console.log(response.type);
      response.data = new Buffer.from(matches[2], 'base64');
      let decodedImg = response;
      let imageBuffer = decodedImg.data;
      let type = decodedImg.type;
      const name = type.split('/');
      // console.log(name);
      const name1 = name[0];
      // console.log(name1);
      let extension = mime.extension(type);
      // console.log(extension);
      const rand = Math.ceil(Math.random() * 1000);
      //Random photo name with timeStamp so it will not overide previous images.
      const fileName = `${title}-${'BANNER'}.${extension}`;
      //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

      // let fileName = name1 ++ '.' + extension;
      // console.log(filename);

      path3 = path.resolve(`./public/media/flipbook/Land`);

      let localpath = `${path3}/${_id}/`;
      console.log(localpath);

      if (!fs.existsSync(localpath)) {
        fs.mkdirSync(localpath);
      }
      // console.log(localpath);

      fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
      ip = 'cuboidtechnologies.com';
      //console.log(ip);
      const url = `${req.protocol}://${ip}/media/flipbook/Land/${_id}/${fileName}`;

      //const imagepath2 = fs.readFileSync(localpath + fileName);
      //console.log('imagepath2  ' + imagepath2);
      // const updating = User.findByIdAndUpdate(req.user._id, {
      //   $set: { imagepath: url },
      // });
      console.log(url);

      /************************************** */

      const updateflipbook = await Land.findByIdAndUpdate(
        { _id },
        {
          $set: { 'flipbook.flipbookBanner': url },
        }
      );
    }

    /***********  2D Image Array****** */
    for (let i in image2D) {
      var e = image2D[i].startsWith('http', 0);
      if (e) {
        // console.log('true');
        // const update2dimage = await House.findByIdAndUpdate(
        //   { _id },
        //   {
        //     $set: { 'flipbook.image2D': image2D[i] },
        //   }
        // );
        image2Dlinks.push(image2D[i]);
        //  console.log(image2Dlinks);
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
        // console.log(response.type);
        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');
        // console.log(name);
        const name1 = name[0];
        // console.log(name1);
        let extension = mime.extension(type);
        // console.log(extension);
        const rand = Math.ceil(Math.random() * 1000);
        //Random photo name with timeStamp so it will not overide previous images.
        const fileName = `${title}_${'2D'}_${[i]}.${extension}`;
        //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

        // let fileName = name1 ++ '.' + extension;
        // console.log(filename);

        path3 = path.resolve(`./public/media/flipbook/Land`);

        let localpath = `${path3}/${_id}/`;
        //console.log(localpath);

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }
        // console.log(localpath);

        fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';
        //console.log(ip);
        const url = `${req.protocol}://${ip}/media/flipbook/Land/${_id}/${fileName}`;

        image2Dlinks.push(url);
        //const imagepath2 = fs.readFileSync(localpath + fileName);
        //console.log('imagepath2  ' + imagepath2);
        // const updating = User.findByIdAndUpdate(req.user._id, {
        //   $set: { imagepath: url },
        // });

        /************************************** */
      }

      const update2dimage = await Land.findByIdAndUpdate(
        { _id },
        {
          $set: { 'flipbook.image2D': image2Dlinks },
        }
      );
    }
    /*****************======Image 3D==================***********/

    // for (let i in image3D)
    var c = image3D.startsWith('http', 0);
    let image3DUrl = '';
    if (req.body.image3D) {
      if (c) {
        // console.log('true');
        const update3dimage = await Land.findByIdAndUpdate(
          { _id },
          {
            $set: { 'flipbook.image3D': image3D },
          }
        );
      }
      if (!c) {
        let matches = await image3D.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};
        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
        response.type = matches[1];
        // console.log(response.type);
        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');
        // console.log(name);
        const name1 = name[0];
        // console.log(name1);
        let extension = mime.extension(type);
        // console.log(extension);
        const rand = Math.ceil(Math.random() * 1000);
        //Random photo name with timeStamp so it will not overide previous images.
        const fileName = `${'3D'}_${title}.${extension}`;
        //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

        // let fileName = name1 ++ '.' + extension;
        // console.log(filename);

        path3 = path.resolve(`./public/media/flipbook/Land`);

        let localpath = `${path3}/${_id}/`;
        //console.log(localpath);

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }
        // console.log(localpath);

        fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';
        //console.log(ip);
        const url = `${req.protocol}://${ip}/media/flipbook/Land/${_id}/${fileName}`;
        image3DUrl = url;
        //const imagepath2 = fs.readFileSync(localpath + fileName);
        //console.log('imagepath2  ' + imagepath2);
        // const updating = User.findByIdAndUpdate(req.user._id, {
        //   $set: { imagepath: url },
        // });

        /************************************** */
      }
      //console.log(image3DUrl);

      const update3dimage = await Land.findByIdAndUpdate(
        { _id },
        {
          $set: { 'flipbook.image3D': image3DUrl },
        }
      );
    }

    /*******++++++++++++====Floor Plan=============********* */
    for (let i in floor) {
      var f = floor[i].url.startsWith('http', 0);
      if (f) {
        console.log('true');
        // const update2dimage = await House.findByIdAndUpdate(
        //   { _id },
        //   {
        //     $set: { 'flipbook.image2D': image2D[i] },
        //   }
        // );
        //image2Dlinks.push(image2D[i]);
        floorplan.push(floor[i]);
        console.log(floorplan);
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
        // console.log(response.type);
        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');
        // console.log(name);
        const name1 = name[0];
        // console.log(name1);
        let extension = mime.extension(type);
        // console.log(extension);
        const rand = Math.ceil(Math.random() * 1000);
        //Random photo name with timeStamp so it will not overide previous images.
        const FileName = `${[i]}-${'floor-plan'}_${title}.${extension}`;
        //const FileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

        // let FileName = name1 ++ '.' + extension;
        // console.log(filename);

        path3 = path.resolve(`./public/media/flipbook/Land`);

        let localpath = `${path3}/${_id}/`;
        //console.log(localpath);

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }
        // console.log(localpath);

        fs.writeFileSync(`${localpath}` + FileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';
        //console.log(ip);
        const url = `${req.protocol}://${ip}/media/flipbook/Land/${_id}/${FileName}.${extension}`;

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

    /*************************************************************/

    // const data = await House.find({ _id }, { flipbook: 1 });
    res.status(201).json({
      status: 'success',
      // banner: url,
      // image2D: image2Dlinks,
      // image3D: image3DUrl,
      // floorplan: floorplan,
      // description,
      // tour360Property,
      // map,
      // contactSeller,
      // propertyAvailability,
      // sendmessageToSeller,
      // data,
      // data: {
      //   flipbook: newFlipbook,
      // },
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
    var d = banner.startsWith('http', 0);
    if (d) {
      //  console.log('true');
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
      // console.log(response.type);
      response.data = new Buffer.from(matches[2], 'base64');
      let decodedImg = response;
      let imageBuffer = decodedImg.data;
      let type = decodedImg.type;
      const name = type.split('/');
      // console.log(name);
      const name1 = name[0];
      // console.log(name1);
      let extension = mime.extension(type);
      // console.log(extension);
      const rand = Math.ceil(Math.random() * 1000);
      //Random photo name with timeStamp so it will not overide previous images.
      const fileName = `${title}-${'BANNER'}.${extension}`;
      //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

      // let fileName = name1 ++ '.' + extension;
      // console.log(filename);

      path3 = path.resolve(`./public/media/flipbook/WareHouse`);

      let localpath = `${path3}/${_id}/`;
      console.log(localpath);

      if (!fs.existsSync(localpath)) {
        fs.mkdirSync(localpath);
      }
      // console.log(localpath);

      fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
      ip = 'cuboidtechnologies.com';
      //console.log(ip);
      const url = `${req.protocol}://${ip}/media/flipbook/WareHouse/${_id}/${fileName}`;

      //const imagepath2 = fs.readFileSync(localpath + fileName);
      //console.log('imagepath2  ' + imagepath2);
      // const updating = User.findByIdAndUpdate(req.user._id, {
      //   $set: { imagepath: url },
      // });
      console.log(url);

      /************************************** */

      const updateflipbook = await WareHouse.findByIdAndUpdate(
        { _id },
        {
          $set: { 'flipbook.flipbookBanner': url },
        }
      );
    }

    /***********  2D Image Array****** */
    for (let i in image2D) {
      var e = image2D[i].startsWith('http', 0);
      if (e) {
        // console.log('true');
        // const update2dimage = await House.findByIdAndUpdate(
        //   { _id },
        //   {
        //     $set: { 'flipbook.image2D': image2D[i] },
        //   }
        // );
        image2Dlinks.push(image2D[i]);
        //  console.log(image2Dlinks);
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
        // console.log(response.type);
        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');
        // console.log(name);
        const name1 = name[0];
        // console.log(name1);
        let extension = mime.extension(type);
        // console.log(extension);
        const rand = Math.ceil(Math.random() * 1000);
        //Random photo name with timeStamp so it will not overide previous images.
        const fileName = `${title}_${'2D'}_${[i]}.${extension}`;
        //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

        // let fileName = name1 ++ '.' + extension;
        // console.log(filename);

        path3 = path.resolve(`./public/media/flipbook/WareHouse`);

        let localpath = `${path3}/${_id}/`;
        //console.log(localpath);

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }
        // console.log(localpath);

        fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';
        //console.log(ip);
        const url = `${req.protocol}://${ip}/media/flipbook/WareHouse/${_id}/${fileName}`;

        image2Dlinks.push(url);
        //const imagepath2 = fs.readFileSync(localpath + fileName);
        //console.log('imagepath2  ' + imagepath2);
        // const updating = User.findByIdAndUpdate(req.user._id, {
        //   $set: { imagepath: url },
        // });

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

    // for (let i in image3D)
    var c = image3D.startsWith('http', 0);
    let image3DUrl = '';
    if (req.body.image3D) {
      if (c) {
        // console.log('true');
        const update3dimage = await WareHouse.findByIdAndUpdate(
          { _id },
          {
            $set: { 'flipbook.image3D': image3D },
          }
        );
      }
      if (!c) {
        let matches = await image3D.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};
        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
        response.type = matches[1];
        // console.log(response.type);
        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');
        // console.log(name);
        const name1 = name[0];
        // console.log(name1);
        let extension = mime.extension(type);
        // console.log(extension);
        const rand = Math.ceil(Math.random() * 1000);
        //Random photo name with timeStamp so it will not overide previous images.
        const fileName = `${'3D'}_${title}.${extension}`;
        //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

        // let fileName = name1 ++ '.' + extension;
        // console.log(filename);

        path3 = path.resolve(`./public/media/flipbook/WareHouse`);

        let localpath = `${path3}/${_id}/`;
        //console.log(localpath);

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }
        // console.log(localpath);

        fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';
        //console.log(ip);
        const url = `${req.protocol}://${ip}/media/flipbook/WareHouse/${_id}/${fileName}`;
        image3DUrl = url;
        //const imagepath2 = fs.readFileSync(localpath + fileName);
        //console.log('imagepath2  ' + imagepath2);
        // const updating = User.findByIdAndUpdate(req.user._id, {
        //   $set: { imagepath: url },
        // });

        /************************************** */
      }
      //console.log(image3DUrl);

      const update3dimage = await WareHouse.findByIdAndUpdate(
        { _id },
        {
          $set: { 'flipbook.image3D': image3DUrl },
        }
      );
    }
    //console.log(image3D);
    // console.log(image3D);

    /*******++++++++++++====Floor Plan=============********* */
    for (let i in floor) {
      var f = floor[i].url.startsWith('http', 0);
      //console.log(image3D);
      // console.log(image3D);
      if (f) {
        console.log('true');
        // const update2dimage = await House.findByIdAndUpdate(
        //   { _id },
        //   {
        //     $set: { 'flipbook.image2D': image2D[i] },
        //   }
        // );
        //image2Dlinks.push(image2D[i]);
        floorplan.push(floor[i]);
        console.log(floorplan);
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
        // console.log(response.type);
        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        const name = type.split('/');
        // console.log(name);
        const name1 = name[0];
        // console.log(name1);
        let extension = mime.extension(type);
        // console.log(extension);
        const rand = Math.ceil(Math.random() * 1000);
        //Random photo name with timeStamp so it will not overide previous images.
        const FileName = `${[i]}-${'floor-plan'}_${title}.${extension}`;
        //const FileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

        // let FileName = name1 ++ '.' + extension;
        // console.log(filename);

        path3 = path.resolve(`./public/media/flipbook/WareHouse`);

        let localpath = `${path3}/${_id}/`;
        //console.log(localpath);

        if (!fs.existsSync(localpath)) {
          fs.mkdirSync(localpath);
        }
        // console.log(localpath);

        fs.writeFileSync(`${localpath}` + FileName, imageBuffer, 'utf8');
        ip = 'cuboidtechnologies.com';
        //console.log(ip);
        const url = `${req.protocol}://${ip}/media/flipbook/WareHouse/${_id}/${FileName}.${extension}`;

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

    /*************************************************************/

    // const data = await House.find({ _id }, { flipbook: 1 });
    res.status(201).json({
      status: 'success',
      // banner: url,
      // image2D: image2Dlinks,
      // image3D: image3DUrl,
      // floorplan: floorplan,
      // description,
      // tour360Property,
      // map,
      // contactSeller,
      // propertyAvailability,
      // sendmessageToSeller,
      // data,
      // data: {
      //   flipbook: newFlipbook,
      // },
    });
  }
  //const newFlipbook = await Flipbook.create(req.body);
  // res.status(201).json({/
  // status: 'success',
  // data: {
  //   flipbook: newFlipbook,
  // },
  // });
});

// exports.getFlipbook = catchAsync(async (req, res) => {
//   const flipbook = await Flipbook.find();
//   res.status(200).json({
//     status: 'success',
//     results: flipbook.length,
//     data: {
//       flipbook,
//     },
//   });
// });

exports.saveFlipbook = catchAsync(async (req, res) => {
  const _id = req.body.userID;
  let flipbookArray = [];

  const userData = await User.findById({ _id });

  // console.log(userData.savedflipbook);

  for (var i in userData.savedflipbook) {
    flipbookArray.push(userData.savedflipbook[i]);
  }
  flipbookArray.push(req.body.propertyId);

  console.log(flipbookArray);

  const user = await User.findByIdAndUpdate(
    { _id },
    {
      $set: { savedflipbook: flipbookArray },
    }
  );
  //console.log(user);

  //const flipbook = await Flipbook.find();
  res.status(200).json({
    status: 'success',
    results: user.length,
    data: {
      user,
    },
  });
});

exports.getFlipbookSavedByUser = catchAsync(async (req, res) => {
  let saveflipbook = [];

  const _id = req.params.id;
  const user = await User.findById({ _id }, { savedflipbook: 1 });

  for (var i in user.savedflipbook) {
    let flipbookdata = [];
    const house = await House.findById({ _id: user.savedflipbook[i] });
    const land = await Land.findById({ _id: user.savedflipbook[i] });
    const hotel = await Hotel.findByIdAndDelete({ _id: user.savedflipbook[i] });
    const warehouse = await WareHouse.findByIdAndDelete({
      _id: user.savedflipbook[i],
    });
    if (house) {
      flipbookdata.push(user.savedflipbook[i], house.flipbook.image2D[0]);
      saveflipbook.push([flipbookdata]);
    }
    if (land) {
      flipbookdata.push(user.savedflipbook[i], land.flipbook.image2D[0]);
      saveflipbook.push([flipbookdata]);
    }
    if (hotel) {
      flipbookdata.push(user.savedflipbook[i], hotel.flipbook.image2D[0]);
      saveflipbook.push([flipbookdata]);
    }
    if (warehouse) {
      flipbookdata.push(user.savedflipbook[i], warehouse.flipbook.image2D[0]);
      saveflipbook.push([flipbookdata]);
    }

    // saveflipbook.push(property.flipbook.image2D[0]);
  }
  // saveflipbook.push(flipbookdata);

  // console.log('2d image path ' + property.flipbook.image2D);
  //console.log(user.savedflipbook);
  res.status(200).json({
    status: 'success',
    results: user.length,
    //savedflipbook: user.savedflipbook + property.flipbook.image2D[0],
    saveflipbook,
  });
});

exports.deleteFlipbook = catchAsync(async (req, res) => {
  //const _id = req.params.id;
  console.log('user id ' + req.params.id);
  const idtodelete = req.body.idToDelete;

  const user = await User.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { savedflipbook: idtodelete } }
  );
  console.log(user);
  res.status(200).json({
    status: 'success',
    //results: user.length,
    user,
  });
});

exports.getFlipbookbyID = catchAsync(async (req, res) => {
  console.log('hi');
  const _id = req.params.id;
  console.log(req.params.id);

  const flipbookHouse = await House.findById({ _id });
  const flipbookHotel = await Hotel.findById({ _id });
  const flipbookLand = await Land.findById({ _id });
  const flipbookWarehouse = await WareHouse.findById({ _id });

  if (flipbookHouse) {
    //console.log(flipbook);
    res.status(200).json({
      status: 'success',
      //results: user.length,
      flipbook: flipbookHouse,
    });
  }
  if (flipbookHotel) {
    //console.log(flipbook);
    res.status(200).json({
      status: 'success',
      //results: user.length,
      flipbook: flipbookHotel,
    });
  }
  if (flipbookLand) {
    //console.log(flipbook);
    res.status(200).json({
      status: 'success',
      //results: user.length,
      flipbook: flipbookLand,
    });
  }
  if (flipbookWarehouse) {
    //console.log(flipbook);
    res.status(200).json({
      status: 'success',
      //results: user.length,
      flipbook: flipbookWarehouse,
    });
  }
});
// exports.getFlipbookbyID = catchAsync(async (req, res) => {
//   propertyid = req.body.propertyId;
// });
