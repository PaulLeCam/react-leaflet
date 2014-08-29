leaflet = require "leaflet"

setIconDefaultImagePath = (path) ->
  leaflet.Icon.Default.imagePath = path

setIconDefaultImagePath "//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/images"

module.exports =
  setIconDefaultImagePath: setIconDefaultImagePath
  CanvasTileLayer: require "./CanvasTileLayer"
  Circle: require "./Circle"
  CircleMarker: require "./CircleMarker"
  FeatureGroup: require "./FeatureGroup"
  GeoJson: require "./GeoJson"
  ImageOverlay: require "./ImageOverlay"
  LayerGroup: require "./LayerGroup"
  Map: require "./Map"
  Marker: require "./Marker"
  MultiPolygon: require "./MultiPolygon"
  MultiPolyline: require "./MultiPolyline"
  Polygon: require "./Polygon"
  Polyline: require "./Polyline"
  Popup: require "./Popup"
  Rectangle: require "./Rectangle"
  TileLayer: require "./TileLayer"
  WMSTileLayer: require "./WMSTileLayer"
