const path = require("path");
const yaml = require("js-yaml");
const fs = require("fs");

function load_conf(file_path, code = "utf-8") {
    return (doc = yaml.load(
        // fs.readFileSync(path.join(__dirname, file_path), code)
        fs.readFileSync(file_path, code)
    ));
}

// let conf = load_conf("./../conf/base.yaml");
// let generate_info = load_conf("./../conf/generate_info.yaml");

module.exports = {
    load_conf
};
