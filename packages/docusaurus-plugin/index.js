module.exports = function () {
  return {
    name: 'react-leaflet-docusaurus-plugin',
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
