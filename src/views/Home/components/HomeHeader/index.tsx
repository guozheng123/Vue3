import { unref, ref } from "vue";
import { useLoading } from "@/hooks";

export default defineComponent({
    name: "homeHeader",
    setup() {
        const { loading, setLoading } = useLoading();
        const a = ref(10);
        return () => (
            <>
                <a-button type="primary" onClick={() => setLoading(true)}>
                    Primary Button
                </a-button>
                <a-switch v-model:checked={loading.value} />
            </>
        );
    },
});
