const catchAsync = require('./../utils/catchAsync');
const path = require('path');
const mime = require('mime');
const fs = require('fs');

const House = require('./../models/houseModel');
const Land = require('./../models/landModel');
const Hotel = require('./../models/hotelModel');
const WareHouse = require('./../models/warehouseModel');

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
  let id = req.body._id;
  let image2D = req.body.image2D;
  let image3D = req.body.image3D;
  floor = req.body.floorPlan;
  //console.log(floor);
  let _id = req.body._id;
  let showAttributes = req.body.showAttributes;
  //console.log(req.body.showAttributes);

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
        },
      }
    );
    /******************============BANNER==========********************/
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
    ip = '54.164.209.42';
    //console.log(ip);
    const url = `${req.protocol}://${ip}/media/flipbook/House/${_id}/${fileName}`;

    //const imagepath2 = fs.readFileSync(localpath + fileName);
    //console.log('imagepath2  ' + imagepath2);
    // const updating = User.findByIdAndUpdate(req.user._id, {
    //   $set: { imagepath: url },
    // });
    console.log(url);

    /************************************** */

    const updateflipbook = await House.findByIdAndUpdate(
      { _id },
      {
        $set: { 'flipbook.flipbookBanner': url },
      }
    );

    /***********  2D Image Array****** */
    for (let i in image2D) {
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
      ip = '54.164.209.42';
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

    const update2dimage = await House.findByIdAndUpdate(
      { _id },
      {
        $set: { 'flipbook.image2D': image2Dlinks },
      }
    );

    /*****************======Image 3D==================***********/

    // for (let i in image3D)
    let image3DUrl = '';
    if (req.body.image3D) {
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
      ip = '54.164.209.42';
      //console.log(ip);
      const url = `${req.protocol}://${ip}/media/flipbook/House/${_id}/${fileName}`;
      image3DUrl = url;
      //const imagepath2 = fs.readFileSync(localpath + fileName);
      //console.log('imagepath2  ' + imagepath2);
      // const updating = User.findByIdAndUpdate(req.user._id, {
      //   $set: { imagepath: url },
      // });

      /************************************** */
    }
    //console.log(image3DUrl);

    const update3dimage = await House.findByIdAndUpdate(
      { _id },
      {
        $set: { 'flipbook.image3D': image3DUrl },
      }
    );

    /*******++++++++++++====Floor Plan=============********* */
    for (let i in floor) {
      //console.log(image3D);
      // console.log(image3D);
      console.log(floor[i].name);
      let matches = await floor[i].image.match(
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
      const fileName = `${[i]}-${'floor-plan'}_${
        floor[i].name
      }_${title}.${extension}`;
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
      ip = '54.164.209.42';
      //console.log(ip);
      const url = `${req.protocol}://${ip}/media/flipbook/House/${_id}/${fileName}`;

      floorplan.push(url);
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
      banner: url,
      image2D: image2Dlinks,
      image3D: image3DUrl,
      floorplan: floorplan,
      description,
      tour360Property,
      map,
      contactSeller,
      propertyAvailability,
      sendmessageToSeller,
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
        },
      }
    );
    /******************============BANNER==========********************/
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
    ip = '54.164.209.42';
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

    /***********  2D Image Array****** */
    for (let i in image2D) {
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
      ip = '54.164.209.42';
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

    const update2dimage = await Hotel.findByIdAndUpdate(
      { _id },
      {
        $set: { 'flipbook.image2D': image2Dlinks },
      }
    );

    /*****************======Image 3D==================***********/

    // for (let i in image3D)
    let image3DUrl = '';
    if (req.body.image3D) {
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

      path3 = path.resolve(`./public/media/flipbook/Hotel`);

      let localpath = `${path3}/${_id}/`;
      //console.log(localpath);

      if (!fs.existsSync(localpath)) {
        fs.mkdirSync(localpath);
      }
      // console.log(localpath);

      fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
      ip = '54.164.209.42';
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

    /*******++++++++++++====Floor Plan=============********* */
    for (let i in floor) {
      //console.log(image3D);
      // console.log(image3D);
      let matches = await floor[i].match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
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
      const fileName = `${[i]}-${'floor-plan'}_${title}.${extension}`;
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
      ip = '54.164.209.42';
      //console.log(ip);
      const url = `${req.protocol}://${ip}/media/flipbook/Hotel/${_id}/${fileName}`;

      floorplan.push(url);
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
      banner: url,
      image2D: image2Dlinks,
      image3D: image3DUrl,
      floorplan: floorplan,
      description,
      tour360Property,
      map,
      contactSeller,
      propertyAvailability,
      sendmessageToSeller,
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
        },
      }
    );
    /******************============BANNER==========********************/
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
    ip = '54.164.209.42';
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

    /***********  2D Image Array****** */
    for (let i in image2D) {
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
      ip = '54.164.209.42';
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

    /*****************======Image 3D==================***********/

    // for (let i in image3D)
    let image3DUrl = '';
    if (req.body.image3D) {
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

      path3 = path.resolve(`./public/media/flipbook/Land`);

      let localpath = `${path3}/${_id}/`;
      //console.log(localpath);

      if (!fs.existsSync(localpath)) {
        fs.mkdirSync(localpath);
      }
      // console.log(localpath);

      fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
      ip = '54.164.209.42';
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

    /*******++++++++++++====Floor Plan=============********* */
    for (let i in floor) {
      //console.log(image3D);
      // console.log(image3D);
      let matches = await floor[i].match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
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
      const fileName = `${[i]}-${'floor-plan'}_${title}.${extension}`;
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
      ip = '54.164.209.42';
      //console.log(ip);
      const url = `${req.protocol}://${ip}/media/flipbook/Land/${_id}/${fileName}`;

      floorplan.push(url);
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
      banner: url,
      image2D: image2Dlinks,
      image3D: image3DUrl,
      floorplan: floorplan,
      description,
      tour360Property,
      map,
      contactSeller,
      propertyAvailability,
      sendmessageToSeller,
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
        },
      }
    );
    /******************============BANNER==========********************/
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

    path3 = path.resolve(`./public/media/flipbook`);

    let localpath = `${path3}/${'Warehouse'}/${_id}/`;
    console.log(localpath);

    if (!fs.existsSync(localpath)) {
      fs.mkdirSync(localpath);
    }
    // console.log(localpath);

    fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
    ip = '54.164.209.42';
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

    /***********  2D Image Array****** */
    for (let i in image2D) {
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
      ip = '54.164.209.42';
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

    const update2dimage = await WareHouse.findByIdAndUpdate(
      { _id },
      {
        $set: { 'flipbook.image2D': image2Dlinks },
      }
    );

    /*****************======Image 3D==================***********/

    // for (let i in image3D)
    let image3DUrl = '';
    if (req.body.image3D) {
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

      path3 = path.resolve(`./public/media/flipbook/WareHouse`);

      let localpath = `${path3}/${_id}/`;
      //console.log(localpath);

      if (!fs.existsSync(localpath)) {
        fs.mkdirSync(localpath);
      }
      // console.log(localpath);

      fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
      ip = '54.164.209.42';
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

    /*******++++++++++++====Floor Plan=============********* */
    for (let i in floor) {
      //console.log(image3D);
      // console.log(image3D);
      let matches = await floor[i].match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
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
      const fileName = `${[i]}-${'floor-plan'}_${title}.${extension}`;
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
      ip = '54.164.209.42';
      //console.log(ip);
      const url = `${req.protocol}://${ip}/media/flipbook/WareHouse/${_id}/${fileName}`;

      floorplan.push(url);
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
      banner: url,
      image2D: image2Dlinks,
      image3D: image3DUrl,
      floorplan: floorplan,
      description,
      tour360Property,
      map,
      contactSeller,
      propertyAvailability,
      sendmessageToSeller,
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

exports.getFlipbook = catchAsync(async (req, res) => {
  const flipbook = await Flipbook.find();
  res.status(200).json({
    status: 'success',
    results: flipbook.length,
    data: {
      flipbook,
    },
  });
});
