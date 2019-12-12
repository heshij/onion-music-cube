var path = require('path')

function resolve (dir) {
  console.log(__dirname)
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@common', resolve('src/common'))
      .set('@components', resolve('src/components'))
  },
  devServer: {
    proxy: {
      '/api': {
        // 接口域名
        target: 'http://localhost:3000',
        // 如果是https接口，需要配置这个参数
        secure: false,
        // 是否跨域
        changeOrigin: true,
        // 需要rewrite的
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
