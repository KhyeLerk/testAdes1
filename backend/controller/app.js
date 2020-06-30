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

/*================================================================================================================*/

// Basic data
app.get('/basic/data', function (req, res) {
    var page = req.query.page;
    var rows= req.query.rows

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
    var page = req.query.page;
    var rows= req.query.rows

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
                res.status(500).send(`{\n"error":"Server Error",\n"code":500,\n}`);
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
                res.status(500).send(`{\n"error":"Server Error",\n"code":500,\n}`);
            }
        })
    })

/*================================================================================================================*/

// Basic filter by both attr

app.get('/basic/filter' ,function(req,res){
    var page = req.query.page;
    var startTime = req.query.startTime;
    var festivalId = req.query.festivalId;
    var rows = req.query.rows;

    performance.getPerformancesFilter(page,startTime,festivalId,rows, function(err,result){
        if(!err){
            res.status(200).send(result);
        }else{
            res.status(500).send('Server error');
        }
    })
})

// Advance filter by 3 attr

app.get('/advance/filter' ,function(req,res){
    var page = req.query.page;
    var startTime = req.query.startTime;
    var endTime = req.query.endTime;
    var festivalId = req.query.festivalId;
    var rows = req.query.rows;

    performance.getPerformancesWithPopularityFilter(page,startTime,endTime,festivalId,rows, function(err,result){
        if(!err){
            res.status(200).send(result);
        }else{
            res.status(500).send('Server error');
        }
    })
})

/*================================================================================================================*/

// FRONT END USE for getting number of rows in performance table

app.get('/basic/count' ,function(req,res){
    var startTime = req.query.startTime;
    var festivalId = req.query.festivalId;

    performance.getPerformancesRowsFilter(startTime,festivalId, function(err,result){
        if(!err){
            res.status(200).send(result);
        }else{
            res.status(500).send('Server error');
        }
    })
})

// FRONT END USE for getting number of rows in performancewithpopularity table

app.get('/advance/count' ,function(req,res){
    var startTime = req.query.startTime;
    var festivalId = req.query.festivalId;

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

app.get('/basic/result' ,function(req,res){
    var festivalId = req.query.festivalId

    performance.getPerformancesByFestivalId(festivalId, function(err,result){
        if(!err){
            var orderedPerformances =result.reduce((reduced, result)=> [...reduced, [result.performanceId, result.startTime, result.endTime]],[])
            // Checking for null returns
            if(orderedPerformances.length == 0){
                res.status(400).send(`{\n"error":"Null Entry",\n"code":400,\n}`);
            }
            // If not null run this
            else{
            var selectedActAry = basic.basicCompute(orderedPerformances)
            console.log(selectedActAry) // Testing array output
            result=[]
            for(var i=0; i< selectedActAry.length;i++){
                result.push({performanceId : selectedActAry[i][0] , startTime : selectedActAry[i][1] , endTime :selectedActAry[i][2]})
            }
             result = JSON.stringify(result)
            res.status(200).send(`{\n\t"result": \n${result}\n}`)
            }
        }else{
            res.status(500).send(`{\n"error":"Server Error",\n"code":500,\n}`);
        }
    })
})


// Advanced Compute

app.get('/advance/result' , function(req,res){
    var festivalId = req.query.festivalId;

    performance.getPerformancesByFestivalIdWithPopularity(festivalId, function(err,result){
        if(!err){
            var orderedPerformances =result.reduce((reduced, result)=> [...reduced, [result.performanceId, result.startTime, result.endTime, result.popularity]],[])
            // Checking for null returns
            if(orderedPerformances.length == 0){
                res.status(400).send(`{\n"error":"Null Entry",\n"code":400,\n}`)
            }    
             // If not null run this
             else{
                var selectedActAry = advanced.advancedCompute(orderedPerformances)
                result=[]
                for(var i=0; i< selectedActAry.length;i++){
                    result.push({performanceId : selectedActAry[i][0] , startTime : selectedActAry[i][1] , endTime :selectedActAry[i][2] , popularity : selectedActAry[i][3]})
                }
                 result = JSON.stringify(result)
                res.status(200).send(`{\n\t"result": \n${result}\n}`)
                }
        }else{
            res.status(500).send(`{\n"error":"Server Error",\n"code":500,\n}`);
        }
    })
})

/*================================================================================================================*/

module.exports= app


