var leaflet, setIconDefaultImagePath;

leaflet = require("leaflet");

setIconDefaultImagePath = function(path) {
  return leaflet.Icon.Default.imagePath = path;
};

setIconDefaultImagePath("//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/images");

module.exports = {
  setIconDefaultImagePath: setIconDefaultImagePath,
  CanvasTileLayer: require("./CanvasTileLayer"),
  ImageOverlay: require("./ImageOverlay"),
  Marker: require("./Marker"),
  Map: require("./Map"),
  MultiPolyline: require("./MultiPolyline"),
  Polyline: require("./Polyline"),
  Popup: require("./Popup"),
  TileLayer: require("./TileLayer"),
  WMSTileLayer: require("./WMSTileLayer")
};
