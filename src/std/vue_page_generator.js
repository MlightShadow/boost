const template = require("./../lib/template");
const db = require("../lib/conn_sql");
const { write_file } = require("../lib/txt_reader");
const { conf } = require("../lib/conf");

let table = "t_ProjectBasicData";
let api_root = "ProjectBasicData";
let page_root = "/project_basic_data"
let search_column = ["FKMMC", "FNumber"];
let has_submit = false;
let has_print = false;
template.render("sql", { table: table }, (str_sql) => {
    console.log(str_sql);

    db.query(str_sql).then(res => {
        let tablename = "";

        for (let r of res.recordset) {
            tablename = r["tablename"];
            switch (r["datatype"]) {
                case "date":
                    r.datatype = "date";
                    break;
                default:
                    r.datatype = "input";
                    break;
            }
            r.primarykey = r.primarykey === '0' ? 'false' : 'true';

            r.description = r.description ?? r.columnname;
        }
        console.log(res.recordset);

        //index

        template.render("vue_index", { page_root, has_print, has_submit, search_column, api_root, tablename: tablename, classname: tablename, record: res.recordset }, (res) => {
            console.log(res);
            write_file(conf.output.csharp.dto + "/" + tablename + "_index.vue", res);
        });

        // form
        template.render("vue_form", { page_root, has_print, has_submit, search_column, api_root, tablename: tablename, classname: tablename, record: res.recordset }, (res) => {
            console.log(res);
            write_file(conf.output.csharp.dto + "/" + tablename + "_form.vue", res);
        });
    });

});

