const { query } = require("express");
const db = require("../Config/db");
module.exports.getAllTasks = (req, res) => {
  var query = "SELECT * FROM tasks";
  db.query(query, (err, result) => {
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
  const userId = req.body.userId;
  const title = req.body.title;
  const description = req.body.description;
  const values = [[userId, title, description]];
  console.log(values);
  console.log("request body : ", req.body);
  const query = "INSERT INTO tasks (UserID, Title, Description) VALUES ?";
  db.query(query, [values], (err, result) => {
    if (err) {
      console.error("Query error : ", err);
      return res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    } else {
      res.send(result);
    }
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

  console.log(setClause);

  // Check if taskStatus is set to 'Done' and update endDate accordingly
  if (updatedData.taskStatus && updatedData.taskStatus === "Done") {
    setClause += ", EndDate = CURRENT_DATE()";

    // Insert into TaskHistory table
    const taskHistoryQuery = `
            INSERT INTO TaskHistory (TaskID, UserID, TaskTitle, TaskDescription, ActionDate)
            SELECT TaskID, UserID, Title,Description, EndDate
            FROM tasks
            WHERE TaskID = ?;
        `;

    db.query(taskHistoryQuery, [taskId], (historyErr, historyResult) => {
      if (historyErr) {
        console.log("Task history insertion error:", historyErr);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Task history inserted successfully:", historyResult);
      }
    });
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
