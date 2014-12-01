var Leaflet = require("leaflet");

var setIconDefaultImagePath = function(path) {
  Leaflet.Icon.Default.imagePath = path;
};

setIconDefaultImagePath("//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/images");

module.exports = {
  setIconDefaultImagePath: setIconDefaultImagePath,
  mixins: {
    element: require("./mixins/element"),
    mapLayer: require("./mixins/mapLayer"),
    popupContainer: require("./mixins/popupContainer"),
    tileLayer: require("./mixins/tileLayer")
  },
  PropTypes: {
    latlng: require("./types/latlng"),
    latlngList: require("./types/latlngList")
  },
  CanvasTileLayer: require("./CanvasTileLayer"),
  Circle: require("./Circle"),
  CircleMarker: require("./CircleMarker"),
  FeatureGroup: require("./FeatureGroup"),
  GeoJson: require("./GeoJson"),
  ImageOverlay: require("./ImageOverlay"),
  Map: require("./Map"),
  Marker: require("./Marker"),
  MultiPolygon: require("./MultiPolygon"),
  MultiPolyline: require("./MultiPolyline"),
  Polygon: require("./Polygon"),
  Polyline: require("./Polyline"),
  Popup: require("./Popup"),
  Rectangle: require("./Rectangle"),
  TileLayer: require("./TileLayer"),
  WMSTileLayer: require("./WMSTileLayer")
};
