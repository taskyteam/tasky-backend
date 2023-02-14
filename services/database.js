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


async function getUserByEmail(email) {
  const result = await database.query(`
  SELECT *
  FROM users
  WHERE
    email = $1
  
  `, [email]);  

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
        tasks.household_id,
        tasks.username
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
  household_id,
  username
) { 
  
  const status = "open";
  const result = await database.query(
    `
    INSERT INTO tasks (household_id, title, description, assigned_to, status, points, username)        
    VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
       `,
    [household_id, title, description, assigned_to, status, points, username]
  );
  console.log(result.rows);
  return result.rows;
} 
 
async function updateTask( id, title, description, assigned_to, status, points){
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

async function updateUser(id, username, email, admin, household_id){
  
  const result = await database.query(
    ` 
    UPDATE users  
    SET username = $1, email = $2, household_id = $3, admin = $4
    WHERE id = $5  
    RETURNING *;   
    `, 
    [username, email, household_id, admin, id]
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

async function createHousehold(name, housekey) {
  const result = await database.query(
    `
    INSERT INTO households (name, housekey)        
    VALUES ($1, $2)
        RETURNING *;
       `,
    [name, housekey]
  );
  console.log(result.rows);
  return result.rows;
}

async function createAccount(username, email, password){
  // const admin = false;
  // const household_id = null;
  const result = await database.query(
    `  
    INSERT INTO users (username, email, password)        
    VALUES ($1, $2, $3)
        RETURNING *;
       `,
    [username, email, password,]
  );
  console.log(result.rows);
  return result.rows;
}

async function getHouseholdById(housekey){
  const result = await database.query(
    `
    SELECT
        *
    FROM
        households
    WHERE
        households.housekey = $1
    `,
    [housekey]
  );
  console.log(result.rows[0]);
  return result.rows[0];
}

async function getCurrentHousehold(household_id) {
  const result = await database.query(
    `
            SELECT
                *
            FROM
                households
            WHERE
                households.id = $1
        `,
    [household_id]
  );
  console.log(result.rows[0]);
  return result.rows[0];
}

async function getAllUsersInHousehold(household_id) {
  const result = await database.query(
    `
            SELECT
                *
            FROM
                users
            WHERE
                users.household_id = $1
        `,
    [household_id]
  );
  console.log(result.rows);
  return result.rows;
}




module.exports = {
  getCurrentUser,
  getCurrentHousehold,
  getTasksByHousehold,
  getTasksByUser,
  createTask,
  createAccount,
  updateTask,
  updateUser,
  deleteTask,
  getUsersByHousehold,
  getUserByEmail,
  createHousehold,
  getHouseholdById,
  getAllUsersInHousehold
};
 