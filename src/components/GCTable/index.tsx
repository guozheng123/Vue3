import style from "./style.less";
import { TABLE, PropsDetails } from "./type";
import { toRefs } from "vue";
export default defineComponent({
    name: "GCTable",
    style,
    props: {
        columns: {
            type: Array,
            default: [],
        },
        dataSource: {
            type: Array,
            default: [],
        },
    },
    setup(props: PropsDetails) {
        const { columns, dataSource } = toRefs(props);
        console.log(columns, dataSource, 99);
        return () => (
            <>
                <a-table columns={columns.value} dataSource={dataSource.value} />
            </>
        );
    },
});
