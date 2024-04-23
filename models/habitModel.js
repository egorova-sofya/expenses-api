const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  progress: Number,
  title: {
    type: String,
    unique: true,
    required: [true, "Title is required"],
    trim: true,
  },
  time: {
    type: [String],
    required: [true, "Day is required"],
  },
  day: {
    type: [String],
    required: [true, "Day is required"],
  },
  icon: {
    type: String,
    required: [true, "Icon is required"],
  },
  color: {
    type: String,
    default: "green",
  },
  createAt: {
    type: Date,
    default: Date.now(),
    //прячет поле из выдачи
    // select: false,
  },
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
