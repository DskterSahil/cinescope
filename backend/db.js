import pkg from "pg";

const {Pool} = pkg;

const pool = new Pool({
    user: 'dskter',
    host: 'localhost',
    database: 'cinescope',
    password: 'dskter',
    port: 5432,
})

export default pool