/*
Class : DIT/2B/22
Admission Number : 1940211
Name : Eric Ng Yong Wei
*/
var app = require('./controller/app.js');
var cluster = require('express-cluster');

cluster(function(worker) {
    var port= process.env.PORT || 3000

    app.get('/', function(req, res) {
        res.send('hello from worker #' + worker.id);
    });
    
    return app.listen(port, function () {
        
            console.log('Web App Hosted at http://localhost:%s', port);
    
    });
    
}, {count: 5})


