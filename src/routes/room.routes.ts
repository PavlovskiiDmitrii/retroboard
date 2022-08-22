import { roomController } from '../controller/room.controller';
import * as express from "express";
import { verifyToken } from '../middleware/authJwt';
 
let roomRouter = express.Router();

const mainMiddleware = [verifyToken];

roomRouter.post('/room', mainMiddleware, roomController.createRoom);
roomRouter.post('/room/addclient', mainMiddleware, roomController.addClientToRoom);
roomRouter.get('/room/:id', mainMiddleware, roomController.getRoom);
roomRouter.get('/rooms/', mainMiddleware, roomController.getRoomByAdmin);
roomRouter.delete('/room/', mainMiddleware, roomController.deleteRoom);


export default roomRouter;