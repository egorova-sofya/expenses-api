const express = require("express");
const {
  addHabit,
  getAllHabits,
  getHabit,
  editHabit,
  deleteHabit,
} = require("../controllers/habitController");

const router = express.Router();

//route  позволяет не дублировать url /api/v1/habits
router.route("/").get(getAllHabits).post(addHabit);
router.route("/:id").get(getHabit).patch(editHabit).delete(deleteHabit);

module.exports = router;
