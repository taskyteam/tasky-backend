require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const database = require("./services/database");

const PORT = process.env.PORT || 3333;
const APP_SECRET = "legg til i .env";

app.use(cors());
app.use(express.json());


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await database.getUserByEmail(email);

    if (!user) {
      res.status(401).send({ error: "User not found." });
      return;
    }
    
    if (password != user.password) {
      res.status(401).send({ error: "Wrong email and password combination." });
      return;
    }

    const token = jwt.sign({
      id: user.id,
      email: user.email,
      username: user.username,
      admin: user.admin
    }, Buffer.from(process.env.APP_SECRET, "base64"))
    

    res.json({
      token : token
    });
    
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})
app.get("/currentuser/:user_id", async (req, res) => {
    const { user_id } = req.params;
    const user = await database.getCurrentUser(user_id);
    res.json(user);
    });

app.get("/tasks/households/:household_id", async (req, res) => {
  const { household_id } = req.params;
  const tasks = await database.getTasksByHousehold(household_id);
  res.json(tasks);
});

app.get("/tasks/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const tasks = await database.getTasksByUser(user_id);
  res.json(tasks);
});

app.get("/tasks/users/:household_id", async (req, res) => {
  const { household_id } = req.params;
  const tasks = await database.getUsersByHousehold(household_id);
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const { title, description, points, assigned_to, household_id } = req.body;
  const task = await database.createTask(
    title,
    description,
    points,
    assigned_to,
    household_id
  );

  res.json(task);
});

// async function updateTask( id, title, description, assigned_to, status, points){
//   const result = await database.query(
//     `
//     UPDATE tasks
//     SET title = $1, description = $2, assigned_to = $3, status = $4, points = $5
//     WHERE id = $6
//     RETURNING *;
//     `,
//     [title, description, assigned_to, status, points, id]
//   );
//   console.log(result.rows[0]);
//   return result.rows[0];
// }

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, assigned_to, status, points } = req.body;
  const task = await database.updateTask(
    id,
    title,
    description,
    assigned_to,
    status,
    points
  );
  res.json(task);
});


app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const task = await database.deleteTask(id);
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}!`);
});

