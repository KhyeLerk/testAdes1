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
                var sql = 'SELECT selectAllActsWithPopLimit(?,?)';
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
                    if(startTime==0) {
                        sql = 'CALL filterBasicCondOne(?,?,?)'
                    conn.query(sql, [festivalId,startRow,parseInt(rows)],function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    }else if(festivalId==0){
                        sql = 'CALL filterBasicCondTwo(?,?,?)'
                    conn.query(sql, [startTime,startRow,parseInt(rows)],function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    }else{
                        sql = 'CALL filterBasicCondThree(?,?,?,?)'
                        conn.query(sql, [startTime,festivalId,startRow,parseInt(rows)],function (err, result) {
                            conn.end();
                            if (err) {
                                console.log(err);
                                return callback(err,null);
                            } else {
                                return callback(null, result);
                            }
                        });  
                    }
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

                    // Condition one : startTime and endTime is NULL
                    if(startTime==0 && endTime ==0) {
                        sql = 'CALL filterAdvanceCondOne(?,?,?)'
                    conn.query(sql, [festivalId,startRow,parseInt(rows)],function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    // Condition two : startTime and festivalId is NULL
                    }else if(startTime==0 && festivalId == 0) {
                        sql = 'CALL filterAdvanceCondTwo(?,?,?)'
                    conn.query(sql, [endTime,startRow,parseInt(rows)],function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    // Condition three : endTime and festivalId is NULL
                    }else if(endTime==0 && festivalId == 0) {
                        sql = 'CALL filterAdvanceCondThree(?,?,?)'
                    conn.query(sql, [startTime,startRow,parseInt(rows)],function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    // Condition four : Only startTime is NULL
                    }else if(startTime==0) {
                        sql = 'CALL filterAdvanceCondFour(?,?,?,?)'
                    conn.query(sql, [festivalId,endTime,startRow,parseInt(rows)],function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    // Condition five : Only festivalId is NULL
                    }else if(festivalId==0){
                        sql = 'CALL filterAdvanceCondFive(?,?,?,?)'
                    conn.query(sql, [startTime,endTime,startRow,parseInt(rows)],function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    // Condition six : Only endTime is NULL
                    }else if(endTime==0){
                        sql = 'CALL filterAdvanceCondSix(?,?,?,?)'
                    conn.query(sql, [startTime,festivalId,startRow,parseInt(rows)],function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    // Condition seven : ALL is NOT NULL
                    }else{
                        sql = 'CALL filterAdvanceCondSeven(?,?,?,?,?)'
                        conn.query(sql, [startTime,endTime,festivalId,startRow,parseInt(rows)],function (err, result) {
                            conn.end();
                            if (err) {
                                console.log(err);
                                return callback(err,null);
                            } else {
                                return callback(null, result);
                            }
                        });  
                    }
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
                    var sql;
                    if(startTime==0 && festivalId==0) {
                        sql = 'CALL countBasicCondOne()'
                    conn.query(sql,function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    }else if(startTime==0) {
                        sql = 'CALL countBasicCondTwo(?)'
                    conn.query(sql, [festivalId],function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    }else if(festivalId==0){
                        sql = 'CALL countBasicCondThree(?)'
                    conn.query(sql, [startTime],function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    }else{
                        sql = 'CALL countBasicCondFour(?,?)'
                        conn.query(sql, [startTime,festivalId],function (err, result) {
                            conn.end();
                            if (err) {
                                console.log(err);
                                return callback(err,null);
                            } else {
                                return callback(null, result);
                            }
                        });  
                    }
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
                    var sql;
                    // Condition one : ALL is NULL
                    if(startTime==0 && endTime ==0 && festivalId==0) {
                        sql = 'CALL countAdvanceCondOne()'
                    conn.query(sql,function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    // Condition two : startTime and endTime is NULL
                    }else if(startTime==0 && endTime ==0) {
                        sql = 'CALL countAdvanceCondTwo(?)'
                    conn.query(sql, [festivalId],function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    // Condition three : startTime and festivalId is NULL
                    }else if(startTime==0 && festivalId == 0) {
                        sql = 'CALL countAdvanceCondThree(?)'
                    conn.query(sql, [endTime],function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    // Condition four : endTime and festivalId is NULL
                    }else if(endTime==0 && festivalId == 0) {
                        sql = 'CALL countAdvanceCondFour(?)'
                    conn.query(sql, [startTime],function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    // Condition five : Only startTime is NULL
                    }else if(startTime==0) {
                        sql = 'CALL countAdvanceCondFive(?,?)'
                    conn.query(sql, [endTime, festivalId],function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    // Condition six : Only festivalId is NULL
                    }else if(festivalId==0){
                        sql = 'CALL countAdvanceCondSix(?,?)'
                    conn.query(sql, [startTime,endTime],function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    // Condition seven : Only endTime is NULL
                    }else if(endTime==0){
                        sql = 'CALL countAdvanceCondSeven(?,?)'
                    conn.query(sql, [startTime,festivalId],function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err,null);
                        } else {
                            return callback(null, result);
                        }
                    });
                    // Condition eight : ALL is NOT NULL
                    }else{
                        sql = 'CALL countAdvanceCondEight(?,?,?)'
                        conn.query(sql, [startTime,endTime,festivalId],function (err, result) {
                            conn.end();
                            if (err) {
                                console.log(err);
                                return callback(err,null);
                            } else {
                                return callback(null, result);
                            }
                        });  
                    }
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
                    if(parseInt(startTime) == 0 && parseInt(endTime==0)){
                        sql = `UPDATE performance SET festivalId = ? WHERE performanceId = ?`
                        values = [festivalId, performanceId]
                    }else if(parseInt(startTime) == 0 && festivalId == 0){
                        sql = `UPDATE performance SET endTime= ? WHERE performanceId = ?`
                        values = [endTime, performanceId]
                    }else if(parseInt(endTime) == 0 && festivalId == 0){
                        sql = `UPDATE performance SET startTime = ? WHERE performanceId = ?`
                        values = [startTime, performanceId]
                    }else if(parseInt(startTime) == 0){
                        sql = `UPDATE performance SET endTime = ? , festivalId = ? WHERE performanceId = ?`
                        values = [endTime, festivalId, performanceId]
                    }else if(parseInt(endTime) == 0){
                        sql = `UPDATE performance SET startTime = ? , festivalId = ? WHERE performanceId = ?`
                        values = [startTime, festivalId, performanceId]
                    }else if(festivalId == 0){
                        sql = `UPDATE performance SET startTime = ? , endTime = ? WHERE performanceId = ?`
                        values = [startTime, endTime, performanceId]
                    }else{
                        sql = `UPDATE performance SET startTime = ? , endTime = ? , festivalId = ? WHERE performanceId = ?`
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
                                    sql = `UPDATE performanceWithPopularity SET festivalId = ? WHERE performanceId = ?`
                                    values = [festivalId, performanceId]
                                // Condition 2 : Update endTime
                                }else if(parseInt(startTime) == 0 && festivalId == 0 && popularity == 0){
                                    sql = `UPDATE performanceWithPopularity SET endTime= ? WHERE performanceId = ?`
                                    values = [endTime, performanceId]
                                // Condition 3 : Update startTime
                                }else if(parseInt(endTime) == 0 && festivalId == 0 && popularity == 0){
                                    sql = `UPDATE performanceWithPopularity SET startTime = ? WHERE performanceId = ?`
                                    values = [startTime, performanceId]
                                // Condition 4 : Update popularity
                                }else if(parseInt(endTime) == 0 && festivalId == 0 && startTime == 0){
                                    sql = `UPDATE performanceWithPopularity SET popularity = ? WHERE performanceId = ?`
                                    values = [popularity, performanceId]
                                // Condition 5 : Update festivalId & popularity
                                }else if(parseInt(endTime) == 0 && parseInt(startTime) == 0){
                                    sql = `UPDATE performanceWithPopularity SET popularity = ? , festivalId = ? WHERE performanceId = ?`
                                    values = [popularity, festivalId, performanceId]
                                // Condition 6 : Update festivalId & startTime
                                }else if(parseInt(endTime) == 0 && popularity == 0){
                                    sql = `UPDATE performanceWithPopularity SET startTime = ? , festivalId = ? WHERE performanceId = ?`
                                    values = [startTime, festivalId, performanceId]
                                // Condition 7 : Update festivalId & endTime
                                }else if(parseInt(startTime) == 0 && popularity == 0){
                                    sql = `UPDATE performanceWithPopularity SET endTime= ? , festivalId = ? WHERE performanceId = ?`
                                    values = [endTime, festivalId, performanceId]
                                // Condition 8 : Update startTime & endTime
                                }else if(popularity == 0 && festivalId == 0){
                                    sql = `UPDATE performanceWithPopularity SET startTime = ? , endTime = ? WHERE performanceId = ?`
                                    values = [startTime, endTime, performanceId]
                                // Condition 9 : Update startTime & popularity
                                }else if(parseInt(endTime) == 0 && festivalId == 0){
                                    sql = `UPDATE performanceWithPopularity SET startTime = ? , popularity = ? WHERE performanceId = ?`
                                    values = [startTime, popularity, performanceId]
                                // Condition 10 : Update popularity & endTime
                                }else if(parseInt(startTime) == 0 && festivalId == 0){
                                    sql = `UPDATE performanceWithPopularity SET popularity = ? , endTime = ? WHERE performanceId = ?`
                                    values = [popularity, endTime, performanceId]
                                // Condition 11 : Update all except startTime
                                }else if(startTime == 0){
                                    sql = `UPDATE performanceWithPopularity SET popularity = ? , festivalId = ? , endTime = ? WHERE performanceId = ?`
                                    values = [popularity, festivalId, endTime, performanceId]
                                // Condition 12 : Update all except endTime
                                }else if(endTime == 0){
                                    sql = `UPDATE performanceWithPopularity SET startTime= ? , festivalId = ? , popularity = ? WHERE performanceId = ?`
                                    values = [startTime, festivalId, popularity, performanceId]
                                // Condition 12 : Update all except festivalId
                                }else if(festivalId == 0){
                                    sql = `UPDATE performanceWithPopularity SET startTime = ? , endTime = ? , popularity =? WHERE performanceId = ?`
                                    values = [startTime, endTime, popularity, performanceId]
                                // Condition 13 : Update all except popoularity
                                }else if(popularity == 0){
                                    sql = `UPDATE performanceWithPopularity SET startTime = ? , endTime = ? , festivalId = ? WHERE performanceId = ?`
                                    values = [startTime, endTime, festivalId, performanceId]
                                // Condition 14 : Update everything
                                }else{
                                    sql = `UPDATE performanceWithPopularity SET startTime = ? , endTime = ? , festivalId = ? , popularity = ? WHERE performanceId = ?`
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
                    var sql = 'DELETE FROM performance WHERE performanceId = ?'
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
                        var sql = 'DELETE FROM performancewithpopularity WHERE performanceId = ?'
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