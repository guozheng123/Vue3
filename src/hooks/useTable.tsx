import { ref } from "vue";
import { useLoading } from "@/hooks";

export const useTable = ({ api }: { api: any }) => {
    const { loading, setLoading } = useLoading();
    const dataSource = ref<any[]>([]);
    const pagination = ref({
        total: 0,
        current: 1,
        pageSize: 5,
    });

    // 获取列表数据
    const getTableList = async () => {
        try {
            setLoading(true);
            const res = await api();
            setTableInfo(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // 设置表格详情信息
    const setTableInfo = (data: any) => {
        const { list = [], total = 0, pageSize = 5 } = data;
        setTableList(list);
    };

    // 设置列表数据
    const setTableList = (list: any[]) => {
        dataSource.value = [...list];
    };

    getTableList();
    return {
        dataSource,
        loading,
        pagination,
    };
};
