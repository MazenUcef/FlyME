import express from 'express';
import userController from '../controllers/userController';
import { validateUserRegistration } from '../validators/userValidators';
import { handleValidationErrors } from '../middlewares/validationMiddleware';



const router = express.Router()


router.post('/register', validateUserRegistration, handleValidationErrors, userController.SignUp)

export default router