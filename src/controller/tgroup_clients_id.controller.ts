import db from '../db/db';

class Group_clients_idController {
    async createConnectionGroupWithClient(req : any, res: any) {
        const {group_id, client_id} = req.body;
        try {
            const newConnectionGroupWithClient = await db.pool.query(`INSERT INTO tgroup_clients_id (client_id, tgroup_id) values ($1, $2) RETURNING *`, [client_id, group_id]);
            res.json(newConnectionGroupWithClient.rows);
        } catch (error) {
            res.status(500).send(`Пользователь уже состоит в группе`);
        }
    }

    async getClientsByGroupId(req : any, res: any) {
        const tgroup_id = req.query.tgroup_id;
        const clients = await db.pool.query('SELECT * from tgroup_clients_id where tgroup_id = $1', [tgroup_id]);
        res.json(clients.rows.map(client => (client.client_id)));
    }
    async getGroupsByClientId(req : any, res: any) {
        const client_id = req.query.client_id;
        const groups = await db.pool.query('SELECT * from tgroup_clients_id where client_id = $1', [client_id]);
        res.json(groups.rows.map(groups => (groups.tgroup_id)));
    }
}

export const group_clients_idController = new Group_clients_idController();