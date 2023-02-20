using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using RoadFlow.Utility;
using System;
using System.Threading.Tasks;

namespace RoadFlow.${project_name}.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ${module_name}Controller : ControllerBase
    {
        private readonly ILogger<${module_name}Controller> _logger;
        private readonly Business.${business_namespace}.${module_name} business = new Business.${business_namespace}.${module_name}();

        public ${module_name}Controller(ILogger<${module_name}Controller> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// ${module_name_cn}列表
        /// </summary>
        /// <returns></returns>
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

            Task<Model.ResultModel.PageResult<Model.${model_namespace}.${model_name}>> list = await business.PageListAsync<Model.${model_namespace}.${model_name}>(number, size, sql_where, order, new { xmid, searchstring });

            return RoadFlowCommon.Tools.GetReturnJsonString(true, msg: "查询完成", jObject: JObject.FromObject(list));
        }

        /// <summary>
        /// ${module_name_cn}获取
        /// </summary>
        /// <returns></returns>
        [HttpGet("get")]
        public async Task<string> get()
        {
            string id = Request.Querys("id");

            return RoadFlowCommon.Tools.GetReturnJsonString(true, msg: "查询完成", jObject: JObject.FromObject( await business.get(id)));
        }

        /// <summary>
        /// ${module_name_cn}删除
        /// </summary>
        /// <returns></returns>
        [HttpPost("delete")]
        public async Task<string> delete()
        {
            try
            {
                string id = Request.Forms("id");

                Task<bool> flag = await business.delete(id);
                return RoadFlowCommon.Tools.GetReturnJsonString(await flag, msg: await flag ? "操作成功" : "操作失败，请检查后再试");
            }
            catch (Exception ex)
            {
                return RoadFlowCommon.Tools.GetReturnJsonString(false, msg: ex.Message);
            }
        }

        /// <summary>
        /// ${module_name_cn}保存
        /// </summary>
        /// <returns></returns>
        [HttpPost("save")]
        public async Task<string> save(Model.${model_namespace}.${model_name} dto)
        {
            try
            {
                Task<bool> flag = await business.save(dto);
                return RoadFlowCommon.Tools.GetReturnJsonString(await flag, msg: await flag ? "操作成功" : "操作失败，请检查后再试");
            }
            catch (Exception ex)
            {
                return RoadFlowCommon.Tools.GetReturnJsonString(false, msg: ex.Message);
            }
        }

    }
}