import GCHeader from "@/components/GCHeader";
import GCTable from "@/components/GCTable";
export default defineComponent({
    name: "App",
    setup() {
        const title = ref("信息");
        return () => (
            <div>
                <div>{unref(title)}</div>
                <a-button>按钮</a-button>
                <GCHeader></GCHeader>
                <GCTable />
            </div>
        );
    },
});
