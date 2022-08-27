import db from "../db/db";

class GroupController {
  async createGroup(req: any, res: any) {
    const { title, owner_id } = req.body;
    const owner = await db.pool.query(
      "SELECT * from client where id = $1",
      [owner_id]
    );
    const newGroup = await db.pool.query(
      `INSERT INTO tgroup (title, owner_id) values ($1, $2) RETURNING *`,
      [title, owner_id]
    );
    newGroup.rows[0].clients = [owner.rows[0]];
    res.json( newGroup.rows[0]);
    const _ = await db.pool.query(
      `INSERT INTO tgroup_clients_id (client_id, tgroup_id) values ($1, $2) RETURNING *`,
      [owner_id, newGroup.rows[0].id]
    );
  }
  async getGroupsByClientId(req: any, res: any) {
    const client_id = req.query.client_id;
    const groupsIdRow = await db.pool.query(
      "SELECT * from tgroup_clients_id where client_id = $1",
      [client_id]
    );
    const groupsId = groupsIdRow.rows.map((row) => (row.tgroup_id));
    const groups = await db.pool.query(
      "SELECT * from tgroup where id = ANY ($1)",
      [groupsId]
    );
    const groupsMap = groups.rows.map((group) => (
      {...group, clients : []}
    ));

    for (let i = 0; i < groupsMap.length; i++) {
      const groupLocal = await db.pool.query("SELECT * from tgroup_clients_id where tgroup_id = $1", [groupsMap[i].id]);
      const clients = await db.pool.query("SELECT * from client where id = ANY ($1)", [groupLocal.rows.map((group) => (group.client_id))]);
      const clientsMap = clients.rows.map((client) => {
        delete client.password;
        return client;
      })
      groupsMap.find((group) => group.id === groupsMap[i].id).clients.push(...clientsMap);
    }
    res.json(groupsMap);
  }
  async deleteGroup(req: any, res: any) {
    const id = req.query.id;
    const _ = await db.pool.query(
      "DELETE FROM tgroup_clients_id where tgroup_id = $1",
      [id]
    );
    const tgroup = await db.pool.query(
      "DELETE FROM tgroup where id = $1 RETURNING *",
      [id]
    );
    res.json(tgroup.rows);
  }
  async deleteClientFromGroup(req: any, res: any) {
    const client_id = req.query.client_id;
    const tgroup_id = req.query.tgroup_id;
    const _ = await db.pool.query(
      "DELETE FROM tgroup_clients_id where tgroup_id = $1 AND client_id = $2",
      [tgroup_id, client_id]
    );
    res.json({message: 'Пользователь удалён из группы'});
  }
  // async getRoom(req : any, res: any) {
  //     const id = req.params.id;
  //     const room = await db.pool.query('SELECT * from room where room_id = $1', [id]);
  //     res.json(room.rows);
  // }

  // async addClientToRoom(req : any, res: any) {
  //     const {room_id, clientsId} = req.body;
  //     const room = await db.pool.query(`UPDATE room set clients_id = $1 where room_id = $2 RETURNING *`, [clientsId, room_id]);
  //     res.json(room.rows);
  // }
}

export const groupController = new GroupController();
