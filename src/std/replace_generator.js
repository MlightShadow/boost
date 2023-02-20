const template = require("../lib/template");
const { write_file } = require("../lib/txt_reader");
const { conf } = require("../lib/conf");

let info = {
    project_name: "MaterialCost",
    model_namespace: "WorkOrder",
    model_name: "HT_WorkOrderDTO",
    business_namespace: "WorkOrder",
    module_name: "HT_WorkOrder",
    module_name_cn: "点工单"
}
template.render("csharp_controller", info, (res) => {
    console.log(res);
    write_file(conf.output.csharp.dto + "/" + info.module_name + "Controller.cs", res);
});


