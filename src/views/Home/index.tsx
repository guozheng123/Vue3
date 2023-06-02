export default defineComponent({
    name: "home",
    setup() {
        return () => (
            <div>
                <router-view name="HomeHeader"></router-view>
                <router-view name="HomeContent"></router-view>
                <router-view name="HomeFooter"></router-view>
            </div>
        );
    },
});
