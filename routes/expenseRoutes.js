const express = require("express");
const {
  addExpense,
  getAllExpenses,
  getExpense,
  editExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const router = express.Router();

//route  позволяет не дублировать url /api/v1/expenses
router.route("/").get(getAllExpenses).post(addExpense);
router.route("/:id").get(getExpense).patch(editExpense).delete(deleteExpense);

module.exports = router;
