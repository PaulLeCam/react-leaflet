import Leaflet from 'leaflet'

export * as PropTypes from './types'

export AttributionControl from './AttributionControl'
export Circle from './Circle'
export CircleMarker from './CircleMarker'
export FeatureGroup from './FeatureGroup'
export GeoJSON from './GeoJSON'
export GridLayer from './GridLayer'
export ImageOverlay from './ImageOverlay'
export LayerGroup from './LayerGroup'
export LayersControl from './LayersControl'
export Map from './Map'
export MapComponent from './MapComponent'
export MapControl from './MapControl'
export MapLayer from './MapLayer'
export Marker from './Marker'
export Path from './Path'
export Polygon from './Polygon'
export Polyline from './Polyline'
export Popup from './Popup'
export Rectangle from './Rectangle'
export ScaleControl from './ScaleControl'
export TileLayer from './TileLayer'
export WMSTileLayer from './WMSTileLayer'
export ZoomControl from './ZoomControl'

export const setIconDefaultImagePath = path => {
  Leaflet.Icon.Default.imagePath = path
}

setIconDefaultImagePath('//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-rc.2/images')
