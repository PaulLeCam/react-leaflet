var leaflet, setIconDefaultImagePath;

leaflet = require("leaflet");

setIconDefaultImagePath = function(path) {
  return leaflet.Icon.Default.imagePath = path;
};

setIconDefaultImagePath("//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/images");

module.exports = {
  setIconDefaultImagePath: setIconDefaultImagePath,
  Marker: require("./Marker"),
  Map: require("./Map"),
  TileLayer: require("./TileLayer")
};
