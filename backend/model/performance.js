/*
Class : DIT/2B/22
Admission Number : 1940211
Name : Eric Ng Yong Wei
*/
var db = require('./databaseConfig.js');
var jwt = require('jsonwebtoken');
var config = require('../config');

var performanceDB = {
        // 1
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
        insertPerformance: function (festivalId, startTime, endTime,performanceId, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {
                    console.log("Connected!");
                    var sql = 'INSERT INTO performance(festivalId, startTime, endTime, performanceId)VALUES(?,?,?,?);';
                    conn.query(sql,[festivalId, startTime, endTime,performanceId], function (err, result) {
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
                        sql = 'SELECT * FROM performance WHERE startTime>=? LIMIT ?,?'
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
                        sql = 'SELECT * FROM performance WHERE startTime>=? AND festivalId=? LIMIT ?,?'
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
                        sql = 'SELECT COUNT(*) count FROM performance WHERE startTime=?'
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
                        sql = 'SELECT COUNT(*) count FROM performance WHERE startTime=? AND festivalId=?'
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