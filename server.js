// database config import
const db = require("./config/db");

// database connect
db.connect();

// env load
require('dotenv').config()

// app instance
const app = require('./app');

// port from env
const port = process.env.PORT || 3000;

// server start
app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}/doc`)
);