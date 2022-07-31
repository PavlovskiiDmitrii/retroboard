import { userController } from './../controller/user.controller';
import * as express from "express";
 
let userRouter = express.Router();

userRouter.get('/user', userController.getUsers);
userRouter.get('/user/:id', userController.getOneUser);
userRouter.put('/user', userController.updateUser);
userRouter.delete('/user/:id', userController.deleteUser);


export default userRouter;