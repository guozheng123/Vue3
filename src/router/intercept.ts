// 路由拦截
import type { Router } from "vue-router";
const useBeforeEach = (router: Router) => {
    router.beforeEach((to, from, next) => {
        document.title = to.meta.title as string;
        next();
    });
};

export { useBeforeEach };
