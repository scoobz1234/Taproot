const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
    host        : 'taproot-sql-01.database.windows.net',  // Connection address
    user        : 'trgroot',      // Databases username
    password    : 'Taproot3to5',      // Databases password
    database    : 'taprootMobileApp01'       // Databases Name
});

// Start the App
const app = express();

// Creating a GET route that returns data from the 'users' table.
app.get('user_name', function (req, res){
    connection.getConnection(function (err, connection){
        connection.query('SELECT * FROM TBL_auth', function (error, results, fields) {
            if (error) throw error;

            res.send(results)
        });
    });
});

app.listen(3000, () => {
    console.log('Go to http://localhost:3000/users so you can see the data');
});