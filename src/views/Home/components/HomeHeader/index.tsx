import { unref, ref, computed } from "vue";
import { useLoading } from "@/hooks";
import GCTable from "@/components/GCTable";
import { useTable } from "@/hooks/useTable";
export default defineComponent({
    name: "homeHeader",
    setup() {
        const { loading, setLoading } = useLoading();
        const { dataSource } = useTable({
            api: () => {
                return [
                    {
                        key: 1,
                        name: `Edward King`,
                        age: 32,
                        address: `London, Park Lane no. `,
                    },
                ];
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
                <GCTable dataSource={dataSource.value} columns={columns.value} />
            </>
        );
    },
});
