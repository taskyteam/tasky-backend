const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const database = require('./services/database');


const PORT = process.env.PORT || 3333;
const APP_SECRET = "Xxxx"

app.use(cors());
app.use(express.json());


app.get('/tasks', async (req, res) => {
    const tasks = await database.getTasksByHousehold(household_id);
    res.json(tasks);
});

app.get('/tasks/:username', async (req, res) => {
    const { username } = req.params;
    const tasks = await database.getTasksByUser(username);
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const { username, title, description, points } = req.body;
    const task = await database.createTask(username, title, description, points, assigned_to);
    res.json(task);
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const task = await database.updateTask(id, status);
    res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const task = await database.deleteTask(id);
    res.json(task);
});

app.listen(PORT, () => {
    console.log(`Example app listening on port: ${PORT}!`);
});