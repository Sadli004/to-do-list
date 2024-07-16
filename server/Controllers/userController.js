const db = require("../Config/db");

//get all users
// module.exports.getAllUsers = (req, res) => {
//   const query = "SELECT * FROM users";
//   db.query(query, (err, result) => {
//     if (err) {
//       console.error("Query error : ", err);
//       res.status(500).send("Internal server error");
//     } else {
//       res.send(result);
//     }
//   });
// };
// get a user
module.exports.getUser = (req, res) => {
  const userId = req.user;
  const query = "SELECT * FROM users WHERE UserID = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Query error : ", err);
      res.status(500).send("Internal server error");
    } else {
      res.send(result);
    }
  });
};
// View User History
module.exports.viewHistory = (req, res) => {
  const userId = req.user;

  const query = "SELECT * FROM tasks WHERE UserID = ? AND TaskStatus = 'Done'";

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(result);
    }
  });
};
// module.exports.viewDay = (req, res) => {
//   const userId = req.user;
//   const date = new Date();

//   let day = date.getDate();
//   let month = date.getMonth() + 1;
//   let year = date.getFullYear();

//   // Format the current date in the "YYYY-MM-DD" format
//   let formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
//     .toString()
//     .padStart(2, "0")}`;
//   console.log("Task created on:", formattedDate);

//   // Use a parameterized query to avoid SQL injection
//   const query =
//     "SELECT * FROM tasks WHERE UserID = ? AND TaskStatus = 'Done' AND DATE_FORMAT(CreatedDate, '%Y-%m-%d') = ?";

//   db.query(query, [userId, formattedDate], (err, result) => {
//     if (err) {
//       console.error("Database query error:", err);
//       res.status(500).json({ error: "Internal server error" });
//     } else {
//       res.json(result);
//     }
//   });
// };
// View User History
module.exports.viewDay = (req, res) => {
  const userId = req.user;
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // Format the current date in the "YYYY-MM-DD" format
  let formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  console.log("Task created on:", formattedDate);
  const query = "SELECT * FROM tasks WHERE UserID = ? AND CreatedDate = ?";
  // var values = [userId, currentDate];
  db.query(query, [userId, formattedDate], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(result);
    }
  });
};
