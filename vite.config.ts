import { defineConfig } from 'vite';
import path from 'path';
// 支持编译 后缀名   .vue
// import vue from '@vitejs/plugin-vue'
// 支持编译 后缀名  .tsx
import vueJsx from '@vitejs/plugin-vue-jsx';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vueJsx()],
    resolve: {
        alias: {
            // 关键代码
            '@': path.resolve(__dirname, './src')
        }
    }
});
