const PROXY_CONFIG = [
  {
    context: [
      "/api"
    ],
    target: 'https://api.weather.yandex.ru',
    secure: true,
    logLevel: "debug",
    changeOrigin: true,
    pathRewrite: { '^/api': '' }
  }
]

module.exports = PROXY_CONFIG;
