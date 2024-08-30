const db = require("../Config/db");

module.exports.getUserTasks = (req, res) => {
  const userId = req.user;
  var query = "SELECT * FROM tasks  WHERE UserID = ? ORDER BY CreatedDate DESC";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Query error : ", err);
      res.status(500).send("Internal server error");
    } else {
      res.send(result);
    }
  });
};
module.exports.getTask = (req, res) => {
  const taskId = req.params.taskId;
  var query = "SELECT * FROM tasks WHERE TaskID = ?";
  db.query(query, [taskId], (err, result) => {
    if (err) {
      console.error("Query error : ", err);
      res.status(500).send("Internal server error");
    } else {
      res.send(result);
    }
  });
};
module.exports.createTask = (req, res) => {
  const userId = req.user;
  const { title, description, dueDate } = req.body;

  // Format the dueDate and CreatedDate fields
  const formattedDueDate = dueDate ? dueDate : null;
  const formattedCreatedDate = new Date().toISOString().split("T")[0];

  const values = [
    [userId, title, description, formattedDueDate, formattedCreatedDate],
  ];

  const query =
    "INSERT INTO tasks (UserID, Title, Description, DueDate, CreatedDate) VALUES ?";

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error("Query error : ", err);
      return res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    }
    res.send(result);
  });
};

//edit task / Done Task
module.exports.editTask = (req, res) => {
  let taskId = req.params.taskId;
  const updatedData = req.body;

  // Exclude TaskID and construct the SET part of the SQL query dynamically
  var setClause = Object.keys(updatedData)
    .filter((key) => key !== "TaskID")
    .map((key) => `${key} = ?`)
    .join(", ");

  if (updatedData.TaskStatus) {
    if (updatedData.TaskStatus === "Done") {
      setClause += ", EndDate = CURRENT_DATE()";
    } else {
      if (updatedData.TaskStatus === "In Progres") {
        setClause += ", EndDate = NULL";
      }
    }
  }

  const query = `UPDATE tasks SET ${setClause} WHERE TaskID = ?`;

  // Create an array of values from the updatedData object
  const values = [
    ...Object.values(updatedData).filter((val) => val !== taskId),
    taskId,
  ];

  // Query the database
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Query error:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
};
// Function to format the date
function formatDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // Format the date in the "YYYY-MM-DD" format
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}
// get today tasks
module.exports.todayTasks = (req, res) => {
  const userId = req.user;
  const today = new Date();
  const formattedDate = formatDate(today);
  var query =
    "SELECT * FROM tasks  WHERE UserID = ? AND (CreatedDate = ? OR TaskStatus = 'In Progres') ORDER BY CreatedDate DESC ";
  db.query(query, [userId, formattedDate], (err, results) => {
    if (err) {
      console.error("Query error : ", err);
      res.status(500).send("Internal server error");
    } else {
      res.status(200).json(results);
    }
  });
};
module.exports.upcomingTasks = (req, res) => {
  const userId = req.user;
  const today = new Date();
  const formattedDate = formatDate(today);
  var query =
    "SELECT * FROM tasks  WHERE UserID = ? AND DueDate > ? AND TaskStatus = 'In Progres'";
  db.query(query, [userId, formattedDate], (err, results) => {
    if (err) {
      console.error("Query error : ", err);
      res.status(500).send("Internal server error");
    } else {
      res.status(200).json(results);
    }
  });
};
module.exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  const query = "DELETE FROM tasks WHERE TaskID = ?";
  db.query(query, [taskId], (err, result) => {
    if (err) {
      console.error("Query error : ", err);
      res.status(500).send("Internal server error");
    } else {
      res.send(result);
    }
  });
};
// search
module.exports.searchTask = (req, res) => {
  console.log("req.user:", req.user);
  const userId = req.user;
  const searchTerm = req.query.searchTerm;

  if (!searchTerm) {
    return res.status(400).json({ error: "Search term is required" });
  }

  const query = "SELECT * FROM tasks WHERE Title LIKE ? AND UserID = ?";
  db.query(query, [`%${searchTerm}%`, userId], (err, results) => {
    if (err) {
      console.error("Query error:" + err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(200).json({ message: "No tasks found" });
    }

    res.status(200).json(results);
  });
};
// completed tasks
module.exports.completedTasks = (req, res) => {
  const userId = req.user;
  const query = "SELECT * FROM tasks WHERE UserID = ? AND TaskStatus = ?";

  db.query(query, [userId, "Done"], (err, results) => {
    if (err) {
      console.error("Query error:", err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve completed tasks" });
    } else {
      res.status(200).json(results);
    }
  });
};
