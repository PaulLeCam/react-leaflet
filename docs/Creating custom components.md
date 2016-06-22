# Creating custom components

## Class hierarchy

- `React.Component`
  - `ControlledLayer`: base class used by `LayersControl` to handle adding and removing its layers.
    - `BaseLayer`
    - `Overlay`
  - `MapComponent`: base class handling extracting and updating Leaflet events.
    - `Map`: top-level component instantiating a Leaflet map and providing it to its children.
    - `MapLayer`: base class for all map layers, handling adding and removing the layer from the map.
      - `BaseTileLayer`: base class for tile layers, handles opacity and z-index.
        - [`CanvasTileLayer`](Components.md#canvastilelayer)
        - [`TileLayer`](Components.md#tilelayer)
        - [`WMSTileLayer`](Components.md#wmstilelayer)
      - [`ImageOverlay`](Components.md#imageoverlay)
      - [`LayerGroup`](Components.md#layergroup)
      - [`Marker`](Components.md#marker)
      - `Path`: handles styling of vector layers.
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
  - `MapControl`: base class for all controls, handles positioning.
    - [`AttributionControl`](Components.md#attributioncontrol)
    - [`LayersControl`](Components.md#layerscontrol)
    - [`ScaleControl`](Components.md#scalecontrol)
    - [`ZoomControl`](Components.md#zoomcontrol)
