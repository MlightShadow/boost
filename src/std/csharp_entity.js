const constant = require("./../lib/constant");
const template = require("./../lib/template");
const db = require("../lib/conn_sql");
let table = "FB_ZTB";
template.render("sql", { table: table }, (str_sql) => {
    console.log(str_sql);

    db.query(str_sql).then(res => {
        let tablename = "";

        for (let r of res.recordset) {
            tablename = r["tablename"];
            switch (r["datatype"]) {
                case "nvarchar":
                case "varchar":
                    r.datatype = "System.String";
                    break;
                case "decimal":
                    r.datatype = "System.Decimal";
                    break;
                case "date":
                case "datetime":
                    r.datatype = "System.DateTime";
                    break;
                case "uniqueidentifier":
                    r.datatype = "System.Guid";
                    break;
                default:
                    r.datatype = "object";
                    break;
            }
            r.primarykey = r.primarykey === '0' ? 'false' : 'true';

        }
        console.log(res.recordset);

        template.render("csharp_dto", { tablename: tablename, classname: tablename, record: res.recordset }, (res) => { console.log(res); });
    });

});

