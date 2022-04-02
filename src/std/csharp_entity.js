const txt_reader = require("./../lib/txt_reader");
const constant = require("./../lib/constant");

let columns = txt_reader.get_lines("./../../input/columns.txt");

let code = "";

columns.forEach((i) => {
    code += `public System.String ${i} { get; set; }${constant.RCLF}`;
});

console.log(code);
