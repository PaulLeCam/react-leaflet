# API

## Helpers

**setIconDefaultImagePath(path: string)**: Setter for `Leaflet.Icon.Default.imagePath`, set to `//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images` by default.

## PropTypes

**children**: One `PropTypes.node` or an Array of `PropTypes.node`.

**latLng**: One of `[number, number]`, `{lat: number, lng: number}` or `{lat: number, lon: number}`.

**latLngList**: An Array of *LatLng*.

**bounds**: An instance of *Leaflet.LatLngBounds* or a *LatLngList*.

**controlPosition**: One of `topleft`, `topright`, `bottomleft` or `bottomright`.

**layerContainer**: An object containing `addLayer()` and `removeLayer()` functions.

## Events

Leaflet exposes its own events, different from React. You can listen to them using React-Leaflet by adding a callback to a property prefixed by `on`. Ex: `<Map onMoveend={this.handleMoveend}>...</Map>`.  
Check Leaflet documentation for the events associated to each component.

## [Components](Components.md)

- [Base components](Components.md#base-components)
  - [MapComponent](Components.md#mapcomponent)
  - [MapControl](Components.md#mapcontrol)
  - [MapLayer](Components.md#maplayer)
  - [BaseTileLayer](Components.md#basetilelayer)
  - [Path](Components.md#path)
- [Map](Components.md#map)
- [UI Layers](Components.md#ui-layers)
  - [Marker](Components.md#marker)
  - [Popup](Components.md#popup)
- [Raster Layers](Components.md#raster-layers)
  - [TileLayer](Components.md#tilelayer)
  - [ImageOverlay](Components.md#imageoverlay)
  - [CanvasTileLayer](Components.md#canvastilelayer)
  - [WMSTileLayer](Components.md#wmstilelayer)
- [Vector Layers](Components.md#vector-layers)
  - [Circle](Components.md#circle)
  - [CircleMarker](Components.md#circlemarker)
  - [Polyline](Components.md#polyline)
  - [MultiPolyline](Components.md#multipolyline)
  - [Polygon](Components.md#polygon)
  - [MultiPolygon](Components.md#multipolygon)
  - [Rectangle](Components.md#rectangle)
- [Other Layers](Components.md#other-layers)
  - [LayerGroup](Components.md#layergroup)
  - [FeatureGroup](Components.md#featuregroup)
  - [GeoJson](Components.md#geojson)
- [Controls](Components.md#controls)
  - [AttributionControl](Components.md#attributioncontrol)
  - [LayersControl](Components.md#layerscontrol)
    - [LayersControl.BaseLayer](Components.md#layerscontrolbaselayer)
    - [LayersControl.Overlay](Components.md#layerscontroloverlay)
  - [ScaleControl](Components.md#scalecontrol)
  - [ZoomControl](Components.md#zoomcontrol)
