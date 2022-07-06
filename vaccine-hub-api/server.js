const express = require("express");
const cors = require("cors");
const morg = require("morgan");

const app = express();

app.use(cors); //cross origin resource

app.use(express.json()); //parse w json

app.use(morg("tiny")); //req info

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server on localhost:${PORT}`);
});
