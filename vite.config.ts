import { defineConfig } from "vite";

import path from "path";
// 支持编译 后缀名   .vue
// import vue from "@vitejs/plugin-vue";

/**
 * @vitejs/plugin-vue-jsx
 * 作用： 支持编译 后缀名  .tsx
 */
import vueJsx from "@vitejs/plugin-vue-jsx";

/**
 * unplugin-auto-import
 * 作用： 自动按需导入 vue 、 vue-router 等， 文件可以直接使用 vue上的方法
 */
import AutoImport from "unplugin-auto-import/vite";

/**
 * unplugin-vue-components
 * 作用： 自动按需导入 UI组件，页面可以直接使用 对应组件
 * https://github.com/antfu/unplugin-vue-components
 * ======
 * 引入 ant-design-vue@next 依赖包 版本目前不支持 4.0+ 目前使用 v3.1.0-rc.4
 * ======
 */
import Components from "unplugin-vue-components/vite";
// 如使用 element-plus   引入 ElementPlusResolver
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
export default defineConfig({
    plugins: [
        // vue(),
        vueJsx(),
        AutoImport({
            imports: ["vue", "vue-router"],
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
            dts: "src/auto-imports.d.ts",
        }),
        Components({
            // 指定组件位置，默认是src/components
            // dirs: ["src/components"],
            // ui库解析器
            resolvers: [
                // 使用 AnTD - UI框架， 如使用其他UI 下面接着配置
                // ElementPlusResolver(),
                AntDesignVueResolver(),
            ],
            // 需要使用得文件后缀
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
            // 配置文件生成位置
            dts: "src/components.d.ts",
        }),
    ],
    resolve: {
        alias: {
            // 关键代码 在 tsconfig.json => compilerOptions 中配置,@ 引入会有提示
            // "paths": {
            //   "@/*": ["src/*"]
            //  },
            "@": path.resolve(__dirname, "./src"),
        },
    },
    css: {
        //* css模块化
        modules: {
            // css模块化 文件以.module.[css|less|scss]结尾
            generateScopedName: "[name]__[local]___[hash:base64:5]",
            hashPrefix: "prefix",
        },
        //* 预编译支持less
        preprocessorOptions: {
            less: {
                // 支持内联 JavaScript
                javascriptEnabled: true,
            },
        },
    },
});
