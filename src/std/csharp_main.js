const template = require("../lib/template");
const { write_file } = require("../lib/txt_reader");
const { conf } = require("../lib/conf");

let default_namespace = "WorkOrder";

let info = {
    project_name: "MaterialCost",
    model_namespace: default_namespace,
    model_name: "HT_Reward",
    business_namespace: default_namespace,
    data_namespace: default_namespace,
    module_name: "HT_Reward",
    module_name_cn: "奖励扣款"
}

const CONTROLLER_OUTPUT = conf.output.csharp + "/controller/" + default_namespace + "/";
const BUSINESS_OUTPUT = conf.output.csharp + "/business/" + default_namespace + "/";
const DATA_OUTPUT = conf.output.csharp + "/data/" + default_namespace + "/";

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