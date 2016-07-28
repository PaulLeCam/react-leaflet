# Extending

## Creating custom components

React-Leaflet aims to provide all the controls and layers provided by Leaflet, but it does not support any Leaflet plugin.  
Adding layers and behaviors provided by plugins in your application should be relatively easy by extending one of the components provided by React-Leaflet (see the class hierarchy below to find the most relevant component to extend) and implementing the relevant lifecycle methods.  
Make sure to read the [how it works page](How%20it%20works.md) of this documentation to understand what your custom component should use and eventually provide.

## Class hierarchy

- `React.Component`
  - `ControlledLayer`: base class used by `LayersControl` to handle adding and removing its layers.
    - [`LayersControl.BaseLayer`](Components.md#layerscontrolbaselayer)
    - [`LayersControl.Overlay`](Components.md#layerscontroloverlay)
  - [`MapComponent`](Components.md#mapcomponent): base class handling extracting and updating Leaflet events.
    - [`Map`](Components.md#map): top-level component instantiating a Leaflet map and providing it to its children.
    - [`MapLayer`](Components.md#maplayer): base class for all map layers, handling adding and removing the layer from the map.
      - [`GridLayer`](Components.md#gridlayer): base class for tile layers, handles opacity and z-index.
        - [`CanvasTileLayer`](Components.md#canvastilelayer)
        - [`TileLayer`](Components.md#tilelayer)
        - [`WMSTileLayer`](Components.md#wmstilelayer)
      - [`ImageOverlay`](Components.md#imageoverlay)
      - [`LayerGroup`](Components.md#layergroup)
      - [`Marker`](Components.md#marker)
      - [`Path`](Components.md#path): handles styling of vector layers.
        - [`Circle`](Components.md#circle)
        - [`CircleMarker`](Components.md#circlemarker)
        - [`FeatureGroup`](Components.md#featuregroup)
        - [`GeoJson`](Components.md#geojson)
        - [`MultiPolygon`](Components.md#multipolygon)
        - [`MultiPolyline`](Components.md#multipolyline)
        - [`Polygon`](Components.md#polygon)
        - [`Polyline`](Components.md#polyline)
        - [`Rectangle`](Components.md#rectangle)
    - [`Popup`](Components.md#popup)
  - [`MapControl`](Components.md#mapcontrol): base class for all controls, handles positioning.
    - [`AttributionControl`](Components.md#attributioncontrol)
    - [`LayersControl`](Components.md#layerscontrol)
    - [`ScaleControl`](Components.md#scalecontrol)
    - [`ZoomControl`](Components.md#zoomcontrol)
