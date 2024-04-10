const fs = require("fs");

const habits = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/habits.json`)
);

exports.getAllHabits = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({ status: "success", results: habits.length, habits });
};

exports.getHabit = (req, res) => {
  const id = req.params.id;
  const habit = habits.find((item) => item.id === Number(id));
  if (!habit) {
    return res
      .status(404)
      .json({ status: "error", message: "Habit not found" });
  }
  res.status(200).json({ status: "success", habit });
};

exports.addHabit = (req, res) => {
  const newHabit = req.body;
  const newId = habits[habits.length - 1].id + 1;
  habits.push({ ...newHabit, id: newId });
  fs.writeFile(
    `${__dirname}/dev-data/data/habits.json`,
    JSON.stringify(habits),
    (err) => {
      res
        .status(201)
        .json({ status: "success", message: "Habit added successfully" });
    }
  );
};

exports.editHabit = (req, res) => {
  res.status(204).json({ status: "success", message: null });
};

exports.deleteHabit = (req, res) => {
  res.status(200).json({ status: "success", message: "Updated habit" });
};
