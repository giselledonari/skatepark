require("dotenv").config();
const { Pool } = require("pg");

//connectionString: process.env.DB_CONNECTION,
const pool = new Pool({
  connectionString:"postgres://qdigdxll:VHYfm5nEc9Zkw7kA-D45CjTkBlGx-Km6@mahmud.db.elephantsql.com/qdigdxll"
});

async function init() {
    console.log("init")
  }
  
module.exports = { pool, init };
  

