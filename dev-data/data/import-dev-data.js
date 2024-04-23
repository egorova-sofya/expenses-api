const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Habit = require("./../../models/habitModel");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("DB connection is successful"))
  .catch((err) => {
    console.log("❤️", err);
  });

const habits = JSON.parse(fs.readFileSync(`${__dirname}/habits.json`, "utf-8"));

const importData = async () => {
  try {
    await Habit.create(habits);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Habit.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
