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
        const { dataSource, loading, pagination, allTableAttrs, setSelectedKeys, getSelectedInfo } =
            useTable({
                api: async ({ pagination }: any) => {
                    return await new Promise((res, rej) => {
                        const { current = 1, pageSize = 10 } = unref(pagination);
                        setTimeout(() => {
                            let list = Array(pageSize)
                                .fill(0)
                                .map((v, index) => ({
                                    key: (current - 1) * pageSize + index,
                                    name: (current - 1) * pageSize + index + "Edward King",
                                    age: (current - 1) * pageSize + index,
                                    address: `HUA WEI 60 Pro 遥遥领先`,
                                    status: index % 2 === 0 ? 1 : 0,
                                }));
                            res({
                                total: 1000,
                                list,
                                pageSize,
                                current,
                            });
                        }, 2000);
                    });
                },
                isSavePageKeys: true,
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

        const onGetInfo = () => {
            console.log(unref(getSelectedInfo));
        };
        onMounted(() => {
            setSelectedKeys([0, 1, 11]);
        });
        return () => (
            <>
                {unref(getSelectedInfo).selectedKeysList.length}
                <a-button onClick={onGetInfo}>获取</a-button>
                <GCTable {...allTableAttrs.value} columns={unref(columns)} />
            </>
        );
    },
});
