const express = require("express");
const morgan = require("morgan");

const expressRouter = require("./routes/habitRoutes");
const usersRouter = require("./routes/userRoutes");

const app = express();

//используем middleware для логирования
app.use(morgan("dev"));

//используем middleware для того, чтобы читать из request body
app.use(express.json());

app.use((req, res, next) => {
  console.log("🎁");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/habits", expressRouter);
app.use("/api/v1/users", usersRouter);

module.exports = app;
