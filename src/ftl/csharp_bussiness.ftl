using RoadFlow.Data.Finance;
using RoadFlow.Model;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace RoadFlow.Business
{
    public class ${modelname}Bussiness : CommonBussiness
    {
        private readonly Data.${modelname}Data data;
        public ${modelname}Bussiness()
        {
            this.data = new ${modelname}Data();
        }

        public async Task<bool> save(${modelname}DTO dto)
        {
            return await data.save(dto);
        }

        public async Task<bool> delete(string id)
        {
            return await data.delete(id);
        }

        public async Task<${modelname}DTO> get(string id)
        {
            return await data.get(id);
        }

    }
}