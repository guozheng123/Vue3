import style from "./style.less";
import { TABLE } from "./type";
export default defineComponent({
    name: "GCTable",
    style,
    setup() {
        console.log(456);
        onMounted(() => {
            console.log("钩子");
        });
        onBeforeMount(() => {
            console.log("钩子1");
        });
        onBeforeUpdate(() => {
            console.log("钩子2");
        });

        const data = ref<TABLE[]>();

        return () => (
            <div class={"gc-table"}>
                000
                <div class={"box"}>123</div>
            </div>
        );
    },
});
