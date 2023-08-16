import { createApp } from "vue";
import App from "./App";
import Router from "./router";
import "@/assets/style/style.less";
// https://gsap.framer.wiki/timelines  可以使用各种动画
const app = createApp(App);
app.use(Router);
app.mount("#app");
