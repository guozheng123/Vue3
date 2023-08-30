import { unref, ref, computed } from "vue";
import { useLoading } from "@/hooks";
import GCTable from "@/components/GCTable";
import { useTable } from "@/hooks/useTable";
export default defineComponent({
    name: "homeHeader",
    setup() {
        const { loading, setLoading } = useLoading();
        const { dataSource } = useTable({
            api: async () => {
                const { data } = await import("./data.json");
                return data;
            },
        });

        const columns = computed(() => [
            {
                title: "Address",
                dataIndex: "address",
            },
            {
                title: "Name",
                dataIndex: "name",
            },
        ]);
        return () => (
            <>
                <GCTable
                    dataSource={dataSource.value}
                    columns={columns.value}
                    isOpenModal={false}
                />
            </>
        );
    },
});
