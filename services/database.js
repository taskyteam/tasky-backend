const { Pool } = require('pg');

const POSTGRES_URL = process.env.POSTGRES_URL //|| 'postgres://postgres:postgres@localhost:5432/tasky';

const database = new Pool({
    connectionString: POSTGRES_URL,
});

//postgres://taskydb_user:urQKgJ0l6JDd0nxdSOb0Xuhly4sM6zVQ@dpg-cfgciuha6gdma8nk4uu0-a.frankfurt-postgres.render.com/taskydb

// const database = new Pool({ 
//     user: 'taskydb_user',
//     host: 'dpg-cfgciuha6gdma8nk4uu0-a.frankfurt-postgres.render.com',
//     database: 'taskydb',
//     password: 'urQKgJ0l6JDd0nxdSOb0Xuhly4sM6zVQ',
//     port: 5432,
// });