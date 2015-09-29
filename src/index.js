import Leaflet from 'leaflet';

export PropTypes from './types';

export BaseTileLayer from './BaseTileLayer';
export CanvasTileLayer from './CanvasTileLayer';
export Circle from './Circle';
export CircleMarker from './CircleMarker';
export FeatureGroup from './FeatureGroup';
export GeoJson from './GeoJson';
export ImageOverlay from './ImageOverlay';
export LayerGroup from './LayerGroup';
export Map from './Map';
export MapComponent from './MapComponent';
export MapLayer from './MapLayer';
export Marker from './Marker';
export MultiPolygon from './MultiPolygon';
export MultiPolyline from './MultiPolyline';
export Path from './Path';
export Polygon from './Polygon';
export Polyline from './Polyline';
export Popup from './Popup';
export PopupContainer from './PopupContainer';
export Rectangle from './Rectangle';
export TileLayer from './TileLayer';
export WMSTileLayer from './WMSTileLayer';

export const setIconDefaultImagePath = path => {
  Leaflet.Icon.Default.imagePath = path;
};

setIconDefaultImagePath('//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.5/images');
