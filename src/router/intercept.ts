// 路由拦截
import type { Router } from "vue-router";
const useBeforeEach = (router: Router) => {
    router.beforeEach((to, from, next) => {
        console.log(to);
        next();
    });
};

export { useBeforeEach };
