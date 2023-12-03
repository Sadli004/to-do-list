require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const taskRoutes = require('./Routes/taskRoutes');
const userRoutes = require('./Routes/userRoutes');

app.use(cors());    
// Routes
app.use('/api/user',userRoutes);
app.use('/api/task',taskRoutes)

app.listen(5000, (err) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Listening on port:", 5000);
    }
});
