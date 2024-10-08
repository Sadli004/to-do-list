const router = require("express").Router();

const taskController = require("../Controllers/taskController");
const { verifyToken } = require("../Middleware/authmiddleware");
// get all tasks
router.get("/", verifyToken, taskController.getUserTasks);

// create a task
router.post("/", verifyToken, taskController.createTask);
// update a task
router.patch("/:taskId", taskController.editTask);
// //filter tasks
router.get("/today", verifyToken, taskController.todayTasks);
// upcoming tasks

router.get("/upcoming", verifyToken, taskController.upcomingTasks);
//completed tasks
router.get("/completed", verifyToken, taskController.completedTasks);
//search
router.get("/search", verifyToken, taskController.searchTask);
//get a task
router.get("/:taskId", taskController.getTask);

// //update task status
//delete task
router.delete("/:id", verifyToken, taskController.deleteTask);
module.exports = router;
