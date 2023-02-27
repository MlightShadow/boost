const template = require("../lib/template");
const { write_file } = require("../lib/txt_reader");



function generate_main(generate_conf) {


    const { CONTROLLER_OUTPUT, BUSINESS_OUTPUT, DATA_OUTPUT } = generate_conf;

    template.render("csharp_controller", generate_conf, (res) => {
        console.log(res);
        write_file(CONTROLLER_OUTPUT + generate_conf.module_name + "Controller.cs", res);
    });

    template.render("csharp_business", generate_conf, (res) => {
        console.log(res);
        write_file(BUSINESS_OUTPUT + generate_conf.module_name + ".cs", res);
    });

    template.render("csharp_data", generate_conf, (res) => {
        console.log(res);
        write_file(DATA_OUTPUT + generate_conf.module_name + ".cs", res);
    });
}

module.exports = {
    generate_main
}