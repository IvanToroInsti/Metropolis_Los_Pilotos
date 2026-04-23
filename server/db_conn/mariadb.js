const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASS,
    database: process.env.DB,
    connectionLimit: 10
});

async function query(sql, params){
    let conn;
    try{
        conn = await pool.getConnection();
        const res = await conn.query(sql, params);
        return res;
    }catch(err){
        throw err;
    }finally{
        if (conn) conn.release();
    }
}

module.exports = { query };