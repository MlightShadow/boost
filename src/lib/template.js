const path = require("path");
const Freemarker = require("freemarker");

function render(file_name, data, fn) {
    let fm = new Freemarker({ root: path.join(__dirname, "./../ftl") });

    fm.renderFile(file_name, data, function (err, output) {
        console.log(`err : ${err}`);
        fn(output);
    });
}

module.exports = {
    render,
};
