import { Pool } from 'pg'

const poolConfig = {
	database: 'retro_board',
	user: "postgres",
	password: "postgres",
	host: "localhost",
	port: 5432,
}

class Database {
	pool: Pool

	constructor() {
		this.pool = new Pool(poolConfig)
	}
}

const db = new Database()

export default db