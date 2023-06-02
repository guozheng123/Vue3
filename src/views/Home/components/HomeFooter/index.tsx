export default defineComponent({
    name: "homeFooter",
    setup() {
        return () => (
            <a-result
                title="Your operation has been executed"
                extra={
                    <a-button type="primary" key="console">
                        Go Console
                    </a-button>
                }
            />
        );
    },
});
