import { groupController } from '../controller/group.controller';
import { group_clients_idController } from '../controller/tgroup_clients_id.controller'
import * as express from "express";
import { verifyToken } from '../middleware/authJwt';
 
let groupRouter = express.Router();

const mainMiddleware = [verifyToken];

groupRouter.post('/group', mainMiddleware, groupController.createGroup);
groupRouter.get('/groupsby', mainMiddleware, groupController.getGroupsByClientId);
// roomRouter.put('/room/addclient', mainMiddleware, roomController.addClientToRoom);
// roomRouter.get('/group/:id', mainMiddleware, roomController.getRoom);
groupRouter.delete('/group/', mainMiddleware, groupController.deleteGroup);



groupRouter.post('/createconnectionfroupwithclient', mainMiddleware, group_clients_idController.addClientToGroup);
groupRouter.get('/clientsby', mainMiddleware, group_clients_idController.getClientsByGroupId);
// groupRouter.get('/groupsIdby', mainMiddleware, group_clients_idController.getGroupsIdByClientId);


export default groupRouter;