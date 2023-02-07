const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3333;
const APP_SECRET = "Xxxx"

app.use(cors());
app.use(express.json());

//Hallo fra Victoria

app.listen(PORT, () => {
    console.log(`Example app listening on port: ${PORT}!`);
  });