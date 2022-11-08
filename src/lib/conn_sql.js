var mssql = require('mssql');
var { load_conf } = require('./conf');
let conf = load_conf("./../conf/base.yaml");
console.log(conf.db.mssql.username);
console.log(conf.db.mssql.password);
console.log(conf.db.mssql.host);
console.log(conf.db.mssql.port);
console.log(conf.db.mssql.database);



var db = {};
var config = {
    user:conf.db.mssql.username,
    password: conf.db.mssql.password,
    server: conf.db.mssql.host,
    database: conf.db.mssql.database,
    port: conf.db.mssql.port,
    options: {
        encrypt: true // Use this if you're on Windows Azure
    },
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 3000
    }
};
//执行sql,返回数据.
db.sql = function (sql, callBack) {
    var connection = new mssql.Connection(config, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        var ps = new mssql.PreparedStatement(connection);
        ps.prepare(sql, function (err) {
            if (err) {
                console.log(err);
                return;
            }
            ps.execute('', function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                ps.unprepare(function (err) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                        return;
                    }
                    callBack(err, result);
                });
            });
        });
    });
};
module.exports = db;