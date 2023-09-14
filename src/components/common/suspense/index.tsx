import { Suspense } from "vue";

export default defineComponent({
    name: "Suspense",
    setup(_, { slots }) {
        return () => (
            <Suspense
                v-slots={{
                    fallback: () => <a-skeleton active />,
                    default: () => slots.default?.(),
                }}
            ></Suspense>
        );
    },
});
