import db from '../db/db';

class GroupController {
    async createGroup(req : any, res: any) {
        const {title, owner_id} = req.body;
        const newGroup = await db.pool.query(`INSERT INTO tgroup (title, owner_id) values ($1, $2) RETURNING *`, [title, owner_id]);
        res.json(newGroup.rows);
    }
    // async getRoom(req : any, res: any) {
    //     const id = req.params.id;
    //     const room = await db.pool.query('SELECT * from room where room_id = $1', [id]);
    //     res.json(room.rows);
    // }

    // async getRoomByAdmin(req : any, res: any) {
    //     const id = req.query.id;
    //     const rooms = await db.pool.query('SELECT * from room where owner_id = $1', [id]);
    //     res.json(rooms.rows);
    // }

    // async addClientToRoom(req : any, res: any) {
    //     const {room_id, clientsId} = req.body;
    //     const room = await db.pool.query(`UPDATE room set clients_id = $1 where room_id = $2 RETURNING *`, [clientsId, room_id]);
    //     res.json(room.rows);
    // }

    // async deleteRoom(req : any, res: any) {
    //     const id = req.params.id;
    //     const room = await db.pool.query('DELETE FROM room where room_id = $1', [id]);
    //     res.json(room.rows);
    // }
}

export const groupController = new GroupController();