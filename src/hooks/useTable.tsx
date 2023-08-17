import { ref } from "vue";
import { useLoading } from "@/hooks";

export const useTable = ({ api }: { api: any }) => {
    const { loading, setLoading } = useLoading();
    const dataSource = ref<any[]>([]);

    // 获取列表数据
    const getTableList = async () => {
        try {
            setLoading(true);
            const res = await api();
            setTableList(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // 设置列表数据
    const setTableList = (list: any[]) => {
        dataSource.value = [...list];
    };

    getTableList();
    return {
        dataSource,
        loading,
    };
};
