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
}

module.exports = performanceDB