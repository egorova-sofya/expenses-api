const Habit = require("../models/habitModel");

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
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Habit.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numHabits = await Habit.countDocuments();
      if (skip >= numHabits) throw new Error("This page does not exist");
    }

    const habits = await query;
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
