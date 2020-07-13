/*
Class : DIT/2B/22
Admission Number : 1940211
Name : Eric Ng Yong Wei
*/
var db = require('./databaseConfig.js');

var performanceDB = {
        // Basic Data
       getPerformancesLimit: function (page,rows, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
                var startRow = page*rows-rows;
                var sql = 'CALL selectAllActsLimit(?,?)';
                conn.query(sql, [startRow,parseInt(rows)], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
              });
       }, 

       // Advance data
       getPerformancesWithPopularityLimit: function (page,rows, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
                var startRow = page*rows-rows;
                var sql = 'CALL selectAllActsWithPopLimit(?,?)';
                conn.query(sql, [startRow,parseInt(rows)], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
              });
       },

        // Basic insert
        insertPerformance: function (data, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {
                    console.log("Connected!");
                    let i = 1;
                    const template = data.map(performance => `(?,?,?,?)`).join(',');
                    const values = data.reduce((reduced, performance) => [...reduced, performance.performanceId, performance.festivalId, performance.startTime,performance.endTime], [])
                    var sql = `INSERT INTO performance(performanceId, festivalId, startTime, endTime)VALUES ${template};`;
                    conn.query(sql,values, function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                }
                  });
           },

           // Advance insert
           insertPerformanceWithPopularity: function (data, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {

                    console.log("Connected!");
                    let i = 1;
                    const template = data.map(performance => `(?,?,?,?,?)`).join(',');
                    const values = data.reduce((reduced, performance) => [...reduced, performance.performanceId, performance.festivalId, performance.startTime, performance.endTime, performance.popularity], [])
                    var sql = `INSERT INTO performancewithpopularity(performanceId, festivalId, startTime, endTime, popularity)VALUES ${template};`;
                    conn.query(sql,values, function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                }
                  });
           },

           // Basic filter by both attr
        getPerformancesFilter: function (page,startTime,festivalId,rows, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {
                    console.log("Connected!")
                    var startRow = page*rows-rows;
                    var sql;
                    var values;
                    // Condition 1 : Filter using festivalId
                    if(startTime==0) {
                        sql = 'CALL filterBasicCondOne(?,?,?)'
                        values = [festivalId,startRow,parseInt(rows)]
                    // Condition 2 : Filter using startTime
                    }else if(festivalId==0){
                        sql = 'CALL filterBasicCondTwo(?,?,?)'
                        values = [startTime,startRow,parseInt(rows)]
                    // Condition 3 : Filter using both attr
                    }else{
                        sql = 'CALL filterBasicCondThree(?,?,?,?)'
                        values = [startTime,festivalId,startRow,parseInt(rows)]  
                    }
                    conn.query(sql, values, function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                }
                  });
           },

           // Advance filter by 3 attr
           getPerformancesWithPopularityFilter: function (page,startTime,endTime,festivalId,rows, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {
                    console.log("Connected!")
                    var startRow = page*rows-rows;
                    var sql;
                    var values;

                    // Condition one : startTime and endTime is NULL
                    if(startTime==0 && endTime ==0) {
                        sql = 'CALL filterAdvanceCondOne(?,?,?)'
                        values = [festivalId,startRow,parseInt(rows)]
                    // Condition two : startTime and festivalId is NULL
                    }else if(startTime==0 && festivalId == 0) {
                        sql = 'CALL filterAdvanceCondTwo(?,?,?)'
                        values = [endTime,startRow,parseInt(rows)]
                    // Condition three : endTime and festivalId is NULL
                    }else if(endTime==0 && festivalId == 0) {
                        sql = 'CALL filterAdvanceCondThree(?,?,?)'
                        values = [startTime,startRow,parseInt(rows)]
                    // Condition four : Only startTime is NULL
                    }else if(startTime==0) {
                        sql = 'CALL filterAdvanceCondFour(?,?,?,?)'
                        values = [festivalId,endTime,startRow,parseInt(rows)]
                    // Condition five : Only festivalId is NULL
                    }else if(festivalId==0){
                        sql = 'CALL filterAdvanceCondFive(?,?,?,?)'
                        values = [startTime,endTime,startRow,parseInt(rows)]
                    // Condition six : Only endTime is NULL
                    }else if(endTime==0){
                        sql = 'CALL filterAdvanceCondSix(?,?,?,?)'
                        values =  [startTime,festivalId,startRow,parseInt(rows)]
                    // Condition seven : ALL is NOT NULL
                    }else{
                        sql = 'CALL filterAdvanceCondSeven(?,?,?,?,?)'
                        values = [startTime,endTime,festivalId,startRow,parseInt(rows)]
                    }
                    conn.query(sql, values,function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                }
                  });
           },

         //  FRONT END USE for getting number of rows in performance table
        getPerformancesRowsFilter: function (startTime,festivalId, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {
                    console.log("Connected!")
                    var sql, values;
                    // Condition 1 : All is NULL
                    if(startTime==0 && festivalId==0) {
                        sql = 'CALL countBasicCondOne()'
                        values = []
                    }else if(startTime==0) {
                        sql = 'CALL countBasicCondTwo(?)'
                        values = [festivalId]
                    }else if(festivalId==0){
                        sql = 'CALL countBasicCondThree(?)'
                        values = [startTime]
                    }else{
                        sql = 'CALL countBasicCondFour(?,?)'
                        values = [startTime,festivalId]
                    }
                    conn.query(sql, values, function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                }
                  });
           },

                    //  FRONT END USE for getting number of rows in performancewithpopularity table
                    getPerformancesWithPopularityRowsFilter: function (startTime,festivalId,endTime, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {
                    console.log("Connected!")
                    var sql, values;
                    // Condition one : ALL is NULL
                    if(startTime==0 && endTime ==0 && festivalId==0) {
                        sql = 'CALL countAdvanceCondOne()'
                        values = []
                    // Condition two : startTime and endTime is NULL
                    }else if(startTime==0 && endTime ==0) {
                        sql = 'CALL countAdvanceCondTwo(?)'
                        values = [festivalId]
                    // Condition three : startTime and festivalId is NULL
                    }else if(startTime==0 && festivalId == 0) {
                        sql = 'CALL countAdvanceCondThree(?)'
                        values = [endTime]
                    // Condition four : endTime and festivalId is NULL
                    }else if(endTime==0 && festivalId == 0) {
                        sql = 'CALL countAdvanceCondFour(?)'
                        values = [startTime]
                    // Condition five : Only startTime is NULL
                    }else if(startTime==0) {
                        sql = 'CALL countAdvanceCondFive(?,?)'
                        values =  [endTime, festivalId]
                    // Condition six : Only festivalId is NULL
                    }else if(festivalId==0){
                        sql = 'CALL countAdvanceCondSix(?,?)'
                        values = [startTime,endTime]
                    // Condition seven : Only endTime is NULL
                    }else if(endTime==0){
                        sql = 'CALL countAdvanceCondSeven(?,?)'
                        values = [startTime,festivalId]
                    // Condition eight : ALL is NOT NULL
                    }else{
                        sql = 'CALL countAdvanceCondEight(?,?,?)'
                        values = [startTime,endTime,festivalId]
                    }
                    conn.query(sql, values, function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                }
                  });
           },

           // ADES : Get performances by festivalId // Basic Compute
           getPerformancesByFestivalId: function (festivalId, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {
                    console.log("Connected!")
                    var sql = 'CALL BasicOrderAct(?)'
                        conn.query(sql, [festivalId],function (err, result) {
                            conn.end();
                            if (err) {
                                console.log(err);
                                return callback(err,null);
                            } else {
                                return callback(null, result[0]);
                            }
                        });  
                    
                }
                  });
           },

           // ADES : Get performances with popularity by festivalId // Advance Compute
           getPerformancesByFestivalIdWithPopularity: function (festivalId, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {
                    console.log("Connected!")
                    var sql = 'CALL AdvanceOrderAct(?)'
                        conn.query(sql, [festivalId],function (err, result) {
                            conn.end();
                            if (err) {
                                console.log(err);
                                return callback(err,null);
                            } else {
                                return callback(null, result[0]);
                            }
                        });  
                    
                }
                  });
           },

           // Basic update
           updatePerformance: function (performanceId,festivalId,startTime,endTime, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {
                    console.log("Connected!");
                    var sql,values;
                    // Condition 1 : Update festivalId only
                    if(parseInt(startTime) == 0 && parseInt(endTime==0)){
                        sql = `CALL UpdateBasicCondOne(?,?)`
                        values = [festivalId, performanceId]
                    // Condition 2 : Update endTime only
                    }else if(parseInt(startTime) == 0 && festivalId == 0){
                        sql = `CALL UpdateBasicCondTwo(?,?)`
                        values = [endTime, performanceId]
                    // Condition 3 : Update startTime only
                    }else if(parseInt(endTime) == 0 && festivalId == 0){
                        sql = `CALL UpdateBasicCondThree(?,?)`
                        values = [startTime, performanceId]
                    // Condition 4 : Update endTime and festivalId
                    }else if(parseInt(startTime) == 0){
                        sql = `CALL UpdateBasicCondFour(?,?,?)`
                        values = [endTime, festivalId, performanceId]
                    // Condition 5 : Update startTime and festivalId
                    }else if(parseInt(endTime) == 0){
                        sql = `CALL UpdateBasicCondFive(?,?,?)`
                        values = [startTime, festivalId, performanceId]
                    // Condition 6 : Update endTime and festivalId
                    }else if(festivalId == 0){
                        sql = `CALL UpdateBasicCondSix(?,?,?)`
                        values = [startTime, endTime, performanceId]
                    // Condition 7 : Update ALL attr
                    }else{
                        sql = `CALL UpdateBasicCondSeven(?,?,?,?)`
                        values = [startTime, endTime, festivalId, performanceId]
                    }

                    conn.query(sql,values, function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                }
                  });
           },

                      // Advanced update
                      updatePerformance: function (performanceId,festivalId,startTime,endTime,popularity, callback) {
                        var conn = db.getConnection();
                        conn.connect(function (err) {
                            if (err) {
                                console.log(err);
                                return callback(err,null);
                            }
                            else {
                                console.log("Connected!");
                                var sql,values;

                                // Condition 1 : Update festivalId
                                if(parseInt(startTime) == 0 && parseInt(endTime==0) && popularity == 0){
                                    sql = `CALL UpdateAdvanceCondOne(?,?)`
                                    values = [festivalId, performanceId]
                                // Condition 2 : Update endTime
                                }else if(parseInt(startTime) == 0 && festivalId == 0 && popularity == 0){
                                    sql = `CALL UpdateAdvanceCondTwo(?,?)`
                                    values = [endTime, performanceId]
                                // Condition 3 : Update startTime
                                }else if(parseInt(endTime) == 0 && festivalId == 0 && popularity == 0){
                                    sql = `CALL UpdateAdvanceCondThree(?,?)`
                                    values = [startTime, performanceId]
                                // Condition 4 : Update popularity
                                }else if(parseInt(endTime) == 0 && festivalId == 0 && startTime == 0){
                                    sql = `CALL UpdateAdvanceCondFour(?,?)`
                                    values = [popularity, performanceId]
                                // Condition 5 : Update festivalId & popularity
                                }else if(parseInt(endTime) == 0 && parseInt(startTime) == 0){
                                    sql = `CALL UpdateAdvanceCondFive(?,?,?)`
                                    values = [popularity, festivalId, performanceId]
                                // Condition 6 : Update festivalId & startTime
                                }else if(parseInt(endTime) == 0 && popularity == 0){
                                    sql = `CALL UpdateAdvanceCondSix(?,?,?)`
                                    values = [startTime, festivalId, performanceId]
                                // Condition 7 : Update festivalId & endTime
                                }else if(parseInt(startTime) == 0 && popularity == 0){
                                    sql = `CALL UpdateAdvanceCondSeven(?,?,?)`
                                    values = [endTime, festivalId, performanceId]
                                // Condition 8 : Update startTime & endTime
                                }else if(popularity == 0 && festivalId == 0){
                                    sql = `CALL UpdateAdvanceCondEight(?,?,?)`
                                    values = [startTime, endTime, performanceId]
                                // Condition 9 : Update startTime & popularity
                                }else if(parseInt(endTime) == 0 && festivalId == 0){
                                    sql = `CALL UpdateAdvanceCondNine(?,?,?)`
                                    values = [startTime, popularity, performanceId]
                                // Condition 10 : Update popularity & endTime
                                }else if(parseInt(startTime) == 0 && festivalId == 0){
                                    sql = `CALL UpdateAdvanceCondTen(?,?,?)`
                                    values = [popularity, endTime, performanceId]
                                // Condition 11 : Update all except startTime
                                }else if(startTime == 0){
                                    sql = `CALL UpdateAdvanceCondEleven(?,?,?,?)`
                                    values = [popularity, festivalId, endTime, performanceId]
                                // Condition 12 : Update all except endTime
                                }else if(endTime == 0){
                                    sql = `CALL UpdateAdvanceCondTwelve(?,?,?,?)`
                                    values = [startTime, festivalId, popularity, performanceId]
                                // Condition 13 : Update all except festivalId
                                }else if(festivalId == 0){
                                    sql = `CALL UpdateAdvanceCondThirteen(?,?,?,?)`
                                    values = [startTime, endTime, popularity, performanceId]
                                // Condition 14 : Update all except popoularity
                                }else if(popularity == 0){
                                    sql = `CALL UpdateAdvanceCondFourteen(?,?,?,?)`
                                    values = [startTime, endTime, festivalId, performanceId]
                                // Condition 15 : Update everything
                                }else{
                                    sql = `CALL UpdateAdvanceCondFifteen(?,?,?,?,?)`
                                    values = [startTime, endTime, festivalId, popularity, performanceId]
                                }
            
                                conn.query(sql,values, function (err, result) {
                                    conn.end();
                                    if (err) {
                                        console.log(err);
                                        return callback(err,null);
                                    } else {
                                        return callback(null, result);
                                    }
                                });
                            }
                              });
                       },

            // Basic delete
           deletePerformances: function (performanceId, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {
                    console.log("Connected!");
                    var sql = 'CALL deleteBasic(?)'
                    conn.query(sql, [performanceId], function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                }
                  });
           }, 

            // Advance delete
            deletePerformancesWithPopularity: function (performanceId, callback) {
                var conn = db.getConnection();
                conn.connect(function (err) {
                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    }
                    else {
                        console.log("Connected!");
                        var sql = 'CALL deleteAdvance(?)'
                        conn.query(sql, [performanceId], function (err, result) {
                            conn.end();
                            if (err) {
                                console.log(err);
                                return callback(err,null);
                            } else {
                                return callback(null, result);
                            }
                        });
                    }
                      });
               }, 
}

module.exports = performanceDB