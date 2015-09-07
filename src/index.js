import Leaflet from 'leaflet';

import PropTypes from './types';

import BaseTileLayer from './BaseTileLayer';
import CanvasTileLayer from './CanvasTileLayer';
import Circle from './Circle';
import CircleMarker from './CircleMarker';
import FeatureGroup from './FeatureGroup';
import GeoJson from './GeoJson';
import ImageOverlay from './ImageOverlay';
import Map from './Map';
import MapComponent from './MapComponent';
import MapLayer from './MapLayer';
import Marker from './Marker';
import MultiPolygon from './MultiPolygon';
import MultiPolyline from './MultiPolyline';
import Polygon from './Polygon';
import Polyline from './Polyline';
import Popup from './Popup';
import PopupContainer from './PopupContainer';
import Rectangle from './Rectangle';
import TileLayer from './TileLayer';
import WMSTileLayer from './WMSTileLayer';

const setIconDefaultImagePath = path => {
  Leaflet.Icon.Default.imagePath = path;
};

setIconDefaultImagePath('//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/images');

export default {
  setIconDefaultImagePath,
  PropTypes,
  BaseTileLayer,
  CanvasTileLayer,
  Circle,
  CircleMarker,
  FeatureGroup,
  GeoJson,
  ImageOverlay,
  Map,
  MapComponent,
  MapLayer,
  Marker,
  MultiPolygon,
  MultiPolyline,
  Polygon,
  Polyline,
  Popup,
  PopupContainer,
  Rectangle,
  TileLayer,
  WMSTileLayer,
};
