const { Pool } = require('pg');

const POSTGRES_URL = process.env.POSTGRES_URL || 'postgres://postgres:postgres@localhost:5432/tasky';

const database = new Pool({
    connectionString: POSTGRES_URL,
});
// A database for an house chore app called Tasky

async function getTasksByHousehold(household_id) {
    const result = await database.query(`
        SELECT 
            *
        FROM
            tasks
        JOIN households ON tasks.household_id = households.id
        WHERE households.id = $1
        ORDER BY tasks.id DESC;
    `, [household_id]);
    
    console.log(result.rows);
    return result.rows;
}

async function getTasksByUser(user_id) {
    const result = await database.query(`
        SELECT
            *
        FROM
            tasks
        WHERE
            tasks.assigned_to = $1
        ORDER BY tasks.id DESC;
    `, [user_id]);
    console.log(result.rows)
    return result.rows;
}


async function createTask(username, title, description, points, assigned_to) {
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
    `, [user.id, title, description, username, 'open', points, assigned_to]);
    console.log(result.rows[0]);
    return result.rows[0];
}

async function updateTask(id, status) {
    const result = await database.query(`
        UPDATE tasks
        SET status = $2
        WHERE id = $1
        RETURNING *;
    `, [id, status]);
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
    getTasksByHousehold,
    getTasksByUser,
    createTask,
    updateTask,
    deleteTask,
};



