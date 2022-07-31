import { roomController } from '../controller/room.controller';
import { verifyToken } from '../middleware/authJwt'
import * as express from "express";
 
let roomRouter = express.Router();

roomRouter.post('/room', [verifyToken], roomController.createRoom);
roomRouter.get('/room/:id', [], roomController.getRoom);
roomRouter.get('/rooms/', [], roomController.getRoomByAdmin);
roomRouter.delete('/room/:id', [], roomController.deleteRoom);


export default roomRouter;