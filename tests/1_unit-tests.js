const { AssertionError } = require('chai');
const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite ('Unit Tests', function(){
    /* 1 */
    suite('getNum valid input checking', () => {
            // 1
        test('Make sure getNum can handle a whole number input', (done) => {
            assert.equal(convertHandler.getNum('5mi'), 5, 'getNum did not handle whole number.');
            done();
        });
            // 2
        test('Make sure getNum can handle a decimal number input', (done) => {
            assert.equal(convertHandler.getNum('3.51mi'), 3.51, 'getNum did not handle decimal number');
            done();
        });
            // 3
        test('Make sure getNum can handle a fractional input', (done) => {
            assert.equal(convertHandler.getNum('1/3L'), 0.33333 , 'getNum did not handle fraction');
            done();
        });
            // 4
        test('Make sure getNum can handle a fractional input with decimals', (done) => {
            assert.equal(convertHandler.getNum('3.1/6.5mi'), 0.47692, 'getNum did not handle fractional number with decimal');
            done();
        });
    });
    /* 2 */
    suite('getNum invalid input checking', () => {
            // 5
        test('Make sure getNum rejects a double fraction', (done) => {
            assert.equal(convertHandler.getNum('3/2/3gal'), 'invalid number', 'getNum rejected double fraction');
            done();
        });
    });
    /* 3 */
    suite('getNum default value checking', () => {
            // 6
        test('Make sure getNum returns "1" for non-numbered unit input', (done) => {
            assert.equal(convertHandler.getNum('gal'), '1', 'getNum did not return "1" for non-numbered unit');
            done();
        });
    });
    /* 4 */
    suite('getUnit valid input checking', () => {
            // 7
        test('Make sure getUnit can handle all valid unit input' , (done) => {
            assert.equal(convertHandler.getUnit('1gal'), 'gal', 'getNum did not get unit from gallon type');
            assert.equal(convertHandler.getUnit('1L'), 'L', 'getNum did not get unit from liter unit type');
            assert.equal(convertHandler.getUnit('1mi'), 'mi', 'getNum did not get unit from mile input type');
            assert.equal(convertHandler.getUnit('1km'), 'km', 'getNum did not get unit from kilometer unit type');
            assert.equal(convertHandler.getUnit('1lbs'), 'lbs', 'getNum did not get unit from pound (lbs) unit type');
            assert.equal(convertHandler.getUnit('1kg'), 'kg', 'getNum did not get unit from kilogram unit type');
            done();
        });
    });
    /* 5 */
    suite('getUnit invalid input checking', () => {
            // 8
        test('Make sure getUnit returns an error message for invalid unit input', (done) => {
            assert.equal(convertHandler.getUnit('1floop'), 'invalid unit','getUnit did not throw error for invalid unit');
            assert.equal(convertHandler.getUnit('floop'), 'invalid unit','getUnit did not throw error for invalid unit');
            assert.equal(convertHandler.getUnit('1/3floop'), 'invalid unit','getUnit did not throw error for invalid unit');
            assert.equal(convertHandler.getUnit('1.5/7floop'), 'invalid unit','getUnit did not throw error for invalid unit');
            done();
        });
    });
    /* 6 */
    suite('getReturnUnit valid input checking', () => {
            // 9
        test('Make sure getReturnUnit can handle all valid unit type label conversion', (done) => {
            assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('gal')), 'L', 'getReturnUnit did not handle"gal" -> "L" unit conversion');
            assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('L')), 'gal', 'getReturnUnit did not handle "L" -> "gal" unit conversion');
            assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('mi')), 'km', 'getReturnUnit did not handle "mi"-> "km" unit conversion');
            assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('km')), 'mi', 'getReturnUnit did not handle "km" -> "mi" unit conversion');
            assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('lbs')), 'kg', 'getReturnUnit did not handle "lbs" -> "kg" unit conversion');
            assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('kg')), 'lbs', 'getReturnUnit did not handle "kg" ->  unit conversion');
            done();
        });
    });
    /* 7 */
    suite('spellOutUnit valid input checking', () => {
            // 10
        test('Make sure spellOutUnit can return the full label for each abbreviated unit label', (done) => {
            assert.equal(convertHandler.spellOutUnit('gal'), 'gallons', 'spellOutUnit did not handle "gal" -> "gallons" label return');
            assert.equal(convertHandler.spellOutUnit('L'), 'liters', 'spellOutUnit did not handle "L" -> "liters" label return');
            assert.equal(convertHandler.spellOutUnit('mi'), 'miles', 'spellOutUnit did not handle "mi" -> "miles" label return');
            assert.equal(convertHandler.spellOutUnit('km'), 'kilometers', 'spellOutUnit did not handle "km" -> "kilometers" label return');
            assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds', 'spellOutUnit did not handle "lbs" -> "pounds" label return');
            assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms', 'spellOutUnit did not handle "kg" -> "kilograms" label return');
            done();
        });
    });
    /* 8 */
    suite('convert valid input checking', () => {
            // 11
        test('Make sure convert can handle gallons -> liters', (done) => {
            assert.equal(convertHandler.convert('1', 'gal'), '3.78541', 'convert did not handle gal -> L conversion');
            done();
        });
            // 12
        test('Make sure convert can handle liters -> gallons', (done) => {
            assert.equal(convertHandler.convert('1', 'L'), '0.26417', 'convert did not handle L -> gal conversion');
            done();
        });
            // 13
        test('Make sure convert can handle miles -> kilometers', (done) => {
            assert.equal(convertHandler.convert('1', 'mi'), '1.60934', 'convert did not handle "mi"-> "km" conversion');
            done();
        });
            // 14
        test('Make sure convert can handle kilometers -> miles', (done) => {
            assert.equal(convertHandler.convert('1', 'km'), '0.62137', 'convert did not handle "km" -> "mi" conversion');
            done();
        });
            // 15
        test('Make sure convert can handle pounds -> kilograms', (done) => {
            assert.equal(convertHandler.convert('1', 'lbs'), '0.45359', 'convert did not handle "lbs" -> "kg" conversion');
            done();
        });
            // 16
        test('Make sure convert can handle kilograms -> pounds', (done) => {
            assert.equal(convertHandler.convert('1', 'kg'), '2.20462', 'convert did not handle "kg" -> "lbs" conversion');
            done();
        });
    });
});