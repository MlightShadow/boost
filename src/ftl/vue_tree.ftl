<template>
    <table
        cellpadding="0"
        cellspacing="0"
        class="roadui_table"
        style="height:inherit"
    >
        <tr style="height:inherit">
            <td
                :class="{ widht0: iconState == false }"
                style="width:300px; vertical-align:top;height:inherit;position:relative"
            >
                <CommonTree @nodeClick="nodeClick" />
            </td>
            <td style=" vertical-align:top; padding-left:18px; height:inherit;">
                <div
                    style="border-radius: 5px; height:inherit; overflow:auto;"
                    class="contentbg"
                >
                    <component
                        ref="userbody"
                        :is="page"
                        :query="query_str"
                    ></component>
                </div>
            </td>
        </tr>
    </table>
</template>

<script>
import OrgEmpty from "@/roadui-pages/crm/empty";
import List from "./index";
import CommonTree from "@/components/common_tree";
export default {
    components: { OrgEmpty, List, CommonTree },
    props: {
        query: { type: String, default: "" },
    },
    data() {
        return {
            iconState: true,
            dimension: 0,
            showDimension: true,
            programId: this.roadui.query("programid", this.query),
            menuId: this.roadui.query("menuid", this.query),
            treeData: [],
            page: "OrgEmpty", //右边窗口显示的页面
            searchKeyword: "", //查询关键字
            showType: 0, //显示类型0组织架构 1工作组
            query_str: "", //带到子组件的参数
            searchButton: false, //查询按钮是否禁用
            loading: true, //加载中状态
            width1: 380, //选项宽度
            isproject: 0,
        };
    },
    mounted: function() {
        this.isproject = this.roadui.query("isproject", this.query);
    },
    methods: {
        nodeClick(node) {
            //设置当前节点样式
            this.roadui.setArrayAttValue(this.treeData, "current", false);
            node.current = true;

            this.query_str = this.roadui.queryMaker({
                orgid: node.id,
                orgname: encodeURI(node.title),
                parentid: node.parentId,
                programId: this.programId,
                menuid: this.menuId,
                isproject: this.isproject,
                type: node.type,
            });

            this.page = "List";
        },
    },
};
</script>