const template = require("../lib/template");
const { write_file } = require("../lib/txt_reader");
const { conf, generate_info } = require("../lib/conf");

let default_namespace = generate_info.csharp.common.module_name;

const CONTROLLER_OUTPUT = conf.output.csharp + "/controller/" + default_namespace + "/";
const BUSINESS_OUTPUT = conf.output.csharp + "/business/" + default_namespace + "/";
const DATA_OUTPUT = conf.output.csharp + "/data/" + default_namespace + "/";

default_namespace = "." + default_namespace;

let info = {
    project_name: generate_info.csharp.common.project_name,
    controller_namespace: default_namespace,
    model_namespace: default_namespace,
    model_name: generate_info.csharp.entity.class_name,
    business_namespace: default_namespace,
    data_namespace: default_namespace,
    module_name: generate_info.csharp.common.module_name,
    module_name_cn: generate_info.csharp.common.module_name_cn
}

function generate_main(){
    template.render("csharp_controller", info, (res) => {
        console.log(res);
        write_file(CONTROLLER_OUTPUT + info.module_name + "Controller.cs", res);
    });

    template.render("csharp_business", info, (res) => {
        console.log(res);
        write_file(BUSINESS_OUTPUT + info.module_name + ".cs", res);
    });

    template.render("csharp_data", info, (res) => {
        console.log(res);
        write_file(DATA_OUTPUT + info.module_name + ".cs", res);
    });
}

module.exports = {
    generate_main
}