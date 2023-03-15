const template = require("../lib/template");
const { write_file } = require("../lib/file_io");
const { full_letter } = require("../lib/latin_convert");

function generate_sql_create(generate_conf) {

    const { output } = generate_conf;

    for (let col of generate_conf.column) {
        if (!col.name_cn) { }
        if (!col.name_en) {
            col.name_en = full_letter(col.name_cn);
        }
        if (!col.type) {
            col.type = "varchar(100)";
        }
        if (!col.is_pk) { col.is_pk = false }
    }

    template.render("sql_create", generate_conf, (res) => {
        console.log(res);
        write_file(output + generate_conf.table_name_en + ".sql", res);
    });
}

module.exports = {
    generate_sql_create
}