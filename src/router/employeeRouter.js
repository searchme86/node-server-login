import express from 'express';
import {
  createNewEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from '../controllers/employeesController';
import { verifyRoles } from '../middleware/verifyRoles';
import { ROLES_LIST } from '../config/roles_list';
const employeeRouter = express.Router();

employeeRouter.route('/').get(getAllEmployees);
employeeRouter
  .route('/')
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee);
employeeRouter
  .route('/')
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee);
employeeRouter.route('/').delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

export default employeeRouter;
