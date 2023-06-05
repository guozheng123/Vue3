// 动态路由
import type { Router } from "vue-router";
export default function useAddRoute(router: Router) {
    return new Promise(async (res, rej) => {
        try {
            const { data } = (await import("./router.json")) as any;
            if (Array.isArray(data)) {
                data.forEach((route) => {
                    route.component = () => import(`@/views/${route.fileName}/index.tsx`);
                    // if ()
                    router.addRoute(route);
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            res(true);
        }
    });
}
