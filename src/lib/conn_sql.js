var sql = require("mssql");
var { conf } = require('./conf');
var db = {};
if (conf.db.type === 'mssql') {
    var config = {
        user: conf.db.mssql.username,
        password: conf.db.mssql.password,
        server: conf.db.mssql.host,
        port: conf.db.mssql.port,
        database: conf.db.mssql.database,
        options: {
            encrypt: false // Use this if you're on Windows Azure
        },
    };

    db.query = function (str_sql) {
        sql.on('error', err => {
            console.log(err);
        })

        return sql.connect(config)
            .then(pool => {
                return pool.request().query(str_sql)
            }).catch(err => {
                console.log(err);
            });
    }
}

module.exports = db;