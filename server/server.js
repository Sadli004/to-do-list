require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const taskRoutes = require("./Routes/taskRoutes");
const userRoutes = require("./Routes/userRoutes");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
// Allow requests
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
// Cookie parsing
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// Routes
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Listening on port:", process.env.PORT);
  }
});
