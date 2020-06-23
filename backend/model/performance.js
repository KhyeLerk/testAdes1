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
                var sql = 'SELECT performanceId,festivalId,startTime,endTime FROM performance LIMIT ?,?';
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
                var sql = 'SELECT performanceId,festivalId,startTime,endTime,popularity FROM performancewithpopularity LIMIT ?,?';
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
                        sql = 'SELECT * FROM performance WHERE festivalId=? LIMIT ?,?'
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
                        sql = 'SELECT * FROM performance WHERE CAST(startTime AS UNSIGNED) >=? LIMIT ?,?'
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
                        sql = 'SELECT * FROM performance WHERE CAST(startTime AS UNSIGNED)>=? AND festivalId=? LIMIT ?,?'
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
                    if(startTime==0) {
                        sql = 'SELECT COUNT(*) count FROM performance WHERE festivalId=?'
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
                        sql = 'SELECT COUNT(*) count FROM performance WHERE CAST(startTime AS UNSIGNED)>=?'
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
                        sql = 'SELECT COUNT(*) count FROM performance WHERE CAST(startTime AS UNSIGNED)>=? AND festivalId=?'
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
                    getPerformancesWithPopularityRowsFilter: function (startTime,festivalId, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {
                    console.log("Connected!")
                    var sql;
                    if(startTime==0) {
                        sql = 'SELECT COUNT(*) count FROM performancewithpopularity WHERE festivalId=?'
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
                        sql = 'SELECT COUNT(*) count FROM performancewithpopularity WHERE CAST(startTime AS UNSIGNED)>=?'
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
                        sql = 'SELECT COUNT(*) count FROM performancewithpopularity WHERE CAST(startTime AS UNSIGNED)>=? AND festivalId=?'
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

           // ADES : Get performances by festivalId
           getPerformancesByFestivalId: function (festivalId, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {
                    console.log("Connected!")
                    var sql = 'SELECT performanceId, startTime, endTime FROM performance WHERE festivalId=? ORDER BY endTime'
                        conn.query(sql, [festivalId],function (err, result) {
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

           // ADES : Get performances with popularity by festivalId
           getPerformancesByFestivalIdWithPopularity: function (festivalId, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {
                    console.log("Connected!")
                    var sql = 'SELECT performanceId, startTime, endTime, popularity FROM performance WHERE festivalId=? AND popularity IS NOT NULL ORDER BY endTime'
                        conn.query(sql, [festivalId],function (err, result) {
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