/*
Class : DIT/2B/22
Admission Number : 1940211
Name : Eric Ng Yong Wei
*/
var db = require('./databaseConfig.js');
var jwt = require('jsonwebtoken');
var config = require('../config');



var performanceDB = {
    insertCoins: function (performances, callback) {
            let i = 1;
            const template = performances.map(performance => `($${i++}, $${i++}, $${i++})`).join(',');
            const values = performances.reduce((reduced, performance) => [...reduced, performance.performanceId, performance.festivalId, performance.startTime,performance.endTime], [])
            const query = `INSERT INTO performance (performanceId, festivalId, startTime, endTime) VALUES ${template};`;
            console.log(values, query);
    
            // const client = this.connect();
            // client.query(query, values, (err, result) => {
            //     callback(err, result);
            //     client.end();
            // });
        },
        //1
        getPerformances: function (callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {
                    console.log("Connected!");
                    var sql = 'SELECT COUNT(*) count FROM performance';
                    conn.query(sql, function (err, result) {
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

        // 2
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

        // 3
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
                    //const template = data.map(performance => `($${i++}, $${i++}, $${i++}, $${i++})`).join(',');
                    const values = data.reduce((reduced, performance) => [...reduced, performance.performanceId, performance.festivalId, performance.startTime,performance.endTime], [])
                    // const query = `INSERT INTO performance (performanceId, festivalId, startTime, endTime) VALUES ${template};`;
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

           // 4
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

         //  5
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
}

module.exports = performanceDB