import express from 'express';
import { validateUserLogin } from '../validators/userValidators';
import { handleValidationErrors } from '../middlewares/validationMiddleware';
import userController from '../controllers/userController';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/login', validateUserLogin, handleValidationErrors, userController.SignIn)
router.get('/validate-token', verifyToken, userController.validateToken)
router.post('/logout' , userController.SignOut)
export default router;