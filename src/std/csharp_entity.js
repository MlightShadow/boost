const template = require("./../lib/template");
const db = require("../lib/conn_sql");
const { write_file } = require("../lib/txt_reader");
const { conf, generate_info } = require("../lib/conf");

let entity_namespace = generate_info.csharp.entity.namespace;
const ENTITY_OUTPUT = conf.output.csharp + "/model/" + entity_namespace + "/";

let table = generate_info.csharp.entity.table_name;
let classname = generate_info.csharp.entity.class_name;
entity_namespace = "." + entity_namespace;
function generate_entity() {
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
                        r.datatype = "System.Guid?";
                        break;
                    default:
                        r.datatype = "object";
                        break;
                }
                r.primarykey = r.primarykey === '0' ? 'false' : 'true';

            }
            console.log(res.recordset);

            template.render("csharp_dto", { tablename, classname, entity_namespace, record: res.recordset }, (res) => {
                console.log(res);
                write_file(ENTITY_OUTPUT + tablename + ".cs", res);
            });
        });
    });
}

module.exports = {
    generate_entity
}

