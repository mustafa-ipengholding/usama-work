const express = require('express');
const  app = express();
const cors = require('cors');
const db = require('./db/db'); // Assuming db.js is located in a subdirectory called 'db'
const PORT = 5000;
const route = require('./routes/employeeRoutes')
const Employee = require('./models/employee');


app.use(cors());
app.use(express.json())
app.use(express.static('storage'));

app.use('/api/employee', route);
// Listen for connections on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


