import Leaflet from "leaflet";

import mixins from "./mixins";
import PropTypes from "./types";

import CanvasTileLayer from "./CanvasTileLayer";
import Circle from "./Circle";
import CircleMarker from "./CircleMarker";
import FeatureGroup from "./FeatureGroup";
import GeoJson from "./GeoJson";
import ImageOverlay from "./ImageOverlay";
import Map from "./Map";
import Marker from "./Marker";
import MultiPolygon from "./MultiPolygon";
import MultiPolyline from "./MultiPolyline";
import Polygon from "./Polygon";
import Polyline from "./Polyline";
import Popup from "./Popup";
import Rectangle from "./Rectangle";
import TileLayer from "./TileLayer";
import WMSTileLayer from "./WMSTileLayer";

let setIconDefaultImagePath = path => {
  Leaflet.Icon.Default.imagePath = path;
};

setIconDefaultImagePath("//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/images");

export default {
  setIconDefaultImagePath,
  mixins,
  PropTypes,
  CanvasTileLayer,
  Circle,
  CircleMarker,
  FeatureGroup,
  GeoJson,
  ImageOverlay,
  Map,
  Marker,
  MultiPolygon,
  MultiPolyline,
  Polygon,
  Polyline,
  Popup,
  Rectangle,
  TileLayer,
  WMSTileLayer
};
