const express = require("express");
const {
  addHabit,
  getAllHabits,
  getHabit,
  editHabit,
  deleteHabit,
  checkID,
  checkBody,
} = require("../controllers/habitController");

const router = express.Router();

// param - миддлвар, который позволяет получать параметры из url. Если в url нет параметра id - миддлвар будет проигнорирован
router.param("id", checkID);

//route  позволяет не дублировать url /api/v1/habits
router.route("/").get(getAllHabits).post(checkBody, addHabit);
router.route("/:id").get(getHabit).patch(editHabit).delete(deleteHabit);

module.exports = router;
