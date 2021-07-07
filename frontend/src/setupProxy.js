const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
  const httpProxy = process.env.HTTP_PROXY
    ? process.env.HTTP_PROXY
    : 'http://localhost:8080/'
  app.use(createProxyMiddleware('/api', { target: httpProxy }))
}
