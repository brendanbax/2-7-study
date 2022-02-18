module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/27_study/' : '/',
  pwa: {
    name: "2:7 Study",
    themeColor: "#2b313b",
    display: 'standalone',
    backgroundColor: '#2b313b',
    icons: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  }
};