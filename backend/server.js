/*
Class : DIT/1B/02
Admission Number : 1940211
Name : Eric Ng Yong Wei
*/
var app = require('./controller/app.js');

var port= 3000

var server = app.listen(port, function () {

    console.log('Web App Hosted at http://localhost:%s', port);

});

// app.get("/login", (req, res) => {
//     res.sendFile("login.html", { root: "./public/html-CA2" });
//     console.log("Login page sent")
// });