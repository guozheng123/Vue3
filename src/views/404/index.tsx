export default defineComponent({
    name: "404",
    setup() {
        const router = useRouter();
        return () => (
            <a-result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <a-button type="primary" onClick={() => router.push({ name: "home" })}>
                        Back Home
                    </a-button>
                }
            />
        );
    },
});
