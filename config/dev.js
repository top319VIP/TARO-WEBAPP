const isH5 = process.env.CLIENT_ENV === 'h5'
const HOST = '"https://carapptest.gtmc.com.cn"'     // 设置代理服务器地址

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
    devServer: {
      proxy: {
        '/api/': {
          target: JSON.parse(HOST),
          // pathRewrite: {
          //   '^/api/': '/'
          // },
          changeOrigin: true
        }
      }
    }
  }
}
