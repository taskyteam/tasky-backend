const { Pool } = require('pg');

const POSTGRES_URL = process.env.POSTGRES_URL // 'postgres://postgres:<ditt passord>@localhost:5432/<ditt database navn>';

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
    console.log(result.rows[0])
    return result.rows[0];
}


async function createTask(title, description, points, assigned_to, household_id) {
    // try{
    // const userResult = await database.query(`
    //     SELECT
    //         users.id
    //     FROM 
    //         users
    //     WHERE
    //         users.id = $1
    // `, [assigned_to]);
    // const assigned_user = userResult.rows[0];
    // if(!assigned_user) throw new Error('User does not exist');
    // } catch (error) {
    //     console.log(error);
    // }


    const result = await database.query(`
        INSERT INTO tasks (household_id, title, description, assigned_to, status, points)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `, [household_id, title, description, assigned_to, 'open', points ]);
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



