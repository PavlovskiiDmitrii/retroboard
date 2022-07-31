import { authController } from '../controller/auth.controller';
import * as express from "express";
 
let authRouter = express.Router();

authRouter.post('/auth/singup', authController.signup);
authRouter.post('/auth/singin', authController.signin);

export default authRouter;