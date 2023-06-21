import express from 'express';
export const userRouter = express.Router();
import {
  login,
  logout,
  getUser,
  contact,
  updateUser,
  myprofile,
} from '../controller/User.mjs';
import { isAuthenticated } from '../middlewares/auth.mjs';
userRouter.route('/login').post(login);
userRouter.route('/logout').get(logout);
userRouter.route('/user').get(getUser);
userRouter.route('/admin/update').get(isAuthenticated, updateUser);
userRouter.route('/me').get(isAuthenticated, myprofile);
userRouter.route('/contact').get(contact);
