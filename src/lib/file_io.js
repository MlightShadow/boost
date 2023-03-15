const fs = require("fs");
const path = require("path");
const constant = require("./constant");
function get_lines(file_path, encode = "utf-8") {
    return fs
        .readFileSync(file_path, encode)
        .split(constant.RCLF);
}

function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

function write_file(file_path, str) {
    let p =  file_path;
    mkdirsSync(path.dirname(p));
    fs.writeFileSync(p, str, { 'flag': 'w' });
}

module.exports = {
    get_lines,
    write_file,
};
