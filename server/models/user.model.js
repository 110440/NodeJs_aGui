import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({

  loginname: {
    type: String,
    required: true,
    match: [/^1[0-9]{10}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  password:{
    type: String,
    required: true
  },

  avatar:{
    type: String,
    default:null
  },
  nickName:{
    type: String,
    default:null
  },
  age:{
    type: Number,
    default: null
  },
  sex:{
    type: Number,
    default: 0 // 0 man ,1 women
  },
  addr:{
    type: String,
    default:null
  },
  dec:{ //个人简介
    type: String,
    default: null
  },
  isBlock:{ // 是否被封号
    type: Boolean,
    default: false
  },

  // 坐标
  log:{
    type: Number,
    default: null
  },
  lat:{
    type: Number,
    default: null
  },

  star:{
    type:Number,
    default:5
  }
});

UserSchema.index({loginname:1},{unique:true});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {

  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  getByLoginName(loginname){
    return this.find({'loginname':loginname}).exec();
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
