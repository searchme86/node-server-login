import express from 'express';
import { handleNewUser } from '../controllers/registerController';
const registerRouter = express.Router();

registerRouter.route('/user').post(handleNewUser);

export default registerRouter;
