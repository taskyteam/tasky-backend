const { Pool } = require('pg');

const POSTGRES_URL = process.env.POSTGRES_URL //|| 'postgres://postgres:postgres@localhost:5432/tasky';

const database = new Pool({
    connectionString: POSTGRES_URL,
});
// A database for an house chore app called Tasky

async function getTasks() {
    const result = await database.query(`
        SELECT
            tasks.id,
            tasks.household_id,
            tasks.title,
            tasks.description,
            tasks.assinged_to,
            tasks.status,
            tasks.points
        FROM
            tasks

        ORDER BY tasks.id DESC;
    `);
    console.log(result.rows);
    return result.rows;
}

async function getTasksByUser(username) {
    const result = await database.query(`
        SELECT
            tasks.id,
            tasks.household_id,
            tasks.title,
            tasks.description,
            tasks.assinged_to,
            tasks.status,
            tasks.points
        FROM
            tasks
        WHERE
            tasks.assinged_to = $1
        ORDER BY tasks.id DESC;
    `, [username]);
    console.log(result.rows)
    return result.rows;
}


async function createTask(username, title, description, points) {
    const userResult = await database.query(`
        SELECT
            users.id
        FROM 
            users
        WHERE
            users.username = $1
    `, [username]);
    const user = userResult.rows[0];

    const result = await database.query(`
        INSERT INTO tasks (household_id, title, description, assinged_to, status, points)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `, [user.id, title, description, username, 'pending', points]);
    console.log(result.rows[0]);
    return result.rows[0];
}

async function updateTask(id, status) {
    const result = await database.query(`
        UPDATE tasks
        SET status = $1
        WHERE id = $2
        RETURNING *;
    `, [status, id]);
    console.log(result.rows[0]);
    return result.rows[0];
}


async function deleteTask(id) {
    const result = await database.query(`
        DELETE FROM tasks
        WHERE id = $1
        RETURNING *;
    `, [id]);
    console.log(result.rows[0]);
    return result.rows[0];
}

module.exports = {
    getTasks,
    getTasksByUser,
    createTask,
    updateTask,
    deleteTask,
};



