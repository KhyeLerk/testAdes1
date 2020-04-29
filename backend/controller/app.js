/*
Class : DIT/1B/02
Admission Number : 1940211
Name : Eric Ng Yong Wei
*/

var express = require('express');
var app = express();
var performance = require('../model/performance.js'); 
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

app.use(express.static("public"));

app.use(bodyParser.json());// parse application/json
app.use(urlencodedParser); // parse application/x-www-form-urlencoded

// APIs

app.get('/', (req, res) => res.send('Hello world! v2'))

// ADES : 1
app.get('/api/performances', function (req, res) {

    performance.getPerformances(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }else{
            res.status(500).send('Server Error');
        }
    });

    
});

// ADES : 2
app.get('/api/performances/:page', function (req, res) {
    var page = req.params.page;

    performance.getPerformancesLimit(page, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }else{
            res.status(500).send('Server Error');
        }
    });

    
});

// ADES : 3

app.post('/api/performances', function(req,res){

    var festivalId = req.body.festivalId;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    console.log(festivalId)
    
        performance.insertPerformance(festivalId, startTime, endTime, function(err,result){
            if(!err){
                res.status(201).send("{\"performanceId\":"+result.insertId+"}");
            }else{
                res.status(500).send('Server error');
            }
        })
    })

// ADES : 4

app.get('/api/performances/:page/startTime' ,function(req,res){
    var page = req.params.page;

    performance.getPerformancesByStartTime(page, function(err,result){
        if(!err){
            res.status(200).send(result);
        }else{
            res.status(500).send('Server error');
        }
    })
})

// ADES : 5

app.get('/api/performances/:page/festivalId' ,function(req,res){
    var page = req.params.page

    performance.getPerformancesByFestivalId(page, function(err,result){
        if(!err){
            res.status(200).send(result);
        }else{
            res.status(500).send('Server error');
        }
    })
})

module.exports= app


