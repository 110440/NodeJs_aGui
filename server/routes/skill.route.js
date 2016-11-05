import express from 'express';
import tokenChecker from '../Middlewares/checkToken';
import skillController from  '../controllers/skill.controller';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';

const router = express.Router(); // eslint-disable-line new-cap

//  /api/skill/hotSkills
router.route('/hotSkills').get(skillController.getHotSkills);
router.route('/mySkills').get(tokenChecker,skillController.getMyAllSkill);


router.route('/')

  /** GET : /api/skill 创建新技能 */
  .get(tokenChecker,skillController.getSkill)

  /** POST : /api/skill 创建新技能 */
  .post(tokenChecker,validate(paramValidation.createSkill),skillController.createSkill)

  /** PUT : /api/skill 更新技能 */
  .put(tokenChecker,validate(paramValidation.updateSkill),skillController.update);

export default router;
