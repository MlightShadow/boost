const fs = require("fs");
const path = require("path");
const constant = require("./constant");
function get_lines(file_path, encode = "utf-8") {
    return fs
        .readFileSync(path.join(__dirname, file_path), encode)
        .split(constant.RCLF);
}

function write_file(file_path, str) {
    fs.writeFileSync(path.join(__dirname, file_path), str, { 'flag': 'a' });
}

module.exports = {
    get_lines,
    write_file,
};
