
var hotSkills = require('../models/hotSkills.model');
import APIReturn from '../helpers/APIReturn';
import returnCode from '../../config/returnCode';
import Skill from  '../models/skill.model';

function getHotSkills(req,res,next) {
  res.json(APIReturn(returnCode.comm.ok,hotSkills));
}

function createSkill(req,res,next) {

  var skill = new Skill({
    userId:req.user._id,
    name:req.body.name,
    tags:req.body.tags,
    describe:req.body.describe || null
  });

  Skill.find({name:req.body.name})
    .exec()
    .then( skills => {
      if(skills.length > 0){
        return res.json(APIReturn(returnCode.skill.skillExisit,null));
      }

      skill.save()
        .then(savedSkill => {
          res.json(APIReturn(returnCode.comm.ok,savedSkill));
        })
        .catch(e => next(e));

    })
    .catch(e => next(e));
}

function getSkill(req,res,next) {
  if(!req.query.skillId){
    return res.json(APIReturn(returnCode.comm.ValidationErr,null));
  }
  Skill.findOne({_id:req.query.skillId})
    .then(skill => {
      if(!skill){
        return res.json(APIReturn(returnCode.skill.noSkill,null));
      }
      res.json(APIReturn(returnCode.comm.ok,skill));
    })
    .catch(e => next(e));
}

function getMyAllSkill(req,res,next) {
  Skill.find({userId:req.user._id})
    .then(skills => {
      res.json(APIReturn(returnCode.comm.ok,skills));
    })
    .catch(e => next(e));
}


function update(req,res,next) {

  Skill.findOne({_id:req.body.skillId})
    .then( skill => {
      if(!skill){
        return res.json(APIReturn(returnCode.skill.noSkill,null));
      }

      skill.name = req.body.name || skill.name;
      skill.describe = req.body.describe || skill.describe;
      skill.tags = req.body.tags || skill.tags;

      skill.save()
        .then(savedSkill => {
          res.json(APIReturn(returnCode.comm.ok,savedSkill));
        })
        .catch(e => next(e));
    })
    .catch(e => next(e));
}

export default { getHotSkills,createSkill ,getSkill , getMyAllSkill , update};
