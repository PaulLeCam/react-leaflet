# API

## PropTypes

The following PropTypes are exported in the `PropTypes` object.

**children**: One `PropTypes.node` or an Array of `PropTypes.node`.

**latLng**: One of `[number, number]`, `{lat: number, lng: number}` or `{lat: number, lon: number}`.

**latLngList**: An Array of *latLng*.

**bounds**: An instance of *Leaflet.LatLngBounds* or a *latLngList*.

**controlPosition**: One of `topleft`, `topright`, `bottomleft` or `bottomright`.

**layerContainer**: An object containing `addLayer()` and `removeLayer()` functions.

**viewport**: An Object having an optional `center` of type *latLng* and optional `zoom` of type *number*.

## Events

Leaflet exposes its own events, different from React. You can listen to them using React-Leaflet by adding a callback to a property prefixed by `on`. Ex: `<Map onMoveend={this.handleMoveend}>...</Map>`.  
Check Leaflet documentation for the events associated to each component.

## [Components](Components.md)

- [Base components](Components.md#base-components)
  - [MapComponent](Components.md#mapcomponent)
  - [MapControl](Components.md#mapcontrol)
  - [MapLayer](Components.md#maplayer)
  - [Path](Components.md#path)
- [Map](Components.md#map)
  - [Pane](Components.md#pane)
- [UI Layers](Components.md#ui-layers)
  - [Marker](Components.md#marker)
  - [Popup](Components.md#popup)
  - [Tooltip](Components.md#tooltip)
- [Raster Layers](Components.md#raster-layers)
  - [TileLayer](Components.md#tilelayer)
  - [WMSTileLayer](Components.md#wmstilelayer)
  - [ImageOverlay](Components.md#imageoverlay)
  - [VideoOverlay](Components.md#videooverlay)
- [Vector Layers](Components.md#vector-layers)
  - [Circle](Components.md#circle)
  - [CircleMarker](Components.md#circlemarker)
  - [Polyline](Components.md#polyline)
  - [Polygon](Components.md#polygon)
  - [Rectangle](Components.md#rectangle)
- [Other Layers](Components.md#other-layers)
  - [LayerGroup](Components.md#layergroup)
  - [FeatureGroup](Components.md#featuregroup)
  - [GridLayer](Components.md#gridlayer)
  - [GeoJSON](Components.md#geojson)
- [Controls](Components.md#controls)
  - [AttributionControl](Components.md#attributioncontrol)
  - [LayersControl](Components.md#layerscontrol)
    - [LayersControl.BaseLayer](Components.md#layerscontrolbaselayer)
    - [LayersControl.Overlay](Components.md#layerscontroloverlay)
  - [ScaleControl](Components.md#scalecontrol)
  - [ZoomControl](Components.md#zoomcontrol)
