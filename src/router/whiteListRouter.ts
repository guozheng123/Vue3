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
        component: () => import("@/views/Login"),
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/404"),
    },
    {
        path: "/home",
        name: "home",
        component: () => import("@/views/Home"),
        children: [
            {
                path: "detail",
                components: {
                    HomeHeader: () => import("@/views/Home/components/HomeHeader"),
                    HomeContent: () => import("@/views/Home/components/HomeContent"),
                    HomeFooter: () => import("@/views/Home/components/HomeFooter"),
                },
            },
        ],
    },
];

export default whiteListRouter;
