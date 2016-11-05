/**
 * Created by tanson on 2016/11/3.
 */

import jwt from 'jsonwebtoken';
import config from '../../config/env';
import APIRetrun from '../helpers/APIReturn';
import returnCode from '../../config/returnCode';
import User from '../models/user.model';

module.exports = function(req, res, next) {

  var token = req.headers.token || req.body.token || req.query.token;

  if (token) {

    jwt.verify(token, config.jwtSecret , function(err, decoded) {
      if (err) {
        return res.status(401).send('invalid token...');
      } else {

        User.findById(decoded.id,function (err,doc) {
          if(err){
            return next(err);
          }else {
            if (doc){
              req.user = doc;
              return next();
            }else{
              res.status(401).send('invalid token...');
            }
          }
        });

      }

    });

  } else {
    res.status(401).send('invalid token...');
  }

};
