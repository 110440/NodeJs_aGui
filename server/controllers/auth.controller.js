import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import APIReturn from '../helpers/APIReturn';
import User from '../models/user.model'
import returnCode from '../../config/returnCode';
import helper from  '../helpers/helpers';

const config = require('../../config/env');


/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {

  var _user;
  User.findOne({'loginname':req.body.loginname})
    .exec()
    .then(user => {
      if(!user){
        res.json(APIReturn(returnCode.auth.noUser,null));
      }else{
        _user = user;
        return helper.bcompare(req.body.password , user.password);
      }
    })
    .then(ret => {
      if(ret == false){
        return res.json(APIReturn(returnCode.auth.errPassword,null));
      }else{
        var payload = {loginname:_user.loginname,id:_user._id};
        var token = jwt.sign(payload, config.jwtSecret , {
          'expiresIn': 60 * 60 * 24 // 设置过期时间
        });
        res.json(APIReturn(returnCode.comm.ok,{'token':token , 'user':_user}));
      }
    })
    .catch(e => next(e));
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber };
