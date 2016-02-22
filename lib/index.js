'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setIconDefaultImagePath = exports.ZoomControl = exports.WMSTileLayer = exports.TileLayer = exports.ScaleControl = exports.Rectangle = exports.Popup = exports.Polyline = exports.Polygon = exports.Path = exports.MultiPolyline = exports.MultiPolygon = exports.Marker = exports.MapLayer = exports.MapControl = exports.MapComponent = exports.Map = exports.LayersControl = exports.LayerGroup = exports.ImageOverlay = exports.GeoJson = exports.FeatureGroup = exports.CircleMarker = exports.Circle = exports.CanvasTileLayer = exports.BaseTileLayer = exports.AttributionControl = exports.PropTypes = undefined;

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _types = require('./types');

var _PropTypes = _interopRequireWildcard(_types);

var _AttributionControl2 = require('./AttributionControl');

var _AttributionControl3 = _interopRequireDefault(_AttributionControl2);

var _BaseTileLayer2 = require('./BaseTileLayer');

var _BaseTileLayer3 = _interopRequireDefault(_BaseTileLayer2);

var _CanvasTileLayer2 = require('./CanvasTileLayer');

var _CanvasTileLayer3 = _interopRequireDefault(_CanvasTileLayer2);

var _Circle2 = require('./Circle');

var _Circle3 = _interopRequireDefault(_Circle2);

var _CircleMarker2 = require('./CircleMarker');

var _CircleMarker3 = _interopRequireDefault(_CircleMarker2);

var _FeatureGroup2 = require('./FeatureGroup');

var _FeatureGroup3 = _interopRequireDefault(_FeatureGroup2);

var _GeoJson2 = require('./GeoJson');

var _GeoJson3 = _interopRequireDefault(_GeoJson2);

var _ImageOverlay2 = require('./ImageOverlay');

var _ImageOverlay3 = _interopRequireDefault(_ImageOverlay2);

var _LayerGroup2 = require('./LayerGroup');

var _LayerGroup3 = _interopRequireDefault(_LayerGroup2);

var _LayersControl2 = require('./LayersControl');

var _LayersControl3 = _interopRequireDefault(_LayersControl2);

var _Map2 = require('./Map');

var _Map3 = _interopRequireDefault(_Map2);

var _MapComponent2 = require('./MapComponent');

var _MapComponent3 = _interopRequireDefault(_MapComponent2);

var _MapControl2 = require('./MapControl');

var _MapControl3 = _interopRequireDefault(_MapControl2);

var _MapLayer2 = require('./MapLayer');

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

var _Marker2 = require('./Marker');

var _Marker3 = _interopRequireDefault(_Marker2);

var _MultiPolygon2 = require('./MultiPolygon');

var _MultiPolygon3 = _interopRequireDefault(_MultiPolygon2);

var _MultiPolyline2 = require('./MultiPolyline');

var _MultiPolyline3 = _interopRequireDefault(_MultiPolyline2);

var _Path2 = require('./Path');

var _Path3 = _interopRequireDefault(_Path2);

var _Polygon2 = require('./Polygon');

var _Polygon3 = _interopRequireDefault(_Polygon2);

var _Polyline2 = require('./Polyline');

var _Polyline3 = _interopRequireDefault(_Polyline2);

var _Popup2 = require('./Popup');

var _Popup3 = _interopRequireDefault(_Popup2);

var _Rectangle2 = require('./Rectangle');

var _Rectangle3 = _interopRequireDefault(_Rectangle2);

var _ScaleControl2 = require('./ScaleControl');

var _ScaleControl3 = _interopRequireDefault(_ScaleControl2);

var _TileLayer2 = require('./TileLayer');

var _TileLayer3 = _interopRequireDefault(_TileLayer2);

var _WMSTileLayer2 = require('./WMSTileLayer');

var _WMSTileLayer3 = _interopRequireDefault(_WMSTileLayer2);

var _ZoomControl2 = require('./ZoomControl');

var _ZoomControl3 = _interopRequireDefault(_ZoomControl2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.PropTypes = _PropTypes;
exports.AttributionControl = _AttributionControl3.default;
exports.BaseTileLayer = _BaseTileLayer3.default;
exports.CanvasTileLayer = _CanvasTileLayer3.default;
exports.Circle = _Circle3.default;
exports.CircleMarker = _CircleMarker3.default;
exports.FeatureGroup = _FeatureGroup3.default;
exports.GeoJson = _GeoJson3.default;
exports.ImageOverlay = _ImageOverlay3.default;
exports.LayerGroup = _LayerGroup3.default;
exports.LayersControl = _LayersControl3.default;
exports.Map = _Map3.default;
exports.MapComponent = _MapComponent3.default;
exports.MapControl = _MapControl3.default;
exports.MapLayer = _MapLayer3.default;
exports.Marker = _Marker3.default;
exports.MultiPolygon = _MultiPolygon3.default;
exports.MultiPolyline = _MultiPolyline3.default;
exports.Path = _Path3.default;
exports.Polygon = _Polygon3.default;
exports.Polyline = _Polyline3.default;
exports.Popup = _Popup3.default;
exports.Rectangle = _Rectangle3.default;
exports.ScaleControl = _ScaleControl3.default;
exports.TileLayer = _TileLayer3.default;
exports.WMSTileLayer = _WMSTileLayer3.default;
exports.ZoomControl = _ZoomControl3.default;
var setIconDefaultImagePath = exports.setIconDefaultImagePath = function setIconDefaultImagePath(path) {
  _leaflet2.default.Icon.Default.imagePath = path;
};

setIconDefaultImagePath('//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images');