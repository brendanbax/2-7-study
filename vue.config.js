module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/27_study/' : '/',
  pwa: {
    name: "2:7 Study",
    themeColor: "#2b313b",
    display: 'standalone',
    backgroundColor: '#2b313b',
  }
};