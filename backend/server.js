/*
Class : DIT/2B/22
Admission Number : 1940211
Name : Eric Ng Yong Wei
*/
var app = require('./controller/app.js');

var server = app.listen(process.env.PORT || 3000, function () {

    console.log('Web App Hosted at http://localhost:%s', process.env.PORT || 3000);

});


