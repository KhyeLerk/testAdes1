/*
Class : DIT/2B/22
Admission Number : 1940211
Name : Eric Ng Yong Wei
*/


var express = require('express');
var app = express();
var performance = require('../model/performance.js'); 
var basic = require('../computation/basic.js')
var advanced = require('../computation/advanced.js')
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
const cors = require("cors")

app.use(express.static("public"));

app.use(bodyParser.json());// parse application/json
app.use(urlencodedParser); // parse application/x-www-form-urlencoded
app.options('*',cors());
app.use(cors());

/* ===============================================================================================================*/

// APIs

/*================================================================================================================*/

// Testing 

app.get('/', function (req,res){
    res.status(200).send('Awake')
})

// Basic data
app.get('/basic/data', function (req, res) {
    var page = req.body.page;
    var rows= req.body.rows

    performance.getPerformancesLimit(page,rows, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }else{
            res.status(500).send('Server Error');
        }
    });

    
});

// Advance data

app.get('/advance/data', function (req, res) {
    var page = req.body.page;
    var rows= req.body.rows

    performance.getPerformancesWithPopularityLimit(page,rows, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }else{
            res.status(500).send('Server Error');
        }
    });

    
});

/*================================================================================================================*/

// Basic insert

app.post('/basic/insert/performance', function(req,res){

    var {data} = req.body
    console.log(data)
    
    
        performance.insertPerformance(data, function(err,result){
            if(!err){
                res.status(200).send(`{\n"result":"success"\n}`);
            }
            else if(err.errno == 1048){
                res.status(400).send(`{\n"error":"Null Entry",\n"code":400,\n}`)
            }
            else if(err.errno == 1062){
                res.status(400).send(`{\n"error":"Duplicate Entry",\n"code":400,\n}`)
            }else{
                res.status(500).send(`{\n"error":"Server Entry",\n"code":500,\n}`);
            }
        })
    })

// Advance insert
app.post('/advance/insert/performance', function(req,res){

    var {data} = req.body
    console.log(data)
    
    
        performance.insertPerformanceWithPopularity(data, function(err,result){
            if(!err){
                res.status(200).send(`{\n"result":"success"\n}`);
            }
            else if(err.errno == 1048){
                res.status(400).send(`{\n"error":"Null Entry",\n"code":400,\n}`)
            }
            else if(err.errno == 1062){
                res.status(400).send(`{\n"error":"Duplicate Entry",\n"code":400,\n}`)
            }else{
                res.status(500).send(`{\n"error":"Server Entry",\n"code":500,\n}`);
            }
        })
    })

/*================================================================================================================*/

// Basic filter by both attr

app.get('/api/performances/:page/:startTime/startTime/:festivalId/festivalId/:rows' ,function(req,res){
    var page = req.params.page;
    var startTime = req.params.startTime;
    var festivalId = req.params.festivalId;
    var rows = req.params.rows;

    performance.getPerformancesFilter(page,startTime,festivalId,rows, function(err,result){
        if(!err){
            res.status(200).send(result);
        }else{
            res.status(500).send('Server error');
        }
    })
})

/*================================================================================================================*/

// FRONT END USE for getting number of rows in performance table

app.get('/api/performances/:startTime/startTime/:festivalId/festivalId' ,function(req,res){
    var startTime = req.params.startTime;
    var festivalId = req.params.festivalId;

    performance.getPerformancesRowsFilter(startTime,festivalId, function(err,result){
        if(!err){
            res.status(200).send(result);
        }else{
            res.status(500).send('Server error');
        }
    })
})

// FRONT END USE for getting number of rows in performancewithpopularity table

app.get('/api/performanceswithpopularity/:startTime/startTime/:festivalId/festivalId' ,function(req,res){
    var startTime = req.params.startTime;
    var festivalId = req.params.festivalId;

    performance.getPerformancesWithPopularityRowsFilter(startTime,festivalId, function(err,result){
        if(!err){
            res.status(200).send(result);
        }else{
            res.status(500).send('Server error');
        }
    })
})

/*================================================================================================================*/


// Basic Compute

app.get('/basic/result/' ,function(req,res){
    var festivalId = req.query.festivalId
    console.log(festivalId)

    performance.getPerformancesByFestivalId(festivalId, function(err,result){
        if(!err){
            var orderedPerformances =result.reduce((reduced, result)=> [...reduced, [result.performanceId, result.startTime, result.endTime]],[])
            result = JSON.stringify(basic.basicCompute(orderedPerformances))
            res.status(200).send(result)
        }else{
            res.status(500).send('Server error');
        }
    })
})

// Advanced Compute

app.get('/api/advanced/festivalId/:festivalId' , function(req,res){
    var festivalId = req.params.festivalId;

    performance.getPerformancesByFestivalIdWithPopularity(festivalId, function(err,result){
        if(!err){
            var orderedPerformances =result.reduce((reduced, result)=> [...reduced, [result.performanceId, result.startTime, result.endTime, result.popularity]],[])
            result = JSON.stringify(advanced.advancedCompute(orderedPerformances))
            res.status(200).send(result);
        }else{
            res.status(500).send('Server error');
        }
    })
})

/*================================================================================================================*/

module.exports= app


