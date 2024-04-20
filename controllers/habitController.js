const Habit = require("../models/habitModel");

exports.getAllHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res
      .status(200)
      .json({ status: "success", results: habits.length, data: { habits } });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error });
  }
};

exports.getHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    res
      .status(200)
      .json({ status: "success", results: habit.length, data: { habit } });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error });
  }
};

exports.createHabit = async (req, res) => {
  try {
    const newHabit = await Habit.create(req.body);
    res.status(201).json({ status: "success", data: newHabit });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", data: { habit } });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error });
  }
};
