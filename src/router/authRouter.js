import express from 'express';
import { handleLogin } from '../controllers/authController';

const authRouter = express.Router();

authRouter.route('/user').post(handleLogin);

export default authRouter;
