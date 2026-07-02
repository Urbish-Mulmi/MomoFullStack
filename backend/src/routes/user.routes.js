import express from 'express'
import { registerUser,loginUser,logoutUser, getMe } from '../controllers/user.controller.js';
import { homePage  } from '../controllers/homepage.controller.js';
import { verifyToken } from '../middlewares/auth.middlewares.js';

const userRoutes = express.Router();

userRoutes.route('/').get(homePage);
userRoutes.route('/sign-up').post(registerUser);
userRoutes.route('/login').post(loginUser);
userRoutes.route('/logout').post(logoutUser);
userRoutes.route('/get-me').get(verifyToken, getMe);


export default userRoutes;


