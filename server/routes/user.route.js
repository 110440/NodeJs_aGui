import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';
import tokenChecker from '../Middlewares/checkToken';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create)

  /** PUT /api/users/ - Update user */
  .put(tokenChecker,validate(paramValidation.updateUser),userCtrl.update);

router.route('/allUser')
  /** GET /api/users/allUser - 所有用户 */
  .get(tokenChecker,userCtrl.list);

router.route('/profile')
  /** GET /api/users/profile - 某个用户 */
  .get(tokenChecker,userCtrl.profile);

  /** PUT /api/users/changePassword - 修改密码 */
router.route('/changePassword')
  .put(tokenChecker,validate(paramValidation.changePassword),userCtrl.changePassword);


//TODO:test
router.post('/removeAll',userCtrl.removeAll);

export default router;
