import db from '../db/db';

class RoomController {
    async createRoom(req : any, res: any) {
        const {owner_id, title} = req.body;
        const newRoom = await db.pool.query(`INSERT INTO room (owner_id, title) values ($1, $2) RETURNING *`, [owner_id, title]);
        res.json(newRoom.rows);
        const _ = await db.pool.query(`INSERT INTO room_clients_id ( client_id, room_id) values ($1, $2) RETURNING *`, [owner_id, newRoom.rows[0].id]);
    }
    async getRoom(req : any, res: any) {
        const id = req.params.id;
        const room = await db.pool.query('SELECT * from room where room_id = $1', [id]);
        res.json(room.rows);
    }
    async getRoomByAdmin(req : any, res: any) {
        const id = req.query.id;
        const rooms = await db.pool.query('SELECT * from room where owner_id = $1', [id]);
        res.json(rooms.rows);
    }
    async addClientToRoom(req : any, res: any) {
        const {room_id, clientsId} = req.body;
        const room = await db.pool.query(`INSERT INTO room_clients_id (client_id, room_id) values ($1, $2) RETURNING *`, [clientsId, room_id]);
        res.json(room.rows);

    }
    async deleteRoom(req : any, res: any) {
        const id = req.query.id;
        const room = await db.pool.query('DELETE FROM room where room_id = $1 RETURNING *', [id]);
        res.json(room.rows);
    }
}

export const roomController = new RoomController();