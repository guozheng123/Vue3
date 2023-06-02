export default defineComponent({
    name: "App",
    setup() {
        return () => (
            <a-watermark content={["Ant Design", "Happy Working"]}>
                <router-view />
            </a-watermark>
        );
    },
});
