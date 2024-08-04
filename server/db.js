const { Pool } = require('pg');
const fs = require('fs');

const config = require('./config');

console.log(`Running on ${config.env.DEFAULT_DB} database`);

const dbconfig = config.env.DEFAULT_DB === 'local' ? {
  user: config.env.LOCAL_DB_USER,
  password: config.env.LOCAL_DB_PASSWORD,
  host: config.env.LOCAL_DB_HOST,
  port: config.env.LOCAL_DB_PORT,
  database: 'openMedia',
} : {
  user: config.env.REMOTE_DB_USER,
  password: config.env.REMOTE_DB_PASSWORD,
  host: config.env.REMOTE_DB_HOST,
  port: config.env.REMOTE_DB_PORT,
  database: 'openMedia',
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('./.ca.pem', 'utf8'),
  },
}

const pool = new Pool(dbconfig);

module.exports = {
  query: (text, params) => pool.query(text, params),
};