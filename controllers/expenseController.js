const fs = require("fs");

const expenses = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/expenses.json`)
);

exports.getAllExpenses = (req, res) => {
  console.log(req.requestTime);
  res
    .status(200)
    .json({ status: "success", results: expenses.length, expenses });
};

exports.getExpense = (req, res) => {
  const id = req.params.id;
  const expense = expenses.find((item) => item.id === Number(id));
  if (!expense) {
    return res
      .status(404)
      .json({ status: "error", message: "Expense not found" });
  }
  res.status(200).json({ status: "success", expense });
};

exports.addExpense = (req, res) => {
  const newExpense = req.body;
  const newId = expenses[expenses.length - 1].id + 1;
  expenses.push({ ...newExpense, id: newId });
  fs.writeFile(
    `${__dirname}/dev-data/data/expenses.json`,
    JSON.stringify(expenses),
    (err) => {
      res
        .status(201)
        .json({ status: "success", message: "Expense added successfully" });
    }
  );
};

exports.editExpense = (req, res) => {
  res.status(204).json({ status: "success", message: null });
};

exports.deleteExpense = (req, res) => {
  res.status(200).json({ status: "success", message: "Updated expense" });
};
