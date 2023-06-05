import { createRouter, createWebHistory } from "vue-router";
// 路由拦截
import { useBeforeEach } from "./intercept";
// 界面白名单 不需要登陆状态可以访问
import whiteListRouter from "./whiteListRouter";
// 动态路由
import useAddRoute from "./addRoute";

const router = createRouter({
    history: createWebHistory(),
    routes: [...new Set(whiteListRouter)],
});

// 动态导航
await useAddRoute(router);
// 导航守卫
useBeforeEach(router);

export default router;
