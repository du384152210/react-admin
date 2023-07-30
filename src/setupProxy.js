const { createProxyMiddleware: proxy} = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     proxy("/api", {
//       target: "http://localhost:3000",
//       changeOrigin: true,
//       pathRewrite: {'^/api': ''}
//     })
//   )
// }

module.exports = function (app) {
  app.use(
    proxy("/api", {
      target: "http://139.199.223.132",
      changeOrigin: true,
      pathRewrite: {'^/api': ''}
    })
  )
}