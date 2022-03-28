const path = require("path");
const yaml = require("js-yaml");
const fs = require("fs");

function load_conf(file_path, code = "utf-8") {
    return (doc = yaml.load(
        fs.readFileSync(path.join(__dirname, file_path), code)
    ));
}

module.exports = {
    load_conf,
};
