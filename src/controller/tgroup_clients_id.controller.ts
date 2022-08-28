import db from '../db/db';

class Group_clients_idController {
    async addClientToGroup(req : any, res: any) {
        const {group_id, email} = req.body;
        try {
            const addingUser = await db.pool.query(`SELECT * from client where email = $1`, [email]);
            const _ = await db.pool.query(`INSERT INTO tgroup_clients_id (client_id, tgroup_id) values ($1, $2) RETURNING *`, [addingUser.rows[0].id, group_id]);
            res.json({
                "id": addingUser.rows[0].id,
                "name": addingUser.rows[0].name,
                "role": addingUser.rows[0].role,
                "email": addingUser.rows[0].email,
            });
        } catch (error) {
            res.status(500).send({message: `Пользователь уже состоит в группе`, error: error});
        }
    }
    async getClientsByGroupId(req : any, res: any) {
        const tgroup_id = req.query.tgroup_id;
        const clients = await db.pool.query('SELECT * from tgroup_clients_id where tgroup_id = $1', [tgroup_id]);
        res.json(clients.rows.map(client => (client.client_id)));
    }
    
    // // НЕ ПОНЯТНО ЗАЧЕМ НУЖНО
    // async getGroupsIdByClientId(req : any, res: any) {
    //     const client_id = req.query.client_id;
    //     const groupsId = await db.pool.query('SELECT * from tgroup_clients_id where client_id = $1', [client_id]);
    //     res.json(groupsId.rows.map(groups => (groups.tgroup_id)));
    // }
}

export const group_clients_idController = new Group_clients_idController();