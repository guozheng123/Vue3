import HomeHeader from "./components/HomeHeader";
import HomeContent from "./components/HomeContent";
import HomeFooter from "./components/HomeFooter";

export default defineComponent({
    name: "home",
    setup() {
        return () => (
            <>
                <HomeHeader />
                <HomeContent />
                <HomeFooter />
            </>
        );
    },
});
