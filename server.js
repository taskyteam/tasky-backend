require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const database = require("./services/database");

const PORT = process.env.PORT || 3333;

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
      admin: user.admin,
      household_id: user.household_id
    }, Buffer.from(process.env.APP_SECRET, "base64"))
    console.log(token)

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

app.get("/households/:housekey", async (req, res) => {
  const { housekey } = req.params;
  const household = await database.getHouseholdById(housekey);
  res.json(household);
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

//createhousehold
app.post("/households", async (req, res) => {
  const { name, housekey } = req.body;
  const household = await database.createHousehold(name, housekey);
  res.json(household);
});

//createaccount
app.post("/users", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await database.createAccount(username, email, password);
  res.json(user);
}
);

//update user
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, admin, household_id} = req.body;
  const user = await database.updateUser(id, username, email, admin, household_id);
  res.json(user);
});



 