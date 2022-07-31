import db from '../db/db';

class UserController {
    // реализовано в auth.controller.singup
    // async createUser(req : any, res: any) {
    //     const {name, role, email, password} = req.body;
    //     try {
    //         db.pool.query(`INSERT INTO client (name, role, email, password) values ($1, $2, $3, $4) RETURNING *`, [name, role, email, password]).then((data) => {
    //             res.json(data.rows);
    //         });
    //     } catch (error) {
    //         res.status(500).send(`Пользователь не создан`);
    //     }
    // }
    async getUsers(req : any, res: any) {
        const users = await db.pool.query('SELECT * from client');
        res.json(users.rows);

    }
    async getOneUser(req : any, res: any) {
        const id = req.params.id;
        const user = await db.pool.query('SELECT * from client where id = $1', [id]);
        res.json(user.rows[0]);
    }
    async updateUser(req : any, res: any) {
        const {id, name} = req.body;
        const user = await db.pool.query(`UPDATE client set name = $1 where id = $2 RETURNING *`, [name, id]);
        res.json(user.rows);
    }
    async deleteUser(req : any, res: any) {
        const id = req.params.id;
        const user = await db.pool.query('DELETE FROM client where id = $1', [id]);
        res.json(user.rows);
    }
}

export const userController = new UserController();