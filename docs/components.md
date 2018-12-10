---
id: components
title: Components
---

⚠️ Before starting to use the following components, make sure to understand the difference between the **static** and **dynamic** properties documented in this page.

The properties documented as **dynamic properties** are updated using the relevant Leaflet setter, other properties **will not update** the component when they are changed after the component is mounted.\
All other properties are passed as the `options` argument to their corresponding Leaflet element and should work fine for static maps, it is however unlikely that they would get updated if you change them afterwards.

ℹ️ You can directly access the Leaflet element created by a component using `this.leafletElement` in the component. This leaflet element is usually created in `componentWillMount()` and therefore accessible in `componentDidMount()`, except for the `Map` component where it can only be created after the `<div>` container is rendered.\
You can check out the [event handling example](https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/events.js) to see how to interact with methods exposed by the Leaflet element.

- [Base components](#base-components)
  - [DivOverlay](#divoverlay)
  - [MapComponent](#mapcomponent)
  - [MapControl](#mapcontrol)
  - [MapEvented](#mapevented)
  - [MapLayer](#maplayer)
  - [Path](#path)
- [Map](#map)
  - [Pane](#pane)
- [UI Layers](#ui-layers)
  - [Marker](#marker)
  - [Popup](#popup)
  - [Tooltip](#tooltip)
- [Raster Layers](#raster-layers)
  - [TileLayer](#tilelayer)
  - [WMSTileLayer](#wmstilelayer)
  - [ImageOverlay](#imageoverlay)
  - [VideoOverlay](#videooverlay)
- [Vector Layers](#vector-layers)
  - [Circle](#circle)
  - [CircleMarker](#circlemarker)
  - [Polyline](#polyline)
  - [Polygon](#polygon)
  - [Rectangle](#rectangle)
- [Other Layers](#other-layers)
  - [FeatureGroup](#featuregroup)
  - [GeoJSON](#geojson)
  - [GridLayer](#gridlayer)
  - [LayerGroup](#layergroup)
- [Controls](#controls)
  - [AttributionControl](#attributioncontrol)
  - [LayersControl](#layerscontrol)
    - [LayersControl.BaseLayer](#layerscontrolbaselayer)
    - [LayersControl.Overlay](#layerscontroloverlay)
  - [ScaleControl](#scalecontrol)
  - [ZoomControl](#zoomcontrol)

## Base components

These components are base classes used by other components. They can be extended to create custom components but should not be used directly.

### DivOverlay

Base class extending [`MapComponent`](#mapcomponent), handling shared logic for the [`Popup`](#popup) and [`Tooltip`](#tooltip) components.

[🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/DivOverlay.js)

### MapComponent

Base class extending [`MapEvented`](#mapevented) to add support for panes.

[🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/MapComponent.js)

### MapControl

Base class extending `React.Component` for controls.\
It exposes a `leafletElement` property to access the `Leaflet` object created for the control.

[🍃 Leaflet Control reference](http://leafletjs.com/reference-1.3.4.html#control) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/MapControl.js)

### MapEvented

Base class extending `React.Component` and handling events bindings.\
It exposes a `leafletElement` property to access the `Leaflet` object created for the component.

[🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/MapEvented.js)

### MapLayer

Base class extending [`MapComponent`](#mapcomponent), handling adding the layer to the map and removing it when relevant. It exposes the `layerContainer` property, to be used by extending classes to access their containing layer.

[🍃 Leaflet Layer reference](http://leafletjs.com/reference-1.3.4.html#layer) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/MapLayer.js)

### Path

Base class extending [`MapLayer`](#maplayer) with the following methods:

- `getPathOptions(object props): object`: filters the input `props` and return a new object of [Path options](http://leafletjs.com/reference-1.3.4.html#path-options) properties.
- `setStyle(object options = {}): void`: alias to the Leaflet element [`setStyle()`](http://leafletjs.com/reference-1.3.4.html#path-setstyle).
- `setStyleIfChanged(object fromProps, object toProps): void`: extracts the Path options of the two arguments, and calls `setStyle()` with the new options if different from the previous ones.

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#path) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/Path.js)

## Map

This is the top-level component that must be mounted for child components to be rendered. Refer to [🍃 Leaflet's documentation](http://leafletjs.com/reference-1.3.4.html#map-options) for more information about the properties.

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#map) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/Map.js)

**Dynamic properties**

- `animate: boolean` (optional): If `true`, panning will always be animated if possible. Defaults to `false`.
- `bounds: bounds` (optional): A rectangle for the map to contain. It will be centered, and the map will zoom in as close as it can while still showing the full bounds. Changes are compared using the [`🍃 equals() method of LatLngBounds`](http://leafletjs.com/reference-1.3.4.html#latlngbounds-equals).
- `boundsOptions: Object` (optional): Options passed to the `fitBounds()` method.
- `boxZoom: boolean` (optional): If `true`, the map can be zoomed to a rectangular area specified by dragging the mouse while pressing the shift key. Defaults to true.
- `center: latLng` (optional if `viewport` is provided with a center value): Center of the map. Changes are compared by value, so `[51.0, 0.0]` is considered the same as `{lat: 51, lng: 0}`.
- `className: string` (optional): className property of the `<div>` container for the map.
- `doubleClickZoom: boolean | string` (optional): If `true`, the map can be zoomed in by double clicking on it and zoomed out by double clicking while holding shift. If passed 'center', double-click zoom will zoom to the center of the view regardless of where the mouse was. Defaults to true.
- `dragging: boolean` (optional): If `true`, allows the map to be draggable with mouse/touch or not. Defaults to true.
- `keyboard: boolean` (optional): If `true`, allows users to navigate the map with keyboard arrows and +/- keys. Defaults to true.
- `maxBounds: bounds` (optional)
- `onViewportChange: (viewport: {center: ?[number, number], zoom: ?number}) => void` (optional): fired continuously as the viewport changes.
- `onViewportChanged: (viewport: {center: ?[number, number], zoom: ?number}) => void` (optional): fired after the viewport changed.
- `style: Object` (optional): style property of the `<div>` container for the map.
- `scrollWheelZoom: boolean | string` (optional): If `true` or `center`, allows the map to be zoomed by using the mouse wheel. If passed 'center', it will zoom to the center of the view regardless of where the mouse was. Defaults to true.
- `useFlyTo: boolean` (optional): boolean to control whether to use flyTo functions for bounds and center. If false `map.fitBounds` and `map.setView` will be used. If true `map.flyToBounds` and `map.flyTo` will be used. Defaults to false.
- `tap: boolean` (optional): If `true`, enables mobile hacks for supporting instant taps (fixing 200ms click delay on iOS/Android) and touch holds (fired as contextmenu events). Defaults to true.
- `touchZoom: boolean | string` (optional): If `true` or `center`, allows the map to be zoomed by touch-dragging with two fingers. If passed 'center', it will zoom to the center of the view regardless of where the touch events (fingers) were. Enabled for touch-capable web browsers except for old Androids.
- `viewport: viewport` (optional): sets the viewport based on the provided value or the `center` and `zoom` properties.
- `zoom: number` (optional if `viewport` is provided with a zoom value)

**Other properties**

- `id: string` (optional): The ID of the `<div>` container for the map.
- `whenReady: () => void` (optional): A function called as soon as the map is ready, see [🍃 Leaflet's documentation](http://leafletjs.com/reference-1.3.4.html#map-whenready) for more information.

**Manipulating the viewport**

React-Leaflet provides two different ways of manipulating the viewport (the map's center and zoom), either setting the `center` and `zoom` properties, or the `viewport` one. These properties are not exclusive, for example providing both the `center` and a `viewport` containing the zoom value would work as expected.

The `center` and `zoom` properties are compared by values. This means for React-Leaflet setting the center to `[51, 0]` is the same as `{lat: 51, lng: 0}`, if you change the `center` property from one to the other, it would have no effect, because the values are the same. This is a technical choice made to support common use cases when layers are added to the map, but the map's viewport shouldn't be reset to its original position, the viewport will only change when the provided `center` or `zoom` values are different from the ones previously provided, _whatever the current map viewport is_.\
These changes can be tracked using the `move` and `moveend` events, so your component can store the current `center` and `zoom` values as the user interacts with the map, and render these updated values so that the state of your component matches the viewport of the map. This means you can reset the map to any position by updating the state of your component.\
The `viewport`, on the other hand, is compared by reference, meaning providing a different object, whatever its values, will trigger the viewport change logic. It is for example possible the do `<Map center={[51,0]} zoom={10} viewport={{}}>` to reset the viewport to the provided `center` and `zoom`, because the `viewport` is a newly created object, and being empty will default it to the `center` and `zoom` properties. Providing `<Map center={[51,0]} zoom={10} viewport={null}>` is equivalent to not providing the `viewport` property and will perform no change.

React-Leaflet provides the `onViewportChange` and `onViewportChanged` callbacks to help apply this behavior, you can see an example usage below:

```javascript
type Viewport = {
  center: [number, number],
  zoom: number,
}

type Props = {
  viewport: Viewport,
}

type State = {
  viewport: Viewport,
}

class MyMap extends Component<Props, State> {
  constructor(props: Props) {
    // Initialize the viewport to the one provided in props
    this.state = {
      viewport: props.viewport,
    }
  }

  componentWillReceiveProps({ viewport }: Props) {
    // When the provided viewport changes, apply it
    if (viewport !== this.props.viewport) {
      this.setState({ viewport })
    }
  }

  onClickReset = () => {
    // Reset to position provided in props
    this.setState({ viewport: this.props.viewport })
  }

  onViewportChanged = (viewport: Viewport) => {
    // The viewport got changed by the user, keep track in state
    this.setState({ viewport })
  }

  render() {
    return (
      <Map
        onClick={this.onClickReset}
        onViewportChanged={this.onViewportChanged}
        viewport={this.state.viewport}>
        ...
      </Map>
    )
  }
}
```

See the [viewport example](https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/viewport.js) for a more complete implementation.

### Pane

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#map-pane) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/Pane.js)

Only children components of the `Pane` component will be added to the corresponding pane. This does not affect the behavior of other Leaflet factories used in these children.

**Dynamic properties**

- `name: string` (optional): Unique name for the pane. Existing Leaflet panes are blacklisted.
- `style: Object` (optional): style property of the pane's `<div>`
- `className: string` (optional): className property of the pane's `<div>`

## UI Layers

### Marker

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#marker) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/Marker.js)

**Dynamic properties**

- `position: latLng` (required)
- `attribution: string` (optional)
- `draggable: boolean` (optional)
- `icon: Leaflet.Icon` (optional)
- `zIndexOffset: number` (optional)
- `opacity: number` (optional)

### Popup

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#popup) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/Popup.js)

**Dynamic properties**

- `attribution: string` (optional)
- `className: string` (optional)
- `onClose: () => void` (optional)
- `onOpen: () => void` (optional)
- `position: latLng` (optional)

### Tooltip

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#tooltip) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/Tooltip.js)

**Dynamic properties**

- `attribution: string` (optional)
- `className: string` (optional)
- `onClose: () => void` (optional)
- `onOpen: () => void` (optional)

## Raster Layers

### TileLayer

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#tilelayer) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/TileLayer.js)

**Dynamic properties**

- `url: string` (required)
- `attribution: string` (optional)
- `opacity: number` (optional)
- `zIndex: number` (optional)

### WMSTileLayer

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#tilelayer-wms) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/WMSTileLayer.js)

**Dynamic properties**

- `url: string` (required)
- `attribution: string` (optional)

ℹ️ All other properties are passed as parameters and dynamic, they will cause the layer to redraw if they change.

### ImageOverlay

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#imageoverlay) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/ImageOverlay.js)

**Dynamic properties**

- `url: string | HTMLImageElement` (required)
- `bounds: bounds` (required)
- `attribution: string` (optional)
- `opacity: number` (optional)
- `zIndex: number` (optional)

### VideoOverlay

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#videooverlay) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/VideoOverlay.js)

**Dynamic properties**

- `url: string | string[] | HTMLVideoElement` (required)
- `bounds: bounds` (required)
- `attribution: string` (optional)
- `opacity: number` (optional)
- `play: boolean` (optional): can be used to declaratively play and pause the video.
- `zIndex: number` (optional)

## Vector Layers

All vector layers extend the [Path component](#path) and therefore accept dynamic
[🍃 Path options](http://leafletjs.com/reference-1.3.4.html#path-options)
properties.

### Circle

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#circle) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/Circle.js)

**Dynamic properties**

- `center: latLng` (required)
- `radius: number` (required)
- `attribution: string` (optional)

### CircleMarker

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#circlemarker) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/CircleMarker.js)

**Dynamic properties**

- `center: latLng` (required)
- `radius: number` (optional)
- `attribution: string` (optional)

### Polyline

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#polyline) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/Polyline.js)

**Dynamic properties**

- `positions: latLngList | latLngList[]` (required)
- `attribution: string` (optional)

### Polygon

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#polygon) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/Polygon.js)

**Dynamic properties**

- `positions: latLngList | latLngList[] | latLngList[][]` (required)
- `attribution: string` (optional)

### Rectangle

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#rectangle) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/Rectangle.js)

**Dynamic properties**

- `bounds: bounds` (required)
- `attribution: string` (optional)

## Other Layers

### FeatureGroup

Extended [LayerGroup](#layergroup) supporting a [Popup](#popup) child.

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#featuregroup) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/FeatureGroup.js)

### GeoJSON

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#geojson) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/GeoJSON.js)

**Properties**

- `data: GeoJSON` (required). This property will _not_ be updated if it is changed after the component is mounted.

**Dynamic properties**

- `attribution: string` (optional)
- `style: Function` (optional).

### GridLayer

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#gridlayer) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/GridLayer.js)

**Dynamic properties**

- `attribution: string` (optional)
- `opacity: number` (optional)
- `zIndex: number` (optional)

### LayerGroup

Use the `LayerGroup` wrapper component to group children layers together.

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#layergroup) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/LayerGroup.js)

## Controls

### AttributionControl

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#control-attribution) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/AttributionControl.js)

**Dynamic properties**

- `position: controlPosition` (optional)

### LayersControl

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#control-layers) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/LayersControl.js)

**Dynamic properties**

- `collapsed: boolean` (optional)
- `position: controlPosition` (optional)

This component exposes two children container components, `LayersControl.BaseLayer` and `LayersControl.Overlay` documented below.\
See the `layers-control` example for a more advanced usage.

Example usage:

```javascript
<LayersControl position="topright">
  <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
    <TileLayer
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
    />
  </LayersControl.BaseLayer>
  <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
    <TileLayer
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  </LayersControl.BaseLayer>
  <LayersControl.Overlay name="Marker with popup">
    <Marker position={[51.51, -0.06]}>
      <Popup>
        <span>
          A pretty CSS3 popup. <br /> Easily customizable.
        </span>
      </Popup>
    </Marker>
  </LayersControl.Overlay>
  <LayersControl.Overlay name="Feature group">
    <FeatureGroup color="purple">
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

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#control-scale) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/ScaleControl.js)

**Dynamic properties**

- `position: controlPosition` (optional)

### ZoomControl

[🍃 Leaflet reference](http://leafletjs.com/reference-1.3.4.html#control-zoom) • [🔍 Source](https://github.com/PaulLeCam/react-leaflet/blob/master/src/ZoomControl.js)

**Dynamic properties**

- `position: controlPosition` (optional)
