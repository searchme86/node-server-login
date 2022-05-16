import express from 'express';
import { handleRefreshToken } from '../controllers/refreshTokenController';
const refreshTokenRouter = express.Router();

refreshTokenRouter.route('/token').get(handleRefreshToken);

export default refreshTokenRouter;
