using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using RoadFlow.Report;
using RoadFlow.Utility;
using System.Data;
using System.Threading.Tasks;

namespace RoadFlow.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ${modelname}Controller : ControllerBase
    {
        private readonly ILogger<${modelname}Controller> _logger;
        private readonly Business.${modelname}Business business = new Business.${modelname}Business();

        public ${modelname}Controller(ILogger<${modelname}Controller> logger)
        {
            _logger = logger;
        }

        [HttpGet("list")]
        public async Task<string> list()
        {
            int number = Request.Querys("number").ToInt();
            int size = Request.Querys("size").ToInt();
            string xmid = Request.Querys("xmid");
            string order = Request.Querys("order");
            string searchstring = Request.Querys("searchstring");

            if (order.IsNullOrWhiteSpace())
            {
                order = "createdate desc";
            }

            string sql_where = "xmid = @xmid and name like '%' + @searchstring + '%'";

            Task<Model.ResultModel.PageResult<Model.${modelname}DTO>> list = await business.PageListAsync<Model.${modelname}DTO>(number, size, sql_where, order, new { xmid, searchstring });

            return RoadFlowCommon.Tools.GetReturnJsonString(true, msg: "查询完成", jObject: JObject.FromObject(list));
        }

        [HttpGet("get")]
        public async Task<string> get()
        {
            string id = Request.Querys("id");

            return RoadFlowCommon.Tools.GetReturnJsonString(true, msg: "查询完成", jObject: JObject.FromObject( await business.get(id)));
        }

        [HttpPost("delete")]
        public async Task<string> delete()
        {
            try
            {
                string id = Request.Forms("id");

                Task<bool> flag = await business.delete(id);
                return RoadFlowCommon.Tools.GetReturnJsonString(flag, msg: flag ? "操作成功" : "操作失败，请检查后再试");
            }
            catch (Exception ex)
            {
                return RoadFlowCommon.Tools.GetReturnJsonString(false, msg: ex.Message);
            }
        }

        [HttpPost("save")]
        public async Task<string> save(Model.${modelname}DTO dto)
        {
            try
            {
                Task<bool> flag = await business.save(dto);
                return RoadFlowCommon.Tools.GetReturnJsonString(flag, msg: flag ? "操作成功" : "操作失败，请检查后再试");
            }
            catch (Exception ex)
            {
                return RoadFlowCommon.Tools.GetReturnJsonString(false, msg: ex.Message);
            }
        }

    }
}