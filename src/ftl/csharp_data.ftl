using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using RoadFlow.Data;
using RoadFlow.Model;
using RoadFlow.Utility;

namespace RoadFlow.Data
{
    public class ${modelname}Data : DbContext
    {

        public async Task<bool> save(${modelname}DTO dto)
        {
            if (String.IsNullOrEmpty(dto.ID))
            {
                int rows = await db.InsertableAsync(dto).IgnoreColumns(new string[] { "ID" }).ExecuteCommand();

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
                int rows = db.Updateable(dto).IgnoreColumns(new string[] { "ID", "createdate", "createuserid", "createusername" }).ExecuteCommand();

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

        public async Task<${modelname}DTO> get(string id)
        {
            return await db.QueryableAsync<${modelname}DTO>().Where("id = @id", new { id }).First();
        }

        public async Task<bool> delete(string id, string orgid)
        {
           Task<int> row = await db.Deleteable<${modelname}DTO>().Where("id = @id and xmid = @orgid", new { orgid, id }).ExecuteCommand();

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