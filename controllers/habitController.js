const Habit = require("../models/habitModel");
const APIFeatures = require("../utils/apiFeatures");

exports.aliasTopHabits = async (req, res, next) => {
  //set progress query greater then 30
  req.query.progress = { gt: "30" };
  console.log("🐶req", req.query);
  //req { progress: { gte: '30' } }

  next();
};

exports.getAllHabits = async (req, res) => {
  try {
    console.log("req", req.query);

    const features = new APIFeatures(Habit.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const habits = await features.query;
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

exports.getHabitsStats = async (req, res) => {
  try {
    const stats = await Habit.aggregate([
      // {
      //   $match: { progress: { $gte: 30 } },
      // },
      {
        $group: {
          _id: "$color",
          numHabits: { $sum: 1 },
          avgProgress: { $avg: "$progress" },
          minProgress: { $min: "$progress" },
          maxProgress: { $max: "$progress" },
        },
      },
      {
        $sort: { avgProgress: -1 },
      },
      //может повторяться в пайплайне
      // {
      //   $match: { _id: { $ne: "green" } },
      // },
    ]);

    res.status(200).json({ status: "success", data: stats });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error });
  }
};
