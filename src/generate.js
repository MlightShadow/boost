const { generate_entity } = require("./std/csharp_entity");
const { generate_main } = require("./std/csharp_main");
const { generate_vue } = require("./std/vue_page");
const { load_conf } = require("./lib/conf");



let db_conf = load_conf(__dirname + "/conf/base.yaml");
let generate_info = load_conf(__dirname + "/conf/generate_info.yaml");


let entity_conf = {
    db_conf: db_conf,
    entity_namespace: generate_info.csharp.entity.namespace,
    db_table: generate_info.csharp.entity.table_name,
    class_name: generate_info.csharp.entity.class_name,
    ENTITY_OUTPUT: db_conf.output.csharp + "/model/" + generate_info.csharp.entity.namespace + "/",
}
generate_entity(entity_conf);


let main_conf = {
    CONTROLLER_OUTPUT: db_conf.output.csharp + "/controller/" + generate_info.csharp.controller.namespace + "/",
    BUSINESS_OUTPUT: db_conf.output.csharp + "/business/" + generate_info.csharp.business.namespace + "/",
    DATA_OUTPUT: db_conf.output.csharp + "/data/" + generate_info.csharp.data.namespace + "/",
    project_name: generate_info.csharp.common.project_name,
    controller_namespace: "." + generate_info.csharp.controller.namespace,
    model_namespace: "." + generate_info.csharp.entity.namespace,
    model_name: generate_info.csharp.entity.class_name,
    business_namespace: "." + generate_info.csharp.business.namespace,
    data_namespace: "." + generate_info.csharp.data.namespace,
    module_name: generate_info.csharp.common.module_name,
    module_name_cn: generate_info.csharp.common.module_name_cn
}

generate_main(main_conf);


let vue_conf = {
    db_conf: db_conf,
    module_name: generate_info.module_name,
    db_table: generate_info.vue.table_name,
    api_root: generate_info.vue.api_root,
    page_root: `${(generate_info.vue.folder_name == null ? "" : "/") + generate_info.vue.module_name}/${generate_info.vue.folder_name}`,
    search_column: generate_info.vue.search_column,
    has_submit: true,
    has_print: false,
}

generate_vue(vue_conf);