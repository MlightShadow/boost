const txt_reader = require("./../lib/txt_reader");
const constant = require("./../lib/constant");

/**
 * 
 * 
 * 
 * 
 * 
 
select tablename +'|'+ columnname +'|'+ convert(varchar(1000), description) +'|'+ datatype +'|'+ primarykey from (
SELECT  obj.name as
tablename,
        col.name AS columnname ,
        ISNULL(ep.[value], '') AS description ,
        t.name AS datatype,
        CASE WHEN EXISTS ( SELECT   1
                           FROM     dbo.sysindexes si
                                    INNER JOIN dbo.sysindexkeys sik ON si.id = sik.id
                                                              AND si.indid = sik.indid
                                    INNER JOIN dbo.syscolumns sc ON sc.id = sik.id
                                                              AND sc.colid = sik.colid
                                    INNER JOIN dbo.sysobjects so ON so.name = si.name
                                                              AND so.xtype = 'PK'
                           WHERE    sc.id = col.id
                                    AND sc.colid = col.colid ) THEN '1'
             ELSE '0'
        END AS primarykey 
FROM    dbo.syscolumns col
        LEFT  JOIN dbo.systypes t ON col.xtype = t.xusertype
        inner JOIN dbo.sysobjects obj ON col.id = obj.id
                                         AND obj.xtype = 'U'
                                         AND obj.status >= 0
        LEFT  JOIN dbo.syscomments comm ON col.cdefault = comm.id
        LEFT  JOIN sys.extended_properties ep ON col.id = ep.major_id
                                                      AND col.colid = ep.minor_id
                                                      AND ep.name = 'MS_Description'
        LEFT  JOIN sys.extended_properties epTwo ON obj.id = epTwo.major_id
                                                         AND epTwo.minor_id = 0
                                                         AND epTwo.name = 'MS_Description'
WHERE   obj.name = 'PB_KCCKD1'--表名
) as a 
 
 
**/
let columns = txt_reader.get_lines("./../../input/columns.txt");

let code = "";

columns.forEach((i) => {
    arr = i.split("|");
    datatype = "";
    tablename = arr[0];
    columnname = arr[1];
    descrpition = arr[2];
    switch (arr[3]) {
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

    code += `[SugarColumn(ColumnName = "${columnname}" ${
        ", IsPrimaryKey = " + (arr[4] === "1" ? "true" : "false")
    }, IsIgnore = false)]${constant.RCLF}`;
    code += `public ${datatype} ${columnname} { get; set; }${constant.RCLF}`;
    code += `${constant.RCLF}`;
});

code += `}${constant.RCLF}`;

console.log(code);
