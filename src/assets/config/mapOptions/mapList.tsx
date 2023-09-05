import type { list } from "./type";

const StatusTypeList: list[] = [
    {
        value: 0,
        label: "开始",
    },
    {
        value: 1,
        label: "结束",
    },
];

const StatusNumberList: list[] = [
    {
        value: 0,
        label: "关闭",
    },
    {
        value: 1,
        label: "打开",
    },
];

export const useGetMapList = () => ({
    StatusNumberList,
    StatusTypeList,
});
