import style from "./style.less?inline";
import { GCTableProps } from "./type";
import { toRefs, useAttrs } from "vue";

export default defineComponent({
    name: "GCTable",
    style,
    setup(props: GCTableProps) {
        const attrs: GCTableProps = useAttrs();
        console.log(attrs, 99);
        return () => (
            <>
                <a-table {...attrs} />
            </>
        );
    },
});
