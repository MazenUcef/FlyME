import express from 'express';
import { validateUserLogin } from '../validators/userValidators';
import { handleValidationErrors } from '../middlewares/validationMiddleware';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/login', validateUserLogin, handleValidationErrors, userController.SignIn)


export default router;