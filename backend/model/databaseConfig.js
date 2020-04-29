/*
Class : DIT/1B/02
Admission Number : 1940211
Name : Eric Ng Yong Wei
*/
var mysql = require('mysql');
var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "us-cdbr-iron-east-01.cleardb.net",
            user: "bc4a927634773e",
            password: "7365214a",
            database: "heroku_118371db0cc36c4"
        });    
        return conn;
    }
};
module.exports = dbconnect
 
