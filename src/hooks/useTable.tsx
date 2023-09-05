import { ref, unref, reactive } from "vue";
import { useLoading } from "@/hooks";
import type { PaginationProps, TableProps, TableColumnType } from "ant-design-vue";
export const useTable = ({ api, isPagination = false, isMultipleSelection = false }: any) => {
    type Key = string | number;
    type SelectedInfoType = { selectedRowKeys: Key[]; selectedRows: any[] };

    const { loading, setLoading } = useLoading();
    const dataSource = ref<any[]>([]);
    const selectedInfo = ref<SelectedInfoType>({
        selectedRowKeys: [],
        selectedRows: [],
    });
    const selectedRowKeys = ref<any[]>([]);
    // 分页配置
    const pagination = ref<PaginationProps>({
        total: 0,
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total) => `共 ${total} 条`,
        onChange: (current, pageSize) => {
            if (unref(pagination).pageSize !== pageSize) current = 1;
            setPagination({ current, pageSize });
            getTableList();
        },
    });

    // 多选
    const rowSelection = ref<TableProps["rowSelection"]>({
        selectedRowKeys: unref(selectedRowKeys),
        onChange: (selectedRowKey: Key[], selectedRows: any[]) => {
            selectedInfo.value.selectedRowKeys = selectedRowKey;
        },
        getCheckboxProps: (record: any) => ({
            disabled: record.status === 0, // Column configuration not to be checked
        }),
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
        const { list = [], total = 0 } = data;
        setTableList(list);
        isPagination && setPagination({ total });
    };

    // 设置表格详情信息
    const setPagination = (info: any) => {
        pagination.value = { ...unref(pagination), ...info };
    };

    // 设置列表数据
    const setTableList = (list: any[]) => {
        dataSource.value = [...list];
    };

    // 抛出 所有内置集合
    const allTableAttrs = computed(() => ({
        pagination: unref(getPagination),
        dataSource: unref(dataSource),
        [isMultipleSelection && "rowSelection"]: isMultipleSelection && unref(rowSelection),
    }));

    // 获取 分页
    const getPagination = computed(
        () => (isPagination ? unref(pagination) : false) as PaginationProps
    );

    getTableList();

    return {
        dataSource,
        loading,
        pagination,
        allTableAttrs,
    };
};
