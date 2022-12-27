const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
//解决跨域问题
module.exports = {
  publicPath:'/keyfrommeta',
  devServer:{
    https: false, // https:{type:Boolean}
    proxy:{
      '/api':{//表示拦截以/api开头的请求路径
        ws:true,
        target:'http://47.100.247.155:16666',
        changOrigin: true,
        pathRewrite:{
          '^/api':'/' //重写api，把api变成空字符，因为我们真正请求的路径是没有api的
        }
      }
    }
  }
}