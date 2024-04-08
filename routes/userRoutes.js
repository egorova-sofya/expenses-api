const express = require("express");
const {
  addUser,
  getAllUsers,
  deleteUser,
  editUser,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers).post(addUser);
router.route("/:id").get(getUser).patch(editUser).delete(deleteUser);

module.exports = router;
