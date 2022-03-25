const latin_convert = require("./lib/latin_convert.js");
const fs = require("fs");

const CRLF = "\r\n";
const TABLE_NAME = "CLHT_LWFBHTSH";

let columns = fs.readFileSync("./input/columns.txt", "utf-8").split(CRLF);

let sql_group1 = "";
let sql_group2 = "";
columns.forEach((i) => {
    sql_group1 += make_sql(
        i,
        function (en, cn) {
            return `ALTER TABLE RoadFlowWebForm.dbo.${TABLE_NAME} ADD ${en} varchar(100) NULL;${CRLF}`;
        },
        "F"
    );

    sql_group2 += make_sql(
        i,
        function (en, cn) {
            return `EXEC RoadFlowWebForm.sys.sp_addextendedproperty 'MS_Description', N'${cn}', 'schema', N'dbo', 'table', N'${TABLE_NAME}', 'column', N'${en}'; ${CRLF}`;
        },
        "F"
    );
});

console.log(sql_group1);
console.log(sql_group2);

//=====================================

function make_sql(cn, f, p, s) {
    p = p ?? "";
    s = s ?? "";
    let en = latin_convert.upper_first_letter(cn);
    return f(p + en + s, cn);
}
