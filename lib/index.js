'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _types = require('./types');

var _PropTypes = _interopRequireWildcard(_types);

exports.PropTypes = _PropTypes;

var _BaseTileLayer2 = require('./BaseTileLayer');

var _BaseTileLayer3 = _interopRequireDefault(_BaseTileLayer2);

exports.BaseTileLayer = _BaseTileLayer3['default'];

var _CanvasTileLayer2 = require('./CanvasTileLayer');

var _CanvasTileLayer3 = _interopRequireDefault(_CanvasTileLayer2);

exports.CanvasTileLayer = _CanvasTileLayer3['default'];

var _Circle2 = require('./Circle');

var _Circle3 = _interopRequireDefault(_Circle2);

exports.Circle = _Circle3['default'];

var _CircleMarker2 = require('./CircleMarker');

var _CircleMarker3 = _interopRequireDefault(_CircleMarker2);

exports.CircleMarker = _CircleMarker3['default'];

var _FeatureGroup2 = require('./FeatureGroup');

var _FeatureGroup3 = _interopRequireDefault(_FeatureGroup2);

exports.FeatureGroup = _FeatureGroup3['default'];

var _GeoJson2 = require('./GeoJson');

var _GeoJson3 = _interopRequireDefault(_GeoJson2);

exports.GeoJson = _GeoJson3['default'];

var _ImageOverlay2 = require('./ImageOverlay');

var _ImageOverlay3 = _interopRequireDefault(_ImageOverlay2);

exports.ImageOverlay = _ImageOverlay3['default'];

var _LayerGroup2 = require('./LayerGroup');

var _LayerGroup3 = _interopRequireDefault(_LayerGroup2);

exports.LayerGroup = _LayerGroup3['default'];

var _Map2 = require('./Map');

var _Map3 = _interopRequireDefault(_Map2);

exports.Map = _Map3['default'];

var _MapComponent2 = require('./MapComponent');

var _MapComponent3 = _interopRequireDefault(_MapComponent2);

exports.MapComponent = _MapComponent3['default'];

var _MapControl2 = require('./MapControl');

var _MapControl3 = _interopRequireDefault(_MapControl2);

exports.MapControl = _MapControl3['default'];

var _MapLayer2 = require('./MapLayer');

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

exports.MapLayer = _MapLayer3['default'];

var _Marker2 = require('./Marker');

var _Marker3 = _interopRequireDefault(_Marker2);

exports.Marker = _Marker3['default'];

var _MultiPolygon2 = require('./MultiPolygon');

var _MultiPolygon3 = _interopRequireDefault(_MultiPolygon2);

exports.MultiPolygon = _MultiPolygon3['default'];

var _MultiPolyline2 = require('./MultiPolyline');

var _MultiPolyline3 = _interopRequireDefault(_MultiPolyline2);

exports.MultiPolyline = _MultiPolyline3['default'];

var _Path2 = require('./Path');

var _Path3 = _interopRequireDefault(_Path2);

exports.Path = _Path3['default'];

var _Polygon2 = require('./Polygon');

var _Polygon3 = _interopRequireDefault(_Polygon2);

exports.Polygon = _Polygon3['default'];

var _Polyline2 = require('./Polyline');

var _Polyline3 = _interopRequireDefault(_Polyline2);

exports.Polyline = _Polyline3['default'];

var _Popup2 = require('./Popup');

var _Popup3 = _interopRequireDefault(_Popup2);

exports.Popup = _Popup3['default'];

var _Rectangle2 = require('./Rectangle');

var _Rectangle3 = _interopRequireDefault(_Rectangle2);

exports.Rectangle = _Rectangle3['default'];

var _TileLayer2 = require('./TileLayer');

var _TileLayer3 = _interopRequireDefault(_TileLayer2);

exports.TileLayer = _TileLayer3['default'];

var _WMSTileLayer2 = require('./WMSTileLayer');

var _WMSTileLayer3 = _interopRequireDefault(_WMSTileLayer2);

exports.WMSTileLayer = _WMSTileLayer3['default'];

var _ZoomControl2 = require('./ZoomControl');

var _ZoomControl3 = _interopRequireDefault(_ZoomControl2);

exports.ZoomControl = _ZoomControl3['default'];
var setIconDefaultImagePath = function setIconDefaultImagePath(path) {
  _leaflet2['default'].Icon.Default.imagePath = path;
};

exports.setIconDefaultImagePath = setIconDefaultImagePath;
setIconDefaultImagePath('//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images');