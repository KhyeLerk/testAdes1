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
                    var sql = 'SELECT * FROM performance';
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
       getPerformancesLimit: function (page, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
                var startRow = page*10-10;
                var sql = 'SELECT * FROM performance LIMIT ?,10';
                conn.query(sql, [startRow], function (err, result) {
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
        getPerformancesByStartTime: function (page,startTime, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {
                    console.log("Connected!")
                    var startRow = page*10-10;
                    var sql = 'SELECT * FROM performance WHERE startTime=? LIMIT ?,10';
                    conn.query(sql, [startTime,startRow],function (err, result) {
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

           // 5
        getPerformancesByFestivalId: function (page,festivalId, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return callback(err,null);
                }
                else {
                    console.log("Connected!")
                    var startRow = page*10-10;
                    var sql = 'SELECT * FROM performance WHERE festivalId=? LIMIT ?,10';
                    conn.query(sql, [festivalId,startRow],function (err, result) {
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
