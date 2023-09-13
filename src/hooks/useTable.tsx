import { ref, unref, reactive } from "vue";
import { useLoading } from "@/hooks";
import type { PaginationProps, TableProps, TableColumnType } from "ant-design-vue";
export const useTable = ({
    api,
    isPagination = true,
    isSavePageKeys = false,
    isMultipleSelection = false,
    type = "checkbox",
}: {
    api: Function;
    isPagination?: boolean;
    isSavePageKeys?: boolean;
    isMultipleSelection?: boolean | any;
    type?: string;
}) => {
    type Key = string | number;
    type Row = { [key: string]: any };
    type SelectedInfoType = {
        selectedRowKeys: Key[];
        selectedRows: Row[];
        saveSelectedRowKeys: Row;
        saveSelectedRows: Row;
        current: number;
    };

    const { loading, setLoading } = useLoading();
    const dataSource = ref<Row[]>([]);
    const selectedInfo = ref<SelectedInfoType>({
        selectedRowKeys: [],
        selectedRows: [],
        saveSelectedRowKeys: {},
        saveSelectedRows: {},
        current: 1,
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
            const { pageSize, current } = unref(pagination);
            if (pageSize !== p) c = 1;
            if (isSavePageKeys) setSelectedInfo({ key: "current", value: current });
            setPagination({ current: c, pageSize: p });
            getTableList();
        },
    });

    // 多选
    const rowSelection = computed(
        () =>
            ({
                selectedRowKeys: unref(selectedInfo).selectedRowKeys,
                onChange: (selectedRowKeys: Key[], selectedRows: Row[]) => {
                    const { saveSelectedRowKeys, saveSelectedRows, current } = unref(selectedInfo);
                    selectedInfo.value = {
                        selectedRowKeys,
                        selectedRows,
                        saveSelectedRowKeys,
                        saveSelectedRows,
                        current,
                    };
                },
                onSelect: (a, b) => {
                    // console.log(a, b, 78);
                },
                type,
            } as TableProps["rowSelection"])
    );

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

    // 设置多选信息
    const setSelectedInfo = ({ info = {}, key = "", value = "" }: Row) => {
        selectedInfo.value = { ...unref(selectedInfo), ...info, [key]: value };
    };

    // 设置 是否保存翻页的 多选信息
    const setIsSavePageInfo = () => {
        const { saveSelectedRowKeys, saveSelectedRows, selectedRowKeys, selectedRows, current } =
            unref(selectedInfo);
        let info: SelectedInfoType | null = null;
        if (!isSavePageKeys) {
            info = {
                selectedRowKeys: [],
                selectedRows: [],
                saveSelectedRowKeys: [],
                saveSelectedRows: [],
                current,
            };
        } else {
            info = {
                saveSelectedRowKeys: {
                    ...saveSelectedRowKeys,
                    [current as Key]: selectedRowKeys,
                },
                saveSelectedRows: {},
                selectedRowKeys: [...(saveSelectedRowKeys[unref(pagination).current as Key] || [])],
                selectedRows: [],
                current,
            };
        }
        setSelectedInfo({ info });
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

    // 获取 选中的keys值
    const getSelectedInfo = computed(() => {
        const { selectedRowKeys, saveSelectedRowKeys } = unref(selectedInfo);
        let keysList: Key[] = [];
        Object.keys(saveSelectedRowKeys).forEach((key) => {
            keysList = [...saveSelectedRowKeys[key]];
        });
        return {
            selectedKeysList: [...keysList, ...selectedRowKeys],
            selectedInfoList: [],
        };
    });

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

    getTableList();

    return {
        dataSource,
        loading,
        pagination,
        allTableAttrs,
        getSelectedInfo,
        setSelectedKeys,
    };
};
