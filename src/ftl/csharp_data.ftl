using System;
using System.Threading.Tasks;

namespace RoadFlow.Data${data_namespace}
{
    /// <summary>
    /// ${module_name_cn} 数据
    /// </summary>
    public class ${module_name} : DbContext
    {

        /// <summary>
        /// ${module_name_cn} 保存
        /// </summary>
        public async Task<bool> save(Model${model_namespace}.${model_name} dto)
        {
            if (String.IsNullOrEmpty(dto.id.ToString()))
            {
                int rows = await db.Insertable(dto).IgnoreColumns(new string[] { "ID" }).ExecuteCommandAsync();

                if (rows == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                int rows = await db.Updateable(dto).IgnoreColumns(new string[] { "ID", "createdate", "createuserid", "createusername" }).ExecuteCommandAsync();

                if (rows == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        /// <summary>
        /// ${module_name_cn} 获取
        /// </summary>
        public async Task<Model${model_namespace}.${model_name}> get(string id)
        {
            return await db.Queryable<Model${model_namespace}.${model_name}>().Where("id = @id", new { id }).FirstAsync();
        }

        /// <summary>
        /// ${module_name_cn} 删除
        /// </summary>
        public async Task<bool> delete(string id)
        {
            int row = await db.Deleteable<Model${model_namespace}.${model_name}>().Where("id = @id", new { id }).ExecuteCommandAsync();

            if (row == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}