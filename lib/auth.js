'use strict';

var request = require('request');
var jwt = require('jsonwebtoken');


var Auth = function(opts) {
    this._username = opts.username;
    this._password = opts.password;
    this._jwt = null;
};

Auth.prototype.getToken = function(callback) {

    if(this.isExpired()){
        this._request(callback);
    }
    else {
        callback(null,this._jwt);
    }
};

Auth.prototype.isExpired = function() {

    if(this._jwt){
        var decoded = jwt.decode(this._jwt);
        var now = Math.floor(Date.now() / 1000);

        return (now >= decoded.exp);
    }
    else{
        return true;
    }

};

Auth.prototype._request = function(callback) {
    if(!this._username || !this._password) {
        return callback("error: invalid username or password");
    }

    var that = this;

    request.post('https://api.btcchina.com/api.php/account/authenticate', {
        'auth': {
            'user': this._username,
            'pass': this._password,
            'sendImmediately': true
        }
    },function (error, response, body) {

        console.log("HTTP Status",response.statusCode);
        if(response.statusCode == 200){
            that._jwt = response.headers["json-web-token"];
        } else {

            //TODO handle 401, 403 etc.
        }
        callback(error,that._jwt);
    })
};

module.exports = Auth;
