const router = require('express').Router();
const db = require('../Config/db');
const taskController = require('../Controllers/taskController');
// get all tasks
router.get('/',taskController.getAllTasks);
//get a task
router.get('/:taskId',taskController.getTask);
// create a task
router.post('/',taskController.createTask);
// update a task
//delete task
router.delete('/:id',taskController.deleteTask)
module.exports = router;