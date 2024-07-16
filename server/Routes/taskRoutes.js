const router = require("express").Router();
const db = require("../Config/db");
const taskController = require("../Controllers/taskController");
const { verifyToken } = require("../Middleware/authmiddleware");
// get all tasks
router.get("/", verifyToken, taskController.getUserTasks);
//get a task
router.get("/:taskId", taskController.getTask);
// create a task
router.post("/", verifyToken, taskController.createTask);
// update a task
router.patch("/:taskId", taskController.editTask);
//delete task
router.delete("/:id", taskController.deleteTask);
module.exports = router;
