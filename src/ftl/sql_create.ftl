-- ${table_name_en} ${table_name_cn} definition

-- Drop table
-- DROP TABLE ${db_name}.${dbo_name}.${table_name_en};

CREATE TABLE ${db_name}.${dbo_name}.${table_name_en} (
    <#list column as col >
	${col.name_en} ${col.type} <#if col.is_pk>NOT</#if> NULL,
    <#if col.is_pk>
	CONSTRAINT ${table_name_en}_PK PRIMARY KEY (${col.name_en}),
    </#if>
    </#list>
);

-- Extended properties

EXEC ${db_name}.sys.sp_addextendedproperty @name=N'MS_Description', @value=N'${table_name_cn}', @level0type=N'Schema', @level0name=N'${dbo_name}', @level1type=N'Table', @level1name=N'${table_name_en}';

<#list column as col >
EXEC ${db_name}.sys.sp_addextendedproperty @name=N'MS_Description', @value=N'${col.name_cn}', @level0type=N'Schema', @level0name=N'${dbo_name}', @level1type=N'Table', @level1name=N'${table_name_en}', @level2type=N'Column', @level2name=N'${col.name_en}';
</#list>