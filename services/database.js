const { Pool } = require('pg');

const POSTGRES_URL = process.env.POSTGRES_URL //|| 'postgres://postgres:postgres@localhost:5432/tasky';

const database = new Pool({
    connectionString: POSTGRES_URL,
});
// A database for an house chore app called Tasky



