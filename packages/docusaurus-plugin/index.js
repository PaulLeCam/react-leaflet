module.exports = function () {
  return {
    name: 'alias-leaflet',
    configureWebpack(config, isServer) {
      if (isServer) {
        return {
          resolve: {
            alias: {
              leaflet: '@react-leaflet/universal-leaflet',
            },
          },
        }
      }
    },
  }
}
