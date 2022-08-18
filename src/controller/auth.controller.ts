import db from '../db/db';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { authConfig }  from "../config/auth.config";

class AuthController {
    async signup (req : any, res: any) {
        const {name, role, email, password} = req.body;
        console.log('signup')
        try {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    db.pool.query(`INSERT INTO client (name, role, email, password) values ($1, $2, $3, $4) RETURNING *`, [name, role, email, hash]).then((data) => {
                        res.status(200).json(data.rows);
                    }).catch((err) => {
                        res.status(500).json(err);
                    });
                });
            });          
        } catch (error) {
            res.status(500).send(`Пользователь не создан`);
        }
    }
    async signin (req : any, res: any) {
        const {email, password} = req.body;
        console.log('signin')
        try {
            const {rows} = await db.pool.query('SELECT * from client where email = $1', [email]);
            if (!rows[0]) {
                res.status(400).send(`Пользователь не найден`);
                return;
            }
            const hash = rows[0].password;
            bcrypt.compare(password, hash, function(err, result) {
                if (result) {
                    let token = Jwt.sign({ id: rows[0].id }, authConfig.accessToken.salt, {
                        expiresIn: authConfig.accessToken.expired
                    });
                    res.status(200).json({...rows[0], accessToken: token});
                } else {
                    res.status(401).json('Пароль не верный');
                }
            });         
        } catch (error) {
            res.status(500).send(`что-то пошло не так`);
        }
    }
}

export const authController = new AuthController();