# Components

The properties documented as **dynamic properties** are updated using the relevant Leaflet setter, other properties will *not* update the component when they are changed after the component is mounted.  
All other properties are passed as the `options` argument to their corresponding Leaflet element and should work fine for static maps, it is however unlikely that they would updated if you change them afterwards.

You can directly access the Leaflet element created by a component using `this.leafletElement` in this component. This leaflet element is usually created in `componentWillMount()`, except for the `Map` component where it can only be created after the `<div>` container is rendered.

- [Base components](#base-components)
  - [MapComponent](#mapcomponent)
  - [MapControl](#mapcontrol)
  - [MapLayer](#maplayer)
  - [BaseTileLayer](#basetilelayer)
  - [Path](#path)
- [Map](#map)
- [UI Layers](#ui-layers)
  - [Marker](#marker)
  - [Popup](#popup)
- [Raster Layers](#raster-layers)
  - [TileLayer](#tilelayer)
  - [ImageOverlay](#imageoverlay)
  - [CanvasTileLayer](#canvastilelayer)
  - [WMSTileLayer](#wmstilelayer)
- [Vector Layers](#vector-layers)
  - [Circle](#circle)
  - [CircleMarker](#circlemarker)
  - [Polyline](#polyline)
  - [MultiPolyline](#multipolyline)
  - [Polygon](#polygon)
  - [MultiPolygon](#multipolygon)
  - [Rectangle](#rectangle)
- [Other Layers](#other-layers)
  - [LayerGroup](#layergroup)
  - [FeatureGroup](#featuregroup)
  - [GeoJson](#geojson)
- [Controls](#controls)
  - [AttributionControl](#attributioncontrol)
  - [LayersControl](#layerscontrol)
    - [LayersControl.BaseLayer](#layerscontrolbaselayer)
    - [LayersControl.Overlay](#layerscontroloverlay)
  - [ScaleControl](#scalecontrol)
  - [ZoomControl](#zoomcontrol)

## Base components

These components are base classes used by other components. They can be extended to create custom components but should not be used directly.

### MapComponent

Base class extending `React.Component` and handling events binding and unbind.  
It exposes a `leafletElement` property to access the `Leaflet` object created for the component.

### MapControl

Base class extending `React.Component` for controls.  
It exposes a `leafletElement` property to access the `Leaflet` object created for the control.

### MapLayer

Base class extending [`MapComponent`](#mapcomponent), handling adding the layer to the map and removing it when relevant. It exposes the `layerContainer` property, to be used by extending classes to access their containing layer.

### BaseTileLayer

Base class extending [`MapLayer`](#maplayer) with a `render()` method and handling a TitleLayer `opacity` and `zIndex` props.

### Path

Base class extending [`MapLayer`](#maplayer) with the following methods:
- `getPathOptions(object props): object`: filters the input `props` and return a new object of [Path options](http://leafletjs.com/reference.html#path-options) properties.
- `setStyle(object options = {}): void`: alias to the Leaflet element [`setStyle()`](http://leafletjs.com/reference.html#path-setstyle).
- `setStyleIfChanged(object fromProps, object toProps): void`: extracts the Path options of the two arguments, and calls `setStyle()` with the new options if different from the previous ones.

## Map

This is the top-level component that must be mounted for children ones to be rendered. Refer to [Leaflet documentation](http://leafletjs.com/reference.html#map-options) for more information about the properties.

**Dynamic properties**
- `animate: boolean` (optional): If `true`, panning will always be animated if possible. Defaults to `false`.
- `bounds: bounds` (optional): A rectangle for the map to contain. It will be centered, and the map will zoom in as close as it can while still showing the full bounds. This property is dynamic, if you change it it will be reflected on the map.
- `boundsOptions: object` (optional): Options passed to the `fitBounds()` method.
- `center: latLng` (optional): Center of the map. This property is dynamic, if you change it it will be reflected in the map.
- `className: string` (optional): className property of the `<div>` container for the map.
- `maxBounds: bounds` (optional)
- `style: object` (optional): style property of the `<div>` container for the map.
- `useFlyTo: boolean` (optional): boolean to control whether to use flyTo functions for bounds and center. If false `map.fitBounds` and `map.setView` will be used. If true `map.flyToBounds` and `map.flyTo` will be used. Defaults to false. 
- `zoom: number` (optional)

**Other properties**
- `id: string` (optional): The ID of the `<div>` container for the map. If you don't provide it, a unique one will be created.

## UI Layers

### Marker

[Leaflet reference](http://leafletjs.com/reference.html#marker)

**Dynamic properties**
- `position: latLng` (required)
- `draggable: boolean` (optional)
- `icon: Leaflet.Icon` (optional)
- `zIndexOffset: number` (optional)
- `opacity: number` (optional)

### Popup

[Leaflet reference](http://leafletjs.com/reference.html#popup)

The Popup children will be rendered using `ReactDOM.render()`, they must be valid React elements.

**Dynamic properties**
- `position: latLng` (optional)

## Raster Layers

### TileLayer

[Leaflet reference](http://leafletjs.com/reference.html#tilelayer)

**Dynamic properties**
- `url: string` (required)
- `opacity: number` (optional)
- `zIndex: number` (optional)

### ImageOverlay

[Leaflet reference](http://leafletjs.com/reference.html#imageoverlay)

**Dynamic properties**
- `url: string` (required)
- `opacity: number` (optional)

### CanvasTileLayer

[Leaflet reference](http://leafletjs.com/reference.html#tilelayer-canvas)

### WMSTileLayer

[Leaflet reference](http://leafletjs.com/reference.html#tilelayer-wms)

## Vector Layers

All vector layers extend the **Path** component and therefore accept dynamic [Path options](http://leafletjs.com/reference.html#path-options) properties.

### Circle

[Leaflet reference](http://leafletjs.com/reference.html#circle)

**Dynamic properties**
- `center: latLng` (required)
- `radius: number` (required)

### CircleMarker

[Leaflet reference](http://leafletjs.com/reference.html#circlemarker)

**Dynamic properties**
- `center: latLng` (required)
- `radius: number` (optional)

### Polyline

[Leaflet reference](http://leafletjs.com/reference.html#polyline)

**Dynamic properties**
- `positions: latLngList` (required)

### MultiPolyline

[Leaflet reference](http://leafletjs.com/reference.html#multipolyline)

**Dynamic properties**
- `polylines: array<latLngList>` (required)

### Polygon

[Leaflet reference](http://leafletjs.com/reference.html#polygon)

**Dynamic properties**
- `positions: latLngList | Array<latLngList>` (required)

### MultiPolygon

[Leaflet reference](http://leafletjs.com/reference.html#multipolygon)

**Dynamic properties**
- `polygons: array<latLngList>` (required)

### Rectangle

[Leaflet reference](http://leafletjs.com/reference.html#rectangle)

**Dynamic properties**
- `bounds: bounds` (required, dynamic)

## Other Layers

### LayerGroup

Use the `LayerGroup` wrapper component to group children layers together.

### FeatureGroup

Extended `LayerGroup` supporting a `Popup` child.

### GeoJson

[Leaflet reference](http://leafletjs.com/reference.html#geojson)

**Properties**
- `data: GeoJSON` (required). This property will *not* be updated if it is changed after the component is mounted.

## Controls

### AttributionControl

[Leaflet reference](http://leafletjs.com/reference.html#control-attribution)

**Dynamic properties**
- `position: controlPosition` (optional)

### LayersControl

[Leaflet reference](http://leafletjs.com/reference.html#control-layers)  

**Dynamic properties**
- `position: controlPosition` (optional)

This component exposes two children container components, `LayersControl.BaseLayer` and `LayersControl.Overlay` documented below.  
See the `layers-control` example for a more advanced usage.

Example usage:
```jsx
<LayersControl position='topright'>
  <LayersControl.BaseLayer name='OpenStreetMap.BlackAndWhite'>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url='http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
    />
  </LayersControl.BaseLayer>
  <LayersControl.BaseLayer name='OpenStreetMap.Mapnik'>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    />
  </LayersControl.BaseLayer>
  <LayersControl.Overlay name='Marker with popup'>
    <Marker position={[51.51, -0.06]}>
      <Popup>
        <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
      </Popup>
    </Marker>
  </LayersControl.Overlay>
  <LayersControl.Overlay name='Feature group'>
    <FeatureGroup color='purple'>
      <Popup>
        <span>Popup in FeatureGroup</span>
      </Popup>
      <Circle center={[51.51, -0.06]} radius={200} />
    </FeatureGroup>
  </LayersControl.Overlay>
</LayersControl>
```

### LayersControl.BaseLayer

**Properties**
- `name: string` (required). The name of the layer as appearing in the `LayersControl`.

**Dynamic properties**
- `checked: boolean` (optional, defaults to `false`). Whether the radio button associated to the layer should be checked or not. The layer will be displayed in the map accordingly.

### LayersControl.Overlay

**Properties**
- `name: string` (required). The name of the layer as appearing in the `LayersControl`.

**Dynamic properties**
- `checked: boolean` (optional, defaults to `false`). Whether the checkbox associated to the layer should be checked or not. The layer will be displayed in the map accordingly.

### ScaleControl

[Leaflet reference](http://leafletjs.com/reference.html#control-scale)

**Dynamic properties**
- `position: controlPosition` (optional)

### ZoomControl

[Leaflet reference](http://leafletjs.com/reference.html#control-zoom)

**Dynamic properties**
- `position: controlPosition` (optional)
