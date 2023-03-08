const { load_conf } = require("./lib/conf");
const { generate_sql_create } = require("./std/sql_create");

let sql_create_conf = load_conf(__dirname + "/conf/sql_create.yaml");

generate_sql_create(sql_create_conf);
