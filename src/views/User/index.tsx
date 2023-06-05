export default defineComponent({
    name: "user",
    setup() {
        const description = "This is a description.";
        return () => (
            <a-steps
                direction="vertical"
                size="small"
                current={1}
                items={[
                    { title: "Finished", description },
                    {
                        title: "In Progress",
                        description,
                    },
                    {
                        title: "Waiting",
                        description,
                    },
                ]}
            />
        );
    },
});
