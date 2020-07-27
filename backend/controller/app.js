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
var cache = require('memory-cache')

app.use(express.static("public"));

app.use(bodyParser.json());// parse application/json
app.use(urlencodedParser); // parse application/x-www-form-urlencoded
app.options('*',cors());
app.use(cors());

/* ===============================================================================================================*/

// APIs

/*================================================================================================================*/

// Basic data
app.get('/basic/data', function (req, res) {
    var page = req.query.page;
    var rows= req.query.rows

    var cachedData = cache.get(`cache/basic/data/${page}/${rows}`)
    if(cachedData != null) return res.status(200).send(JSON.parse(cachedData))

    performance.getPerformancesLimit(page,rows, function (err, result) {
        if (!err) {
            cache.put(`cache/basic/data/${page}/${rows}`, JSON.stringify(result[0]), 300000)
            res.status(200).send(result[0]);
        }else{
            res.status(500).send(JSON.parse(`{"error":"Server Error","code":500}`));
        }
    });

    
});

// Advance data

app.get('/advance/data', function (req, res) {
    var page = req.query.page;
    var rows= req.query.rows;
    
    var cachedData = cache.get(`cache/advance/data/${page}/${rows}`)
    if(cachedData != null) return res.status(200).send(JSON.parse(cachedData))

    performance.getPerformancesWithPopularityLimit(page,rows, function (err, result) {
        if (!err) {
            cache.put(`cache/advance/data/${page}/${rows}`, JSON.stringify(result[0]), 300000)
            res.status(200).send(result[0]);
        }else{
            res.status(500).send(JSON.parse(`{"error":"Server Error","code":500}`));
        }
    });

    
});

/*================================================================================================================*/

// Basic insert

app.post('/basic/insert', function(req,res){

    var {data} = req.body
    cache.clear()
    
        performance.insertPerformance(data, function(err,result){
            if(!err){
                res.status(200).send(JSON.parse(`{"result":"success"}`));
            }
            else if(err.errno == 1048){
                res.status(400).send(JSON.parse(`{"error":"Null Entry","code":400}`))
            }
            else if(err.errno == 1062){
                res.status(400).send(JSON.parse(`{"error":"Duplicate Entry","code":400}`))
            }else{
                res.status(500).send(JSON.parse(`{"error":"Server Error","code":500}`));
            }
        })
    })

// Advance insert
app.post('/advance/insert', function(req,res){

    var {data} = req.body
    cache.clear()    
    
        performance.insertPerformanceWithPopularity(data, function(err,result){
            if(!err){
                res.status(200).send(JSON.parse(`{"result":"success"}`));
            }
            else if(err.errno == 1048){
                res.status(400).send(JSON.parse(`{"error":"Null Entry","code":400}`))
            }
            else if(err.errno == 1062){
                res.status(400).send(JSON.parse(`{"error":"Duplicate Entry","code":400}`))
            }else{
                res.status(500).send(JSON.parse(`{"error":"Server Error","code":500}`));
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

    var cachedData = cache.get(`cache/basic/filter/${page}/${startTime}/${festivalId}/${rows}`)
    if(cachedData != null) return res.status(200).send(JSON.parse(cachedData))

    performance.getPerformancesFilter(page,startTime,festivalId,rows, function(err,result){
        if(!err){
            cache.put(`cache/basic/filter/${page}/${startTime}/${festivalId}/${rows}`, JSON.stringify(result[0]), 300000)
            res.status(200).send(result[0]);
        }else{
            res.status(500).send(JSON.parse(`{"error":"Server Error","code":500}`));
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

    var cachedData = cache.get(`cache/advance/filter/${page}/${startTime}/${endTime}/${festivalId}/${rows}`)
    if(cachedData != null) return res.status(200).send(JSON.parse(cachedData))

    performance.getPerformancesWithPopularityFilter(page,startTime,endTime,festivalId,rows, function(err,result){
        if(!err){
            cache.put(`cache/advance/filter/${page}/${startTime}/${endTime}/${festivalId}/${rows}`, JSON.stringify(result[0]), 300000)
            res.status(200).send(result[0]);
        }else{
            res.status(500).send(JSON.parse(`{"error":"Server Error","code":500}`));
        }
    })
})

/*================================================================================================================*/

// FRONT END USE for getting number of rows in performance table

app.get('/basic/count' ,function(req,res){
    var startTime = req.query.startTime;
    var festivalId = req.query.festivalId;

    var cachedData = cache.get(`cache/basic/count/${startTime}/${festivalId}`)
    if(cachedData != null) return res.status(200).send(JSON.parse(cachedData))

    performance.getPerformancesRowsFilter(startTime,festivalId, function(err,result){
        if(!err){
            cache.put(`cache/basic/count/${startTime}/${festivalId}`,JSON.stringify(result[0]), 300000)
            res.status(200).send(result[0]);
        }else{
            res.status(500).send(JSON.parse(`{"error":"Server Error","code":500}`));
        }
    })
})

// FRONT END USE for getting number of rows in performancewithpopularity table

app.get('/advance/count' ,function(req,res){
    var startTime = req.query.startTime;
    var festivalId = req.query.festivalId;
    var endTime = req.query.endTime;

    var cachedData = cache.get(`cache/advance/count/${startTime}/${festivalId}/${endTime}`)
    if(cachedData != null) return res.status(200).send(JSON.parse(cachedData))

    performance.getPerformancesWithPopularityRowsFilter(startTime,festivalId,endTime, function(err,result){
        if(!err){
            cache.put(`cache/advance/count/${startTime}/${festivalId}/${endTime}`, JSON.stringify(result[0]), 300000)
            res.status(200).send(result[0]);
        }else{
            res.status(500).send(JSON.parse(`{"error":"Server Error","code":500}`));
        }
    })
})

/*================================================================================================================*/


// Basic Compute

app.get('/basic/result' ,function(req,res){
    var festivalId = req.query.festivalId
    if(festivalId == null) res.status(400).send(JSON.parse(`{"error":"Null Input","code":400}`))

    else{
    var cachedData = cache.get(`cache/basic/result/${festivalId}`)
    if(cachedData != null) return res.status(200).send(JSON.parse(cachedData))

    performance.getPerformancesByFestivalId(festivalId, function(err,result){
        if(!err){
            console.log("result returned: " + result)
            var orderedPerformances =result.reduce((reduced, result)=> [...reduced, [result.performanceId, result.startTime, result.endTime]],[])
            // Checking for null returns
            if(orderedPerformances.length == 0){
                cache.put(`cache/basic/result/${festivalId}`, JSON.stringify({"result":[]}), 300000)
                res.status(201).json({"result":[]});
            }
            // If not null run this
            else{
            var selectedActAry = basic.basicCompute(orderedPerformances)
            result=[]
            for(var i=0; i< selectedActAry.length;i++){
                result.push({performanceId : selectedActAry[i][0] , startTime : selectedActAry[i][1] , endTime :selectedActAry[i][2]})
            }
            cache.put(`cache/basic/result/${festivalId}`, JSON.stringify({"result":result}), 300000)
            result = JSON.parse(JSON.stringify({"result":result}))
            res.status(200).send(result)
            }
        }else{
            res.status(500).send(JSON.parse(`{"error":"Server Error","code":500}`));
        }
    })

}
})


// Advanced Compute

app.get('/advance/result' , function(req,res){
    var festivalId = req.query.festivalId;
    if(festivalId == null) res.status(400).send(JSON.parse(`{"error":"Null Input","code":400}`))
    else{

    var cachedData = cache.get(`cache/advance/result/${festivalId}`)
    if(cachedData != null) return res.status(200).send(JSON.parse(cachedData))

    performance.getPerformancesByFestivalIdWithPopularity(festivalId, function(err,result){
        if(!err){
            var orderedPerformances =result.reduce((reduced, result)=> [...reduced, [result.performanceId, result.startTime, result.endTime, result.popularity]],[])
            // Checking for null returns
            if(orderedPerformances.length == 0){
                cache.put(`cache/advance/result/${festivalId}`, JSON.stringify({"result":[]}), 300000)
                res.status(201).json({"result":[]});
            }    
             // If not null run this
             else{
                var selectedActAry = advanced.advancedCompute(orderedPerformances)
                result=[]
                for(var i=0; i< selectedActAry.length;i++){
                    result.push({performanceId : selectedActAry[i][0] , startTime : selectedActAry[i][1] , endTime :selectedActAry[i][2] , popularity : selectedActAry[i][3]})
                }
                cache.put(`cache/advance/result/${festivalId}`, JSON.stringify({"result":result}), 300000)
                result = JSON.parse(JSON.stringify({"result":result}))
                res.status(200).send(result)
                }
        }else{
            res.status(500).send(JSON.parse(`{"error":"Server Error","code":500}`));
        }
    })
}
})

/*================================================================================================================*/

// Additional Features ( Put + Delete )

/*================================================================================================================*/

// Basic Update
app.put('/basic/update', function(req,res){

    var performanceId = req.query.performanceId
    var festivalId = req.query.festivalId
    var startTime = req.query.startTime
    var endTime = req.query.endTime

    cache.clear()  
    
        performance.updatePerformance(performanceId,festivalId,startTime,endTime, function(err,result){
            if(!err){
                res.status(200).send(JSON.parse(`{"result":"success"}`));
            }else{
                res.status(500).send(JSON.parse(`{"error":"Server Error","code":500}`));
            }
        })
    })

// Advance update
app.put('/advance/update', function(req,res){

       var performanceId = req.query.performanceId
       var festivalId = req.query.festivalId
       var startTime = req.query.startTime
       var endTime = req.query.endTime
       var popularity = req.query.popularity
   
       cache.clear()  
       
           performance.updatePerformanceWithPopularity(performanceId,festivalId,startTime,endTime,popularity, function(err,result){
               if(!err){
                   res.status(200).send(JSON.parse(`{"result":"success"}`));
               }else{
                   res.status(500).send(JSON.parse(`{"error":"Server Error","code":500}`));
               }
           })
       })

// Basic delete
app.delete('/basic/delete', function (req, res) {
    var performanceId = req.query.performanceId

    cache.clear()

    performance.deletePerformances(performanceId, function (err, result) {
        if (!err) {
            res.status(200).send(JSON.parse(`{"result":"success"}`));
        }else{
            res.status(500).send(JSON.parse(`{"error":"Server Error","code":500}`));
        }
    });

    
});

// Advance delete
app.delete('/advance/delete', function (req, res) {
    var performanceId = req.query.performanceId

    cache.clear()

    performance.deletePerformancesWithPopularity(performanceId, function (err, result) {
        if (!err) {
            res.status(200).send(JSON.parse(`{"result":"success"}`));
        }else{
            res.status(500).send(JSON.parse(`{"error":"Server Error","code":500}`));
        }
    });

    
});

/*================================================================================================================*/

// Backend tester use ( Delete all data )

/*================================================================================================================*/

// Delete everything in the database
app.get('/reset', function(req, res) {

    cache.clear()
    performance.resetTable(function(error, result) {
        if (error) { 
            console.log(error);
            return res.json({error: error});
        }
        return res.json({ success: true });
    });
});

module.exports= app