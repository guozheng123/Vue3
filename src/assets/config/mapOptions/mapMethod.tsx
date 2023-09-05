import type { list } from "./type";

export const getOptionsLabel = (value: string | number, list: list[]) => {
    return list.filter((v) => v.value === value)[0]?.["label"] || "-";
};
