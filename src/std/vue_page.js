const template = require("../lib/template");
const db = require("../lib/conn_sql");
const { write_file } = require("../lib/txt_reader");
const { conf, generate_info } = require("../lib/conf");

let table = generate_info.vue.table_name;
let api_root = generate_info.vue.api_root;
let page_root = `${generate_info.vue.folder_name == null ? "" : "/" + generate_info.vue.folder_name}/${generate_info.vue.module_name}`;
let search_column = generate_info.vue.search_column;
let has_submit = false;
let has_print = false;

template.render("sql", { table: table }, (str_sql) => {
    console.log(str_sql);

    db.query(str_sql).then(res => {
        let tablename = "";

        for (let r of res.recordset) {
            tablename = r["tablename"];
            switch (r["datatype"]) {
                case "datetime":
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
        const VUE_OUTPUT = conf.output.vue + "/" + generate_info.vue.module_name + "/";

        template.render("vue_index", { page_root, has_print, has_submit, search_column, api_root, tablename: tablename, classname: tablename, record: res.recordset }, (res) => {
            console.log(res);
            write_file(VUE_OUTPUT + "index.vue", res);
        });

        // form
        template.render("vue_form", { page_root, has_print, has_submit, search_column, api_root, tablename: tablename, classname: tablename, record: res.recordset }, (res) => {
            console.log(res);
            write_file(VUE_OUTPUT + "form.vue", res);
        });
    });

});

