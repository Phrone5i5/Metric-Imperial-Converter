'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      if (initUnit == 'invalid unit' && initNum == 'invalid number') {
        res.send('invalid number and unit');
      } else if (initNum == 'invalid number') {
        res.send('invalid number');
      } else if (initUnit == 'invalid unit') {
        res.send('invalid unit');
      } else {
        res.status(200).json({ initNum: parseFloat(initNum), initUnit, returnNum: parseFloat(returnNum), returnUnit, string });
      }
  });

};
