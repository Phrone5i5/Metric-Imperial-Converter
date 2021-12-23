const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const app = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  // 1
  test('Make sure valid number converts at GET /api/convert', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end((err, res) => {
        const returnObj = JSON.parse(res.text);
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.deepEqual(
          returnObj,
          {
            initNum: 10,
            initUnit: 'L',
            returnNum: 2.64172,
            returnUnit: 'gal',
            string: '10 liters converts to 2.64172 gallons',
          },
          'valid input did not sucessfully convert'
        );
        done();
      });
  });
  // 2
  test('Make sure invalid unit receives an error status', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '32G' })
      .end((err, res) => {
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });
  // 3
  test('Make sure invalid number (double fraction) has an error', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end((err, res) => {
          assert.equal(res.text, 'invalid number');
          done();
      });
  });
  // 4
  test('Make sure invalid number (double fraction) and invalid unit receives an error status', (done) => {
    chai.request(server).get('/api/convert').query({ input: '3/7.2/4kilomegagram' }).end((err, res) => {
        assert.equal(res.text, 'invalid number and unit', 'number and unit should be invalid');
        done();
    });
  });
  // 5
  test('Make sure a unit alone converts', (done) => {
    chai.request(server).get('/api/convert').query({ input: 'kg' }).end((err, res) => {
        assert.equal(res.status, 200, 'Response status should be 200');
        done();
    });
  });
});
