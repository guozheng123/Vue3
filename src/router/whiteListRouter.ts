// 路由白名单
import { RouteRecordRaw } from "vue-router";
const whiteListRouter: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: (to) => {
            return {
                path: "/home",
            };
        },
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: "登录",
        },
        component: () => import("@/views/Login"),
    },
    {
        path: "/404",
        name: "404",
        meta: {
            title: "404",
        },
        component: () => import("@/views/404"),
    },
    {
        path: "/home",
        name: "home",
        meta: {
            title: "主页",
        },
        component: () => import("@/views/Home"),
    },
    { path: "/:catchAll(.*)", redirect: "/404" },
];

export default whiteListRouter;
