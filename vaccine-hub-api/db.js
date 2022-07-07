const { Client } = require("pg");
const { getDatabaseUri } = require("./config");
require("colors");

const db = new Client({ connectionString: getDatabaseUri() });

db.connect((err) => {
  if (err) {
    console.error("connection err".red, err.stack);
  } else {
    console.log("u did it! #connect".blue);
  }
});

module.exports = db;
