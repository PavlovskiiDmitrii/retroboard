import { groupController } from '../controller/group.controller';
import { group_clients_idController } from '../controller/tgroup_clients_id.controller'
import * as express from "express";
import { verifyToken } from '../middleware/authJwt';
 
let groupRouter = express.Router();

const mainMiddleware = [verifyToken];

groupRouter.post('/group', mainMiddleware, groupController.createGroup);
// roomRouter.put('/room/addclient', mainMiddleware, roomController.addClientToRoom);
// roomRouter.get('/group/:id', mainMiddleware, roomController.getRoom);
// roomRouter.get('/rooms/', mainMiddleware, roomController.getRoomByAdmin);
// roomRouter.delete('/room/:id', mainMiddleware, roomController.deleteRoom);



groupRouter.post('/createconnectionfroupwithclient', mainMiddleware, group_clients_idController.createConnectionGroupWithClient);
groupRouter.get('/clientsby', mainMiddleware, group_clients_idController.getClientsByGroupId);
groupRouter.get('/groupsIdby', mainMiddleware, group_clients_idController.getGroupsIdByClientId);
groupRouter.get('/groupsby', mainMiddleware, group_clients_idController.getGroupsByClientId);


export default groupRouter;