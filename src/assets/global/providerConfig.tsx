/*
# 全局组件配置
# 参考地址：https://next.antdv.com/docs/vue/customize-theme-cn#seedtoken 
*/
export const providerConfig = {
    theme: {
        token: {
            // 主题色
            colorPrimary: "#00b96b",
            // 边框圆角
            borderRadius: 5,
            // 基础组件高度 例： button、input等
            // controlHeight: 40,
            // 字体大小
            fontSize: 13,
            // 组件得背景色
            colorBgContainer: "#fff",
            // 模态框 内容背景
            // colorBgElevated: "#eef4f1",
        },
    },

    csp: {
        nonce: "YourNonceCode",
    },
    // 全局组件大小
    // componentSize: "small",
    // 空状态 自定义
    renderEmpty: () => (
        <a-empty
            description="暂无数据哦"
            image="https://tse3-mm.cn.bing.net/th/id/OIP-C.5B55yAF1mbgY90D4s8celgAAAA?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        />
    ),
};
