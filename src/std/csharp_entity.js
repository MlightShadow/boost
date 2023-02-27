const template = require("./../lib/template");
const { get_connect } = require("../lib/conn_sql");
const { write_file } = require("../lib/txt_reader");

function generate_entity(generate_conf) {

    let db_conf = generate_conf.db_conf;
    let entity_namespace = generate_conf.entity_namespace;
    const ENTITY_OUTPUT = generate_conf.ENTITY_OUTPUT;
    let db_table = generate_conf.db_table;
    let class_name = generate_conf.class_name;
    entity_namespace = "." + entity_namespace;

    template.render("sql", { table: db_table }, (str_sql) => {
        console.log(str_sql);

        get_connect(db_conf).query(str_sql).then(res => {
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
                    case "int":
                        r.datatype = "System.Int32";
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

            template.render("csharp_dto", { tablename, class_name, entity_namespace, record: res.recordset }, (res) => {
                console.log(res);
                write_file(ENTITY_OUTPUT + class_name + ".cs", res);
            });
        });
    });
}

module.exports = {
    generate_entity
}

