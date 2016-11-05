/*!
 * mongoose-dao - lib/dao.js
 * Copyright(c) 2015 i5ting <shiren1118@126.com>
 * MIT Licensed
 */

"use strict";

module.exports = function (schema) {
  schema.methods.save = function () {
    return this.save();
  }

  schema.statics.create = function (doc) {
    return this.create(doc);
  }

  schema.statics.getById = function (id) {
    return this.findOne({_id:id}).exec();
  }

  schema.statics.count = function () {
    var query = {};
    //count({a:1})
    if (arguments.length == 1) {
      query   = arguments[0];
    }
    return this.model.count(query).exec();
  }

  schema.statics.getByQuery = function (query) {
    return this.find(query).exec();
  }

  schema.statics.all = function () {
    return this.find({}).exec();
  }

  schema.statics.one = function (query) {
    return this.findOne(query).exec();
  }

  schema.statics.updateById = function (id,update) {
    return this.updateOne({_id:id}, update).exec();
  }

  schema.statics.updateOne = function (conditions, update) {
    return this.update(conditions, update , {multi: false}).exec();
  }


}


// way1: conditions, update , cb
// way2: conditions, update ,options, cb
MongooseDao.prototype.update = function() {
  var conditions, update ,options, cb;

  var _options;
  if (arguments.length == 3) {
    _options = {}
    conditions = arguments[0];
    update = arguments[1];
    cb = arguments[2];
  }else if(arguments.length == 4) {
    conditions = arguments[0];
    update = arguments[1];
    _options = arguments[2];
    cb = arguments[3];
  }else{
    throw new Error("MongooseDao.prototype.update param is not valid!")
  }


  var opt = { multi: true };
  _extend(opt, _options);

  return this.model.update(conditions, update, opt, cb);
};

// delete
MongooseDao.prototype.delete = MongooseDao.prototype.remove = function(query, cb){
  return this.model.remove(query, cb);
};

MongooseDao.prototype.deleteAll = MongooseDao.prototype.removeAll = function(cb){
  return this.delete({}, cb);
};

MongooseDao.prototype.deleteById = MongooseDao.prototype.removeById = function(id, cb) {
  // console.log('MongooseDao.prototype.deleteById');
  return this.delete({_id: id}, cb);
};

// pagination
MongooseDao.prototype.latest = MongooseDao.prototype.top = MongooseDao.prototype.first = MongooseDao.prototype.n = function(){
  var n;
  var cb;
  var q = {};
  var sort = {};

  // (num, cb)
  if (arguments.length == 2) {
    n   = arguments[0];
    cb  = arguments[1];
  }else  if (arguments.length == 3) {
    // (num, {},cb)
    n   = arguments[0];
    q   = arguments[1];
    cb  = arguments[2];
  }else  if (arguments.length == 4) {
    // (num, {},cb)
    n   = arguments[0];
    q   = arguments[1];
    sort  = arguments[2];
    cb  = arguments[3];
  }else{
    // (cb)
    n   = this.pagesize;
    cb  = arguments[0];
  }

  return this.model.find(q).sort(sort).limit(n).exec(cb);
};

// TODO: impl page by lastId
// db.usermodels.find({'_id' :{ "$gt" :ObjectId("55940ae59c39572851075bfd")} }).limit(20).sort({_id:-1})
MongooseDao.prototype.pageByLastId = function(){
  var n = this.pagesize;;
  var cb;
  var q = {};
  var sort = {_id:-1};

  // pageByLastId(lid, cb)
  if (arguments.length == 2) {
    var lid   = arguments[0];
    q = _get_q_by_last_id(lid);
    cb  = arguments[1];
  }else  if (arguments.length == 3) {
    // pageByLastId(lid, count, cb)
    var lid   = arguments[0];
    q = _get_q_by_last_id(lid);
    n   = arguments[1];
    cb  = arguments[2];
  }else  if (arguments.length == 4) {
    // pageByLastId(lid, count, query, cb)
    var lid   = arguments[0];
    q = _get_q_by_last_id(lid);
    n   = arguments[1];

    _extend(q, arguments[2]);

    cb  = arguments[3];
  }else  if (arguments.length == 5) {
    // pageByLastId(lid, count, query, sort, cb)
    var lid   = arguments[0];
    q = _get_q_by_last_id(lid);
    n   = arguments[1];

    _extend(q, arguments[2]);

    sort  = arguments[3];
    cb  = arguments[4];
  }else{
    // pageByLastId(lid, cb)
    var lid   = arguments[0];
    q = _get_q_by_last_id(lid);
    cb  = arguments[1];
  }

  return this.model.find(q).sort(sort).limit(n).exec(cb);
};

// private
function _extend(des, src) {
  if (!des) {
    des = {};
  }
  if (src) {
    for (var i in src) {
      des[i] = src[i];
    }
  }

  return des;
}

function _get_q_by_last_id(last_id){
  return {
    '_id' : {
      "$gt" : last_id
    }
  }
}

module.exports = MongooseDao;
