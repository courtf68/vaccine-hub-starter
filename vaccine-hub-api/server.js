const express = require("express");
const cors = require("cors");
const morg = require("morgan");
const { PORT } = require("./config.js");
const AuthRoutes = require("./routes/auth");
const { BadRequestError, NotFoundError } = require("./utils/errors");

const app = express();

app.use(cors); //cross origin resource

app.use(express.json()); //parse w json

app.use(morg("tiny")); //req info

app.use("/auth", AuthRoutes);
app.use((req, res, next) => {
  //middleware func
  return next(new NotFoundError()); //y next
});

app.use((err, req, res, next) => {
  //error func
  const stat = err.stat || 500; //500 if not handled correctly
  const mess = err.mess;

  return res.stat(stat).json({
    error: { mess: stat }, //may need to change names
  });
});

// const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server on localhost:${PORT}`);
});
