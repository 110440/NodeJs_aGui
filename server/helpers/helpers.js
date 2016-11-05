/**
 * Created by tanson on 2016/11/4.
 */

var bcrypt = require('bcryptjs');

exports.bhash = function (str) {
  return new Promise( function(resolv,reject){
    bcrypt.hash(str, 10, function (err,hashStr) {
      if(err){
        reject(err);
      }else {
        resolv(hashStr);
      }
    });

    // resolv(str);
  });
};

exports.bcompare = function (str, hash) {
  return new Promise( function(resolv,reject){
    bcrypt.compare(str, hash, function(err, res) {
      if(err){
        reject(err);
      }else{
        resolv(res);
      }
    });

    // resolv(str === hash);
  });

};
