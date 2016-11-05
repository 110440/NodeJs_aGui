/**
 * Created by tanson on 2016/11/3.
 */

// 请求 -> 返回代码

module.exports = {

  comm:{
    ok:[0,'ok'],
    ValidationErr:[1,'参数错误ValidationErr'],
    tokenErr:[2,'token 错误']
  },

  auth:{
    noUser:[1001,'用户不存在'],
    errPassword:[1002,'密码错误'],
  },

  user:{
    userExtsit:[2001,'用户已存在'],
  },

  skill:{
    skillExisit:[3001,'你已经有一个名字一样的技能'],
    noSkill:[3002,'技能不存在'],
  }



};
