import { ref, unref, reactive } from "vue";
import { useLoading } from "@/hooks";
import type { PaginationProps, TableProps, TableColumnType } from "ant-design-vue";
export const useTable = ({
    api,
    rowKey = "key",
    type = "checkbox",
    isPagination = true,
    isSavePageKeys = false,
    isMultipleSelection = false,
}: {
    api: Function;
    type?: string;
    rowKey?: string | Function;
    isPagination?: boolean;
    isSavePageKeys?: boolean;
    isMultipleSelection?: boolean | any;
}) => {
    type Key = string | number;
    type Row = { [key: string]: any };
    type SelectedInfoType = {
        selectedRowKeys: Key[];
        selectedRows: Row[];
    };

    const { loading, setLoading } = useLoading();
    const dataSource = ref<Row[]>([]);
    const selectedInfo = ref<SelectedInfoType>({
        selectedRowKeys: [],
        selectedRows: [],
    });

    // 分页配置
    const pagination = ref<PaginationProps>({
        total: 0,
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total) => `共 ${total} 条`,
        onChange: (c, p) => {
            const { pageSize } = unref(pagination);
            if (pageSize !== p) c = 1;
            setPagination({ current: c, pageSize: p });
            getTableList();
        },
    });

    // 多选
    const rowSelection = computed(
        () =>
            ({
                selectedRowKeys: unref(selectedInfo).selectedRowKeys,
                onSelect: (record, selected) => {
                    setSelectedInfo(selected, [record]);
                },
                onSelectAll: (selected, selectedRowsAll, changeRows) => {
                    setSelectedInfo(selected, changeRows);
                },
                type,
            } as TableProps["rowSelection"])
    );

    // 设置多选信息
    const setSelectedInfo = (selected: boolean, selectedRowsAll: Row[]) => {
        const key = unref(getRowKey);
        const { selectedRowKeys, selectedRows } = unref(selectedInfo);
        let keysList: Key[] = selectedRowKeys.slice();
        let rowList: Row[] = selectedRows.slice();
        selectedRowsAll = selectedRowsAll.filter((o) => o);
        if (type === "checkbox") {
            selectedRowsAll.forEach((item) => {
                if (selected) {
                    if (!selectedRowKeys.includes(item[key])) {
                        keysList.push(item[key]);
                        rowList.push(item);
                    }
                } else {
                    keysList = keysList.filter((v) => v !== item[key]);
                    rowList = rowList.filter((v) => v[key] !== item[key]);
                }
            });
        } else {
            keysList = selectedRowsAll.map((v) => v[key]);
            rowList = [...selectedRowsAll];
        }
        selectedInfo.value = {
            selectedRows: rowList,
            selectedRowKeys: keysList,
        };
    };

    // 获取列表数据
    const getTableList = async () => {
        try {
            setLoading(true);
            setResetTableInfo();
            const res = await api(unref(getParam));
            setTableInfo(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // 重置
    const setResetTableInfo = () => {
        setIsSavePageInfo();
    };

    // 设置 是否保存翻页的 多选信息
    const setIsSavePageInfo = () => {
        if (!isSavePageKeys) {
            selectedInfo.value = {
                selectedRowKeys: [],
                selectedRows: [],
            };
        }
    };

    // 默认选中
    const setSelectedKeys = (keysList: Key[]) => {
        selectedInfo.value.selectedRowKeys = keysList;
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

    // 获取列表参数
    const getParam = computed(() => ({
        pagination: unref(pagination),
    }));

    // 抛出 所有内置集合
    const allTableAttrs = computed(() => ({
        loading: unref(loading),
        pagination: unref(getPagination),
        dataSource: unref(dataSource),
        [isMultipleSelection && "rowSelection"]: isMultipleSelection && unref(rowSelection),
    }));

    // 获取 分页
    const getPagination = computed(
        () => (isPagination ? unref(pagination) : false) as PaginationProps
    );

    // 获取 表格唯一 key
    const getRowKey = computed(() => (typeof rowKey === "function" ? rowKey() : rowKey) as string);

    getTableList();

    return {
        dataSource,
        loading,
        pagination,
        allTableAttrs,
        selectedInfo,
        setSelectedKeys,
    };
};
