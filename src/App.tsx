import GCTable from "@/components/GCTable";
import GCHeader from "@/components/GCHeader";
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
