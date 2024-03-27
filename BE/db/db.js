const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;
const { DB_NAME, DB_PORT, DB_URL } = process.env;
const  connection = `mongodb://127.0.0.1:27017/employee-management`

mongoose.connect(connection, {
    useNewUrlParser: true,
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error Db Not connecting'));
db.once('open', function() {
    console.log('Db Successfully connected');
});

module.exports = db;
