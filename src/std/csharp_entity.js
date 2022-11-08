const constant = require("./../lib/constant");
const template = require("./../lib/template");
const db = require("../lib/conn_sql");
let table = "FB_ZTB";
template.render("sql", { table: table }, (str_sql) => {
    console.log(str_sql);

    db.query(str_sql).then(res => {
        let code = "";
        for (let r of res.recordset) {
            datatype = "";
            tablename = r["tablename"];
            columnname = r["columnname"];
            descrpition = r["description"];
            switch (r["datatype"]) {
                case "nvarchar":
                case "varchar":
                    datatype = "System.String";
                    break;
                case "decimal":
                    datatype = "System.Decimal";
                    break;
                case "date":
                case "datetime":
                    datatype = "System.DateTime";
                    break;
                case "uniqueidentifier":
                    datatype = "System.Guid";
                    break;
                default:
                    datatype = "object";
                    break;
            }

            if (code === "") {
                code += `[SugarTable("${tablename}")]${constant.RCLF}[Serializable]${constant.RCLF}public class ${tablename}${constant.RCLF}{${constant.RCLF}`;
            }

            code += `/// <summary>${constant.RCLF}`;
            code += `/// ${columnname} ${descrpition}${constant.RCLF}`;
            code += `/// </summary>${constant.RCLF}`;

            code += `[SugarColumn(ColumnName = "${columnname}" ${", IsPrimaryKey = " + (r["primarykey"] === "1" ? "true" : "false")
                }, IsIgnore = false)]${constant.RCLF}`;
            code += `public ${datatype} ${columnname} { get; set; }${constant.RCLF}`;
            code += `${constant.RCLF}`;
        }

        code += `}${constant.RCLF}`;

        console.log(code);

    });

});

