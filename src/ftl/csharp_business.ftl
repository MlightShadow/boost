using RoadFlow.Data.Finance;
using RoadFlow.Model;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace RoadFlow.Business.${business_namespace}
{
    /// <summary>
    /// ${module_name_cn} 业务逻辑
    /// </summary>
    public class ${module_name} : CommonBussiness
    {
        private readonly Data.${data_namespace}.${module_name} data;
        public ${module_name}()
        {
            this.data = new Data.${data_namespace}.${module_name}();
        }

        /// <summary>
        /// ${module_name_cn} 保存
        /// </summary>
        public async Task<bool> save(Model.${model_namespace}.${model_name} dto)
        {
            return await data.save(dto);
        }

        /// <summary>
        /// ${module_name_cn} 删除
        /// </summary>
        public async Task<bool> delete(string id)
        {
            return await data.delete(id);
        }

        /// <summary>
        /// ${module_name_cn} 获取
        /// </summary>
        public async Task<Model.${model_namespace}.${model_name}> get(string id)
        {
            return await data.get(id);
        }
    }
}
