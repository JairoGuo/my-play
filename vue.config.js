// const path =  require('path');
// const resolve = (dir) => path.join(__dirname, dir);
// const webpack = require('webpack')

module.exports = {
    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             '@': resolve('src')
    //         }
    //     },
    //
    // },
    // pluginOptions: new webpack.ProvidePlugin({
    //     jQuery: "jquery",
    //     $: "jquery"
    // })
    devServer: {
        open: true,
        host: process.env.VUE_APP_URL,
        port: process.env.VUE_APP_PORT,
        https: false,
        disableHostCheck: true, // todo: enable
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {//配置跨域
            '/api': {
                target: process.env.VUE_APP_API,
                ws: true,
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''//请求的时候使用这个api就可以
                }
            }
        }
    },

    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,

            // contextIsolation: false

        }
        // moment: {
        //     locales: [
        //         ''
        //     ]
        // }
    },

}
