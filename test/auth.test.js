var chai = require('chai'),
    assert = chai.assert;
var Auth = require('../');

var nock = require('nock');

beforeEach(function(done) {

  //mock
  nock('https://api.btcchina.com')
    .post('/api.php/account/authenticate')
    .reply(200, {}, {
      'json-web-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9'
    });
  done();
});

describe('BTCChina Authentication', function() {

  describe('#Auth', function() {

    it('getToken', function (done) {

      var opts = {username:"user",password:"pw"};
      var auth = new Auth(opts);
      auth.getToken(function(err,jwt){

        assert.isNotNull(jwt);
        done(err,jwt);
      });
    });

    it('tokenExpired', function (done) {

      var opts = {username:"user",password:"pw"};
      var auth = new Auth(opts);
      var result = auth.tokenExpired();
      assert.isTrue(result);
      done();
    });
  });

});
