import type { TableProps } from "ant-design-vue";

/**
 * @returns TableProps 表格Ts
 */
export interface GCTableProps extends TableProps {
    isOpenModal?: boolean;
}
