using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SqlSugar;

namespace RoadFlow.Model${entity_namespace}
{
    [SugarTable("${tablename}")]
    [Serializable]
    public class ${class_name}
    {
        <#list record as r >
        /// <summary>
        /// ${r.columnname}${r.description}
        /// </summary>
        [SugarColumn(ColumnName = "${r.columnname}", IsPrimaryKey = ${r.primarykey}, IsIgnore = false)]
        public ${r.datatype} ${r.columnname} { get; set; }

        </#list> 
    }
}