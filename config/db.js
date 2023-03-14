let mysql = require('mysql');

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "adminroot",
    database: "tuto_livre"
});

connection.connect((err)=> {
    if(err) throw err;
})

module.exports = connection

