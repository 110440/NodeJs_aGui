import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      loginname: Joi.string().regex(/^1[0-9]{10}$/).required(),
      password: Joi.string().required()
    }
  },

  updateUser: {
    body: {
      avatar:Joi.string(),
      nickName:Joi.string(),
      addr:Joi.string(),
      dec:Joi.string(),

      age:Joi.number(),
      sex:Joi.number(),
      log:Joi.number(),
      lat:Joi.number()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      loginname: Joi.string().regex(/^1[0-9]{10}$/).required(),
      password: Joi.string().required()
    }
  },

  changePassword:{
    body:{
      oldPassword:Joi.string().required(),
      newPassword:Joi.string().required()
    }
  },

  createSkill:{
    body:{
      name:Joi.string().required(),
      tags:Joi.array().required()
    }
  },
  updateSkill:{
    body:{
      skillId:Joi.string().required(),
      name:Joi.string(),
      tags:Joi.array(),
    }
  }

};
