
import User from '../models/user.model';
import APIReturn from '../helpers/APIReturn';
import httpStatus from 'http-status';
import returnCode from '../../config/returnCode';
import helper from  '../helpers/helpers';

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {

  User.getByLoginName(req.body.loginname)
    .then(users => {
      if(users.length > 0){
        return Promise.reject(1001);
      }
    })
    .then(() => {
      return helper.bhash(req.body.password)
    })
    .then( (hashPass) => {
      const user = new User({
        loginname: req.body.loginname,
        password : hashPass
      });
      return user.save();
    })
    .then( () => res.json( APIReturn(returnCode.comm.ok,null) ))
    .catch(e => {
      if( e === 1001 ){
        res.json( APIReturn(returnCode.user.userExtsit,null) );
      }else{
        next(e);
      }
    });
}

/**
 * Update existing user
 * @property {string}
 * @returns {User}
 */
function update(req, res, next) {

  const user = req.user;

  user.avatar = req.body.avatar || user.avatar;
  user.nickName = req.body.nickName || user.nickName;
  user.addr = req.body.addr || user.addr;
  user.dec = req.body.dec || user.dec;
  user.age = req.body.age || user.age;
  user.sex = req.body.sex || user.sex;
  user.log = req.body.log || user.log;
  user.lat = req.body.lat || user.lat;

  user.save()
    .then(savedUser => res.json(APIReturn(returnCode.comm.ok,savedUser) ))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json( APIReturn(returnCode.comm.ok,users) ))
    .catch(e => next(e));
}

function profile(req, res, next) {

  User.get(req.query.userId).then(user => {
    if(user){
      res.json( APIReturn(returnCode.comm.ok,user) );
    }else{
      res.json( APIReturn(returnCode.auth.noUser,null) );
    }
  }).catch(e => {
    if(e.status == httpStatus.NOT_FOUND){
      return res.json( APIReturn(returnCode.auth.noUser,null) );
    }else {
      return next(e);
    }
  });
}

function changePassword(req,res,next) {
  var user = req.user;
  helper.bcompare(req.body.oldPassword , user.password)
    .then( ret => {

      if(ret == false){
        return Promise.reject(APIReturn(returnCode.auth.errPassword,null));
      }else{
        return helper.bhash(req.body.newPassword);
      }
    })
    .then( (hashPass) => {
      user.password = hashPass;
      return user.save();
    })
    .then(savedUser => res.json(APIReturn(returnCode.comm.ok,null) ))
    .catch(e => {
      if(e instanceof Error){
        return next(e);
      }
      res.json(e);
    });
}

/**
 * Delete user.
 * @returns {User}
 */
function removeAll(req, res, next) {
  User.remove()
    .then(deletedUser => res.json('ok'))
    .catch(e => next(e));
}

export default { create, update, list ,profile , changePassword , removeAll};
