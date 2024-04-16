const {defineConfig} = require('@vue/cli-service')
const path = require("path");
module.exports = defineConfig({
    publicPath: './',
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [
                // 这个是加上自己的路径,不能使用(如下:alias)中配置的别名路径
                path.resolve(__dirname, "./src/theme/style.less"),
            ],
        },
    },
    devServer: {
        client: {overlay: false},
        historyApiFallback: true,
        open: true,
        port: 8024,
        proxy: {
            "/api": {
                target: process.env.VUE_APP_API_URL, // 本地
                changeOrigin: true
            }
        }
    },
    transpileDependencies: true
})
