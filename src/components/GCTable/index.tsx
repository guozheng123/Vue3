import style from "./style.less?inline";
import { GCTableProps } from "./type";
import { useAttrs } from "vue";

export default defineComponent({
    name: "GCTable",
    style,
    setup(props: GCTableProps) {
        const attrs: GCTableProps = useAttrs();
        return () => (
            <>
                <a-table {...attrs} />
            </>
        );
    },
});
