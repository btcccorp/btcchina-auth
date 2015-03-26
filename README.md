# btcchina-auth

BTCChina authentication module.

### Version
0.0.1

### Installation

```sh
$ npm i git://github.com/BTCChina/btcchina-auth.git --save
```

### Sample

```Javascript
var Auth = require("btcchina-auth");
var obj = {
    username: 'yourusername',
    password: 'yourpassword'
};
var auth = new Auth(obj);
auth.getToken(function (err, result) {
    console.log(result);
});
```

License
----

MIT
