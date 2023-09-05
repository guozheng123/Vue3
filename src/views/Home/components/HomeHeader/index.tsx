import { unref, ref, computed } from "vue";
import { TableColumnType } from "ant-design-vue";
import GCTable from "@/components/GCTable";
import { useTable } from "@/hooks/useTable";
import { useLoading } from "@/hooks";
import { useGetMapList, getOptionsLabel } from "@/assets/config/mapOptions";
export default defineComponent({
    name: "homeHeader",
    setup() {
        const { setLoading } = useLoading();
        const { StatusTypeList } = useGetMapList();
        const { dataSource, loading, pagination, allTableAttrs } = useTable({
            api: async () => {
                const { data } = await import("./data.json");
                return data;
            },
            isPagination: true,
            isMultipleSelection: true,
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
                        customRender: ({ value }) => getOptionsLabel(value, StatusTypeList),
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
