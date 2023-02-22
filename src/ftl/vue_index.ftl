<template>
    <div class="roadui_contentdiv">
        <!--menu-->
        <div id="toolbar"></div>
        <!--search-->
        <div class="search-area" style="padding:15px 11px;">
            <el-row class="search-row">
                <#list record as r >
                <#list search_column as sc>
                <#if r.columnname == sc>
                <#if r.datatype == "date">
                <el-col :span="8">
                    <span>${r.description}：</span>
                    <el-date-picker
                        v-model="querydata.${r.columnname}"
                        type="date"
                        format="yyyy-MM-dd"
                        placeholder="${r.description}"
                    >
                    </el-date-picker>
                </el-col>
                <#else>
                <el-col :span="8">
                    ${r.description}：<roadui-text
                        style="width:200px;"
                        v-model="querydata.${r.columnname}"
                    ></roadui-text>
                </el-col>
                </#if>
                </#if>
                </#list>
                </#list>
            </el-row>
            <div class="search-btnbox">
                <roadui-button @click.native="loadData()">查询</roadui-button>
            </div>
        </div>
        <!--tables-->
        <el-table
            :data="table"
            v-loading="loading"
            border
            highlight-current-row
            @current-change="handleSelectChange"
            :default-sort="{ prop: 'Name', order: 'ascending' }"
            @sort-change="handleSortChange"
            style="width: 100%"
            :height="tableHeight"
        >
            <el-table-column
                v-for="(item, index) in cols"
                :sortable="item.sortable ? 'custom' : false"
                :key="index"
                :label="item.label"
                :prop="item.prop"
                :width="item.width"
            >
                <template #default="scope">
                    <div v-if="item.type == 'status'">
                        {{ FStatus[scope.row[item.prop]] }}
                    </div>
                    <div v-else-if="item.type == 'repository'">
                        {{ Repository[scope.row[item.prop]] }}
                    </div>
                    <span v-else>{{ scope.row[item.prop] }}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="size"
            :page-sizes="[12, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalpage"
        >
        </el-pagination>

        <roadui-layer
            v-if="layerShow"
            :title="layerTitle"
            @remove="close"
            :url="layerUrl"
            :width="layerWidth"
            :height="layerHeight"
        ></roadui-layer>
    </div>
</template>
<!-- script part-->
<script>
import Vue from "vue";
export default {
    props: {
        query: { type: String, default: "" },
    },
    data() {
        return {
            //prama && system
            toolbar: "",
            formComponentId: "roadflow_programe_" + this.roadui.newGuid(false), //表单注册组件id
            programId: this.roadui.query("programid", this.query),
            menuId: this.roadui.query("menuid", this.query),
            orgid: this.roadui.query("orgid", this.query), //组织id
            orgname: this.roadui.query("orgname", this.query), //组织名称
            parentid: this.roadui.query("parentid", this.query),

            // layer
            layerShow: false,
            layerTitle: "",
            layerUrl: "",
            layerWidth: document.body.clientWidth - 200,
            layerHeight: document.body.clientHeight - 100,

            // query
            querydata: {}, //查询参数
            size: this.roadui.getPageSize(),
            number: 1,
            order: "", //排序
            buttonDisabled: false, //查询按钮状态
            loading: false,

            // table
            tableHeight: document.body.clientHeight - 286,
            totalpage: 0,
            table: [],
            cols: [
                <#list record as r >
                {
                    prop: "${r.columnname}",
                    label: "${r.description}",
                    width: "auto",
                    type: "${r.datatype}",
                    sortable: true,
                },
                </#list>
            ],
            multipleSelection: [],
            selectRows: "", //保存选择的行ID
            selectKey: "",
        };
    },
    mounted: function() {
        this.loadButton();
        this.loadData();
    },
    watch: {
        query: function(val) {
            this.orgid = this.roadui.query("orgid", val);
            this.orgname = this.roadui.query("orgname", val);
            this.parentid = this.roadui.query("parentid", val);
            this.programId = this.roadui.query("programid", val);
            this.menuId = this.roadui.query("menuid", val);
            this.loadData();
        },
    },
    methods: {
        loadButton() {
            this.ajax
                .get(
                    "/Menu/GetButtonHtml?userId=" +
                        this.roadui.getUserId() +
                        "&menuId=" +
                        this.menuId
                )
                .then((data) => {
                    this.toolbar = data[0];
                    let that = this;
                    let MyComponent = Vue.extend({
                        template:
                            '<div class="roadui_toolbar" id="toolbarChild">' +
                            data[0] +
                            "</div>",
                        methods: {
                            <#if has_print>
                            print() {
                                if (!that.selectKey) {
                                    this.$message({
                                        message: "请先选择一条数据！",
                                        type: "warning",
                                    });
                                    return;
                                }

                                window.open(
                                    `http://www.szcgwx.com/SZprint/ReportView.aspx?type=qtrkd&names=number&values=${r'${that.selectKey}'}`
                                );
                            },
                            </#if>
                            add() {
                                that.layerTitle = "添加";
                                that.layerUrl =
                                    "${page_root}/form" +
                                    that.roadui.queryMaker({
                                        orgid: that.orgid,
                                        orgname: that.orgname,
                                        parentid: that.parentid,
                                        type: "add",
                                    });
                                that.layerShow = true;
                            },
                            edit() {
                                if (!that.selectKey) {
                                    this.$message({
                                        message: "请先选择一条数据！",
                                        type: "warning",
                                    });
                                    return;
                                }
                                if (that.selectRow.Status != "0") {
                                    this.$message({
                                        message: "只有编辑状态允许编辑！",
                                        type: "warning",
                                    });
                                    return;
                                }

                                that.layerTitle = "编辑";
                                that.layerUrl =
                                    "${page_root}/form" +
                                    that.roadui.queryMaker({
                                        orgid: that.orgid,
                                        orgname: that.orgname,
                                        parentid: that.parentid,
                                        id: that.selectKey,
                                        type: "edit",
                                    });

                                that.layerShow = true;
                            },
                            view() {
                                if (!that.selectKey) {
                                    this.$message({
                                        message: "请先选择一条数据！",
                                        type: "warning",
                                    });
                                    return;
                                }

                                that.layerTitle = "查看";

                                that.layerUrl =
                                    "${page_root}/form" +
                                    that.roadui.queryMaker({
                                        orgid: that.orgid,
                                        orgname: that.orgname,
                                        parentid: that.parentid,
                                        id: that.selectKey,
                                        type: "view",
                                    });
                                that.layerShow = true;

                            },
                            del() {
                                if (!that.selectKey) {
                                    this.$message({
                                        message: "请先选择一条数据！",
                                        type: "warning",
                                    });
                                    return;
                                }
                                if (that.selectRow.Status != "0") {
                                    this.$message({
                                        message: "只有编辑状态允许删除！",
                                        type: "warning",
                                    });
                                    return;
                                }
                                if (!confirm("您确定要删除吗？")) {
                                    return;
                                }

                                this.ajax
                                    .post(
                                        "/MaterialCost/api/${api_root}/delete",
                                        this.qs.stringify({
                                            djbh: that.selectKey,
                                        })
                                    )
                                    .then((data) => {
                                        alert(data.msg);
                                        if (data.success) {
                                            that.loadData();
                                        }
                                    });
                            },
                            <#if has_submit>
                            submit() {
                                if (!that.selectKey) {
                                    this.$message({
                                        message: "请先选择一条数据！",
                                        type: "warning",
                                    });
                                    return;
                                }
                                if (that.selectRow.Status != "0") {
                                    this.$message({
                                        message: "只有编辑状态允许提交流程！",
                                        type: "warning",
                                    });
                                    return;
                                }
                                let flowid = "";
                                let json = {
                                    id: "flowtask_" + that.selectKey,
                                    title: "流程提交",
                                    url:
                                        "/flow/run/index?flowid=" + flowid +
                                        "&instanceid=" +
                                        that.selectKey,
                                };

                                that.$parent.$parent.$parent.openMenu({
                                    id: json.id,
                                    title: json.title,
                                    ico: "",
                                    url: json.url,
                                    openMode: 0,
                                    current: true,
                                });
                            },
                            </#if>
                        },
                    });

                    let component = new MyComponent().$mount();
                    let toolbarChild = document.getElementById("toolbarChild");
                    if (toolbarChild) {
                        document
                            .getElementById("toolbar")
                            .removeChild(toolbarChild);
                    }
                    document
                        .getElementById("toolbar")
                        .appendChild(component.$el);
                });
        },
        loadData() {
            this.buttonDisabled = true;
            this.querydata.size = this.size;
            this.querydata.number = this.number;
            this.querydata.order = this.order;
            this.loading = true;
            //列表
            this.ajax
                .get(
                    "/MaterialCost/api/${api_root}/list",
                    this.qs.stringify(this.querydata)
                )
                .then((data) => {
                    this.loading = false;
                    this.table = [];
                    this.table.push(...data.data.rows);
                    this.totalpage = data.data.total;
                    this.loading = false;
                    this.buttonDisabled = false;
                })
                .catch(() => {
                    this.loading = false;
                });
        },
        close() {
            this.layerShow = false;
            this.loadData();
        },

        // 单选
        handleSelectChange(val) {
            this.selectRow = val;
            this.selectKey = val.ID;
        },
        // 排序
        handleSortChange(val) {
            console.log(val);
            let order = val.order == "ascending" ? "asc" : "desc";
            this.order = val.prop + " " + order;
            this.loadData();
        },
        // 改变每页加载条数
        handleSizeChange(val) {
            this.size = val;
            this.loadData();
        },
        // 跳转页面
        handleCurrentChange(val) {
            this.number = val;
            this.loadData();
        },
    },
};
</script>
<!--css-->
<style>
#toolbarChild .roadui_button {
    color: #000;
}

.roadui_toolbar button:hover {
    color: #fff !important;
}

.search-btnbox {
    text-align: left;
    min-width: 80px;
}

.yellow {
    background-color: yellow;
}

.red {
    background-color: orangered;
}

.green {
    background-color: lawngreen;
}
</style>
<style scoped>
.roadui_popuplayercontent {
    overflow: hidden;
}
</style>