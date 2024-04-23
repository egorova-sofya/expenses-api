const express = require("express");
const {
  createHabit,
  getAllHabits,
  getHabit,
  updateHabit,
  deleteHabit,
  aliasTopHabits,
  getHabitsStats,
} = require("../controllers/habitController");

const router = express.Router();

// param - миддлвар, который позволяет получать параметры из url. Если в url нет параметра id - миддлвар будет проигнорирован
// router.param("id", checkID);

//route  позволяет не дублировать url /api/v1/habits
// router.route("/").get(getAllHabits).post(checkBody, createHabit);
router.route("/top").get(aliasTopHabits, getAllHabits);

router.route("/habits-stats").get(getHabitsStats);

router.route("/").get(getAllHabits).post(createHabit);
router.route("/:id").get(getHabit).patch(updateHabit).delete(deleteHabit);

module.exports = router;
