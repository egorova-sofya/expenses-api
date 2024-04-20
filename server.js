const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("DB connection is successful"))
  .catch((err) => {
    console.log("❤️", err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
