const template = require("../lib/template");
const { get_connect } = require("../lib/conn_sql");
const { write_file } = require("../lib/file_io");

function generate_vue(generate_conf) {
    // custom_columns
    let db_conf = generate_conf.db_conf;
    let db_table = generate_conf.db_table;
    let api_root = generate_conf.api_root;
    let page_root = generate_conf.page_root;
    let search_column = generate_conf.search_column;
    let has_submit = generate_conf.has_submit;
    let has_print = generate_conf.has_print;

    template.render("sql", { table: db_table }, (str_sql) => {
        console.log(str_sql);

        get_connect(db_conf).query(str_sql).then(res => {
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
            const VUE_OUTPUT = db_conf.output.vue + "/" + page_root + "/";

            template.render("vue_index", { page_root, has_print, has_submit, search_column, api_root, tablename: tablename, classname: tablename, record: res.recordset }, (res) => {
                console.log(res);
                write_file(VUE_OUTPUT + "index.vue", res);
            });

            // form
            template.render("vue_form", { page_root, has_print, has_submit, search_column, api_root, tablename: tablename, classname: tablename, record: res.recordset }, (res) => {
                console.log(res);
                write_file(VUE_OUTPUT + "form.vue", res);
            });

            // tree
            template.render("vue_tree", {}, (res) => {
                console.log(res);
                write_file(VUE_OUTPUT + "tree.vue", res);
            });
        });
    });
}

module.exports = {
    generate_vue,
}