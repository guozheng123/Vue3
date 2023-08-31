import { unref, ref, computed } from "vue";
import { useLoading } from "@/hooks";
import GCTable from "@/components/GCTable";
import { useTable } from "@/hooks/useTable";
import { TableColumnType } from "ant-design-vue";
export default defineComponent({
    name: "homeHeader",
    setup() {
        const { setLoading } = useLoading();
        const { dataSource, loading, pagination, allTableAttrs } = useTable({
            api: async () => {
                const { data } = await import("./data.json");
                return data;
            },
            isUsePagination: true,
        });

        const columns = computed(
            () =>
                [
                    {
                        title: "Address",
                        dataIndex: "address",
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                    },
                    {
                        title: "Type",
                        dataIndex: "status",
                        customRender: ({ value }) => (value ? "开始" : "关闭"),
                    },
                ] as TableColumnType[]
        );

        return () => (
            <>
                <GCTable {...allTableAttrs.value} columns={unref(columns)} />
            </>
        );
    },
});
