function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const unitValueDecimal = /[0-9]*\.?[0-9]*/;
    const unitValueFraction = /[0-9]*\.?(?=[0-9])[0-9]*\/(?=[0-9]|\.)[0-9]*\.?(?=[0-9]*)[0-9]*/;
    let inputNumbers = input.split('').filter((character, i) => /[a-z]/i.test(character) ? false : true).join('');
    if (!inputNumbers) {
    	inputNumbers = '1'
    }
    const isDoubleFraction = inputNumbers.split('').filter(character => character == '/' ? true : false).length > 1 ? true : false;
    const isFraction = inputNumbers.split('').filter(character => character == '/' ? true : false).length > 0 ? true : false;
    if (unitValueDecimal.test(inputNumbers) && !isFraction) {
      let numberLength = inputNumbers.split('').length > 0 ? inputNumbers.split('').length - 1 : 1;
      result = numberLength > 0 ? parseFloat(inputNumbers).toFixed(numberLength - 1) : parseFloat(inputNumbers);
    } else if (unitValueFraction.test(inputNumbers) && !isDoubleFraction) {
      result = eval(inputNumbers).toFixed(5);
    } else {
      result = 'invalid number';
    }
    return result;
  };
  
  this.getUnit = function(input) {
    input = input.toLowerCase();
    let result;
    const unitLabels = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const unitLabelRegEx = /[a-z]+/i;
    const inputLabel = input.match(unitLabelRegEx);
    if (inputLabel && unitLabels.some(label => inputLabel[0].toLowerCase() == label.toLowerCase() ? true : false)) {
      result = inputLabel[0];
    } else {
      result = 'invalid unit';
    }
    if (result == 'l') {
      result = 'L';
    } else if (result != 'L' && result) {
      result = result.toLowerCase();
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit) {
      case 'gal' : result = 'L'; 
        break;
      case 'L' : result = 'gal'; 
        break;
      case 'mi' : result = 'km';
        break;
      case 'km' : result = 'mi';
        break;
      case 'lbs' : result = 'kg';
        break;
      case 'kg' : result = 'lbs'
        break;
      default : result = 'invalid unit';
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit) {
      case 'gal' : result = 'gallons'; 
        break;
      case 'L' : result = 'liters'; 
        break;
      case 'mi' : result = 'miles';
        break;
      case 'km' : result = 'kilometers';
        break;
      case 'lbs' : result = 'pounds';
        break;
      case 'kg' : result = 'kilograms'
        break;
      default : result = 'invalid unit';
        break;
    }    
    return result ? result : null;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal' : result = initNum * galToL;
        break;
      case 'L' : result = initNum / galToL;
        break;
      case 'mi' : result = initNum * miToKm;
        break;
      case 'km' : result = initNum / miToKm;
        break;
      case 'lbs' : result = initNum * lbsToKg;
        break;
      case 'kg' : result = initNum / lbsToKg;
        break;
      default:
        break;
    }
    return result ? parseFloat(result).toFixed(5) : null;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
