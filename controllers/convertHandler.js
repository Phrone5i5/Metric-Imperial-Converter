function ConvertHandler() {
  
  this.getNum = function(input) {
    input ? input = input : input = '1';
    let result;
    const unitValueDecimal = /[0-9]*\.?[0-9]*/;
    const unitValueFraction = /[0-9]*\.?(?=[0-9])[0-9]*\/(?=[0-9]|\.)[0-9]*\.?(?=[0-9]*)[0-9]*/;
    const inputNumbers = input.split('').filter((character, i) => /[a-z]/i.test(character) ? false : true).join('');
    const isDoubleFraction = inputNumbers.split('').filter(character => character == '/' ? true : false).length > 1 ? true : false;
    const isFraction = inputNumbers.split('').filter(character => character == '/' ? true : false).length > 0 ? true : false;
    if (unitValueDecimal.test(inputNumbers) && !isFraction) {
      let numberLength = inputNumbers.split('').length;
      result = numberLength > 0 ? parseFloat(inputNumbers).toFixed(numberLength - 2) : null;
    } else if (unitValueFraction.test(inputNumbers) && !isDoubleFraction) {
      result = eval(inputNumbers);
    } else {
      console.log('Number format invalid or could not return value');
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const unitLabel = /[a-z]+/i;
    result = input.match(unitLabel)[0].toLowerCase();
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
      default : console.log('Invalid unit or format');
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
      default : console.log('Invalid unit or format');
    }    
    return result;
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
      default : console.log('Unable to convert');
    }
    return result.toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
