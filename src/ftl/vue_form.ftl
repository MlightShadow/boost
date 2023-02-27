<template>
    <div class="bssajgzd-form" style="padding:20px 20px 40px;">
        <div id="toolbar">
            <div
                class="roadui_toolbar"
                id="toolbarChild"
                style="background:#fff;border:none;color:#000;"
            >
                <roadui-button
                    style="margin-left:8px;"
                    :disabled="saveDisabled"
                    @click.native="save()"
                    ico="icon-content-save"
                    :status="btnaddstatus"
                    >保存</roadui-button
                >
            </div>
        </div>
        <div
            style="font-size: 30px; text-align: center; margin: 15px 0; font-weight: bold; color: #409EFF;"
        ></div>
        <el-form ref="mainForm" :model="form" label-width="170px">
            <el-row>
                <#list record as r >
                <el-col :span="8">
                    <el-form-item
                        label="${r.description}："
                        prop="${r.columnname}"
                        :rules="[
                            {
                                required: true,
                                message: '不能为空',
                                trigger: 'change',
                            },
                        ]"
                    >
                        <#if r.datatype == "date">
                        <el-date-picker
                            v-model="form.${r.columnname}"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                        >
                        </el-date-picker>
                        <#else>
                        <el-input
                            v-model="form.${r.columnname}"
                            :disabled="btnspstatus == 1"
                        ></el-input>
                        </#if>
                    </el-form-item>
                </el-col>
                </#list>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import Vue from "vue";
export default {
    props: {
        query: { type: String, default: "" },
    },
    data() {
        return {
            btnspstatus: 0,
            btnaddstatus: 0,

            orgname: decodeURI(this.roadui.query("orgname", this.query)),
            orgid: this.roadui.query("orgid", this.query),
            parentid: this.roadui.query("parentid", this.query),
            type: this.roadui.query("type", this.query),

            id: "",
            form: {},
        };
    },
    mounted: function() {
        this.type = this.roadui.query("type", this.query);
        this.orgid = this.roadui.query("orgid", this.query);
        this.orgname = this.roadui.query("orgname", this.query);
        this.parentid = this.roadui.query("parentid", this.query);
        this.id = this.roadui.query("id", this.query);

        if (this.id == "") {
            this.id = this.roadui.query(
                "instanceid",
                this.$parent.$parent.query
            );
            if (this.id != "") {
                this.btnaddstatus = 2;
                this.btnspstatus = 1;
            } else {
                this.init();
            }
        }
        else if (this.type == "view") {
            this.btnaddstatus = 2;
            this.btnspstatus = 1;
        }

        this.load();
    },
    methods: {
        init() {
        },
        load() {
            if (this.id) {
                this.ajax
                    .get(
                        "/MaterialCost/api/${api_root}/get" +
                        this.roadui.queryMaker({id: this.id})
                    )
                    .then((data) => {
                        this.$message({
                                message: data.msg,
                                type: data.success ? "success" : "warning",
                            });
                        this.form = data.data;
                        //this.tableData.push(...data.list);
                    });
            }
        },
        // 提交数据
        save() {
            // console.log(this.$refs.tableeditsued.tableData);
            this.$refs.mainForm.validate((valid) => {
                if (valid) {
                    this.saveDisabled = true;
                    // this.form.createusername = this.roadui.getUserName();
                    // this.form.createuserid = this.roadui.getUserId();

                    console.log(this.tableData);
                    console.log(this.form);

                    this.ajax
                        .post("/MaterialCost/api/${api_root}/save", this.form)
                        .then((data) => {
                            this.$message({
                                message: data.msg,
                                type: data.success ? "success" : "warning",
                            });
                            if (data.success) {
                                this.$parent.$emit("remove");
                            }
                            this.saveDisabled = false;
                        })
                        .catch(() => {
                            this.saveDisabled = false;
                        });

                    return;
                } else {
                    console.log("error submit!!");
                    this.saveDisabled = false;
                    return false;
                }
            });
        },
    },
};
</script>
<style>
.bssajgzd-form .flex-item {
    display: flex;
    align-items: center;
}

.bssajgzd-form .el-select,
.bssajgzd-form .el-date-editor.el-input,
.bssajgzd-form .el-date-editor.el-input__inner,
.bssajgzd-form .roadui_combox {
    width: 100% !important;
}

.bssajgzd-form .el-form-item__content {
    width: 240px;
    height: 40px;
}

.bssajgzd-form .full-box .el-form-item__content {
    width: calc(100% - 170px);
}

.roadui_selectdiv:hover {
    box-shadow: none;
}

.bssajgzd-form .sub-title {
    font-size: 16px;
    font-weight: bold;
    margin: 40px 0 20px;
}
</style>