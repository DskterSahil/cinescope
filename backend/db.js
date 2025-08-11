import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: 'dskter',
  host: 'dpg-d2d0tm2dbo4c73c7kg2g-a.oregon-postgres.render.com',
  database: 'cinescopedb',
  password: '4ZMLQYtPEnESYbKaRoqce2zjmgaU98fG',
  port: 5432,
  ssl: {
    rejectUnauthorized: false  // important for Render SSL connection
  }
});

export default pool;
