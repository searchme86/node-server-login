import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUser,
} from '../controllers/usersController';
import { ROLES_LIST } from '../config/roles_list';
import { verifyRoles } from '../middleware/verifyRoles';

const usersRouter = express.Router();

usersRouter.route('/').get(verifyRoles(ROLES_LIST.Admin), getAllUsers);
usersRouter.route('/').delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

usersRouter.route('/:id').get(verifyRoles(ROLES_LIST.Admin), getUser);

export default usersRouter;
