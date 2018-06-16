const { Pool } = require('pg');
import config from "../config";

const pool = new Pool({
    connectionString: config.db
});

module.exports= {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
}