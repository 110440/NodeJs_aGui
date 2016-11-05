/**
 * Created by tanson on 2016/11/3.
 */

import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const SkillSchema = new Schema({

  userId:{
    type:Schema.ObjectId,
    require:true
  },

  //技能名字
  name:{
    type:String,
    require:true
  },

  //成交次数
  complateCount:{
    type:Number,
    default:0
  },

  //技能描述
  describe:{
    type:String,
    default:null
  },

  tags:[{type:String}],

  //星星
  star:{
    type:Number,
    default:5
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

});

SkillSchema.index({userId:1},{unique:true});


/**
 * Statics
 */
SkillSchema.statics = {



};


export default mongoose.model('Skill', SkillSchema);
