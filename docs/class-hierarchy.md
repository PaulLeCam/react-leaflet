---
id: class-hierarchy
title: Class hierarchy
---

The components exposed by React-Leaflet inherit from the following hierarchy.\
Classes indicated as _abstract_ can be extended to create custom components, while other components should be used as provided and cannot be extended.

- `React.Component`
  - `ControlledLayer` (abstract): base class used by `LayersControl` to handle adding and removing its layers.
    - [`LayersControl.BaseLayer`](components.md#layerscontrolbaselayer)
    - [`LayersControl.Overlay`](components.md#layerscontroloverlay)
  - [`MapControl`](components.md#mapcontrol) (abstract): base class for all controls, handles positioning.
    - [`AttributionControl`](components.md#attributioncontrol)
    - [`LayersControl`](components.md#layerscontrol)
    - [`ScaleControl`](components.md#scalecontrol)
    - [`ZoomControl`](components.md#zoomcontrol)
  - [`MapEvented`](components.md#mapevented) (abstract): base class handling extracting and updating Leaflet events.
    - [`Map`](components.md#map): top-level component instantiating a Leaflet map and providing it to its children.
    - [`MapComponent`](components.md#mapcomponent) (abstract): base class handling map panes.
      - [`DivOverlay`](components.md#divoverlay) (abstract)
        - [`Popup`](components.md#popup)
        - [`Tooltip`](components.md#tooltip)
      - [`MapLayer`](components.md#maplayer) (abstract): base class for all map layers, handling adding and removing the layer from the map.
        - [`GridLayer`](components.md#gridlayer) (abstract): base class for tile layers, handles opacity and z-index.
          - [`TileLayer`](components.md#tilelayer)
          - [`WMSTileLayer`](components.md#wmstilelayer)
        - [`ImageOverlay`](components.md#imageoverlay)
        - [`LayerGroup`](components.md#layergroup)
        - [`Marker`](components.md#marker)
        - [`Path`](components.md#path) (abstract): handles styling of vector layers.
          - [`Circle`](components.md#circle)
          - [`CircleMarker`](components.md#circlemarker)
          - [`FeatureGroup`](components.md#featuregroup)
          - [`GeoJSON`](components.md#geojson)
          - [`Polygon`](components.md#polygon)
          - [`Polyline`](components.md#polyline)
          - [`Rectangle`](components.md#rectangle)
