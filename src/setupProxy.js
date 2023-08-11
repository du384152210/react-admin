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
      target: "http://43.207.174.34",
      changeOrigin: true,
      pathRewrite: {'^/api': ''}
    })
  )
}