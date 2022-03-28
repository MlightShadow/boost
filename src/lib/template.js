const path = require("path");
const Freemarker = require("freemarker.js");

function render(template_path, data) {
    let fm = new Freemarker({
        viewRoot: path.join(__dirname, template_path),
        options: {},
    });

    fm.render("test.ftl", data, function (err, html, output) {
        console.log(html);
        console.log(`err : ${err}`);
        console.log(`output: ${output}`);
        return output;
    });
}

module.exports = {
    render,
};
