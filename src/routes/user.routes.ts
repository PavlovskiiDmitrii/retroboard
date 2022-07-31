import { userController } from './../controller/user.controller';
import * as express from "express";
import { verifyToken } from '../middleware/authJwt';
 
const mainMiddleware = [verifyToken];
 
let userRouter = express.Router();

userRouter.get('/user', mainMiddleware, userController.getUsers);
userRouter.get('/user/:id', mainMiddleware, userController.getOneUser);
userRouter.put('/user', mainMiddleware, userController.updateUser);
userRouter.delete('/user/:id', mainMiddleware, userController.deleteUser);


export default userRouter;