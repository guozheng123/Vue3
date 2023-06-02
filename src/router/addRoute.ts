// 动态路由
import type { Router } from "vue-router";
export default async function useAddRoute(router: Router) {
    try {
        const data = await import("./router.json");
        if (Array.isArray(data)) {
            data.forEach((item) => {
                item.components = () => import(`@/view${item.path}`);
                router.addRoute(item);
            });
        }
    } catch (error) {
        console.log(error);
    } finally {
        router.addRoute({ path: "/:catchAll(.*)", redirect: "/404" });
    }
}
