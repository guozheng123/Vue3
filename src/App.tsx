import { Watermark } from "ant-design-vue";
import { providerConfig } from "@/assets/global";
export default defineComponent({
    name: "App",
    setup() {
        return () => (
            <a-config-provider {...providerConfig}>
                <Watermark content="Ant Design" class="watermark">
                    <router-view />
                </Watermark>
            </a-config-provider>
        );
    },
});
