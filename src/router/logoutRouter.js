import express from 'express';
import { handleLogout } from '../controllers/logoutController';
const logoutRouter = express.Router();

logoutRouter.route('/user').get(handleLogout);

export default logoutRouter;
