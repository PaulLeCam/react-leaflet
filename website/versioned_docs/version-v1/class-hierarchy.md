---
id: version-v1-class-hierarchy
title: Class hierarchy
original_id: class-hierarchy
---

The components exposed by React-Leaflet inherit from the following hierarchy:

* `React.Component`
  * `ControlledLayer`: base class used by `LayersControl` to handle adding and
    removing its layers.
    * [`LayersControl.BaseLayer`](components.md#layerscontrolbaselayer)
    * [`LayersControl.Overlay`](components.md#layerscontroloverlay)
  * [`MapComponent`](components.md#mapcomponent): base class handling extracting
    and updating Leaflet events.
    * [`DivOverlay`](components.md#divoverlay)
      * [`Popup`](components.md#popup)
      * [`Tooltip`](components.md#tooltip)
    * [`Map`](components.md#map): top-level component instantiating a Leaflet
      map and providing it to its children.
    * [`MapLayer`](components.md#maplayer): base class for all map layers,
      handling adding and removing the layer from the map.
      * [`GridLayer`](components.md#gridlayer): base class for tile layers,
        handles opacity and z-index.
        * [`TileLayer`](components.md#tilelayer)
        * [`WMSTileLayer`](components.md#wmstilelayer)
      * [`ImageOverlay`](components.md#imageoverlay)
      * [`LayerGroup`](components.md#layergroup)
      * [`Marker`](components.md#marker)
      * [`Path`](components.md#path): handles styling of vector layers.
        * [`Circle`](components.md#circle)
        * [`CircleMarker`](components.md#circlemarker)
        * [`FeatureGroup`](components.md#featuregroup)
        * [`GeoJSON`](components.md#geojson)
        * [`Polygon`](components.md#polygon)
        * [`Polyline`](components.md#polyline)
        * [`Rectangle`](components.md#rectangle)
  * [`MapControl`](components.md#mapcontrol): base class for all controls,
    handles positioning.
    * [`AttributionControl`](components.md#attributioncontrol)
    * [`LayersControl`](components.md#layerscontrol)
    * [`ScaleControl`](components.md#scalecontrol)
    * [`ZoomControl`](components.md#zoomcontrol)
