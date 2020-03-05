const mysql = require('promise-mysql');
const dbConfig = require('../../resources/db-config.json');

/**
 * @returns {Promise<void|PoolConnection>}
 * @constructor
 */
async function DbConnection() {
    try {
        let pool;
        let con;
        if (pool) con = pool.getConnection();
        else {
            pool = await mysql.createPool(dbConfig);
            con = pool.getConnection();
        }
        return con;
    } catch (ex) {
        throw ex;
    }
}

module.exports = DbConnection;