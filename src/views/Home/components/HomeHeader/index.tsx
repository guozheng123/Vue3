import { unref, ref, defineAsyncComponent } from "vue";
import { TableColumnType } from "ant-design-vue";
import { useTable } from "@/hooks/useTable";
import { useLoading } from "@/hooks";
import { typeValidation } from "@/utils/toolClass";
import { Suspense } from "@/components/common";
import { useGetMapList, getOptionsLabel } from "@/assets/config/mapOptions";
export default defineComponent({
    name: "homeHeader",
    setup() {
        const GCTable = defineAsyncComponent(() => import("@/components/GCTable"));
        const { setLoading } = useLoading();
        const { StatusTypeList } = useGetMapList();
        const { dataSource, loading, pagination, allTableAttrs, setSelectedKeys, selectedInfo } =
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
                        }, 500);
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
            console.log(typeValidation("string", undefined));
        };
        onMounted(() => {
            // setSelectedKeys([0, 1, 11]);
        });
        const slots = {
            default: () => <GCTable {...allTableAttrs.value} columns={unref(columns)} />,
        };
        return () => <Suspense v-slots={slots}></Suspense>;
    },
});
