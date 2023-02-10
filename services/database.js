const { Pool } = require("pg");

const POSTGRES_URL = process.env.POSTGRES_URL; // 'postgres://postgres:<ditt passord>@localhost:5432/<ditt database navn>';

const database = new Pool({
  connectionString: POSTGRES_URL,
});
// A database for an house chore app called Tasky
 
async function getCurrentUser(user_id) {
  const result = await database.query(
    `
            SELECT
                *
            FROM
                users
            WHERE
                users.id = $1
        `,
    [user_id]
  );
  console.log(result.rows[0]);
  return result.rows[0];
}

async function getTasksByHousehold(household_id) {
  const result = await database.query(
    `
        SELECT 
        tasks.id,
        tasks.title,
        tasks.description,
        tasks.assigned_to,
        tasks.status,
        tasks.points,
        tasks.household_id
        FROM
            tasks
        JOIN households ON tasks.household_id = households.id
        WHERE households.id = $1
        ORDER BY tasks.id DESC;
    `,
    [household_id]
  );
    console.log(`fetching `)
  console.log(result.rows);
  return result.rows;
}

async function getTasksByUser(user_id) {
  const result = await database.query(
    `
        SELECT
            *
        FROM
            tasks
        WHERE
            tasks.assigned_to = $1
        ORDER BY tasks.id DESC;
    `,
    [user_id]
  );
  console.log(result.rows);
  return result.rows;
}

async function createTask(
  title,
  description,
  assigned_to,
  points,
  household_id
) { 
  
  const status = "open";
  const result = await database.query(
    `
    INSERT INTO tasks (household_id, title, description, assigned_to, status, points)        
    VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
       `,
    [household_id, title, description, assigned_to, status, points]
  );
  console.log(result.rows);
  return result.rows;
} 

async function updateTask( id, {title, description, assigned_to, status, points}){
  const result = await database.query(
    `
    UPDATE tasks
    SET title = $1, description = $2, assigned_to = $3, status = $4, points = $5
    WHERE id = $6
    RETURNING *; 
    `, 
    [title, description, assigned_to, status, points, id]
  );
  console.log(result.rows[0]);
  return result.rows[0];
}
 
async function deleteTask(id) {
  const result = await database.query(
    `
        DELETE FROM tasks
        WHERE id = $1
        RETURNING *;
    `,
    [id]
  );
  console.log(result.rows[0]);
  return result.rows[0];
}

async function getUsersByHousehold(household_id) {
  const result = await database.query(
    `
    SELECT 
        * 
    FROM  
        users
    WHERE 
        household_id = $1;
    `,
    [household_id]
  );
  console.log(result.rows);
  return result.rows;
}

module.exports = {
  getCurrentUser,
  getTasksByHousehold,
  getTasksByUser,
  createTask,
  updateTask,
  deleteTask,
  getUsersByHousehold,
};
