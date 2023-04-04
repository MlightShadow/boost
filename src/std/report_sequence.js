const { get_lines, write_file } = require("../lib/file_io");
const constant = require("../lib/constant");

function domain(conf_file, output_file, symbol) {
    symbol = symbol ?? /[A-Z][1-9]00/
    let lines = get_lines(conf_file)
    let arr_name = [];
    let count = 1;
    while (count < 260) {
        let n = count % 10;
        if (n == 0) {
            count++;
            n = count % 10;
        }
        arr_name.push(String.fromCodePoint(parseInt(count / 10) + 65) + n + '00');
        count++;
    }
    let parse_lines = []
    for (let l of lines) {
        while (l.match(symbol) != null) {
            l = l.replace(symbol, arr_name.shift());
        }
        parse_lines.push();
    }
    console.log(parse_lines);
    write_file(output_file, parse_lines.join(constant.RCLF));
}

module.exports = {
    domain_sequence
}