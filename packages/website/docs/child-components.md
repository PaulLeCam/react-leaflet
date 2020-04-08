---
title: Child components
---

:::warning MapContainer required
Child components can only be used as decendants of a `MapContainer` component.
:::

## Props

Child components in React Leaflet use their props as options when creating the corresponding Leaflet instance, as described in [Leaflet's documentation](https://leafletjs.com/reference-1.6.0.html).

By default these props should be treated as **immutable**, only the props explicitely documented as **mutable** in this page will affect the Leaflet element when changed.

Some props used by [common behaviors](#behaviors) between components are documented in the dedicated section rather than being duplicated in the documentation of individual components.

## Behaviors

Child components in React Leaflet support common behaviors described below, implementing logic related to React or Leaflet.

### Referenceable behavior

Makes the Leaflet instance for the given component accessible with the [`useRef()` hook](https://reactjs.org/docs/hooks-reference.html#useref).

```tsx Example component with Referenceable behavior
function MyComponent() {
  const cicleRef = useRef()

  useEffect(() => {
    const radius = circleRef.current.getRadius()
  })

  return <Circle ref={cicleRef} center={[50.5, 30.5]} radius={200} />
}
```

### ParentComponent behavior

The component will render its mutable React children components, based on the `children?: ReactNode` prop.

```tsx Example component with ParentComponent behavior
<Marker position={[50.5, 30.5]}>
  <Popup>Hello world</Popup>
</Marker>
```

### Evented behavior

Adds support for the `eventHandlers?: LeafletEventHandlerFnMap` prop, adding and removing event listeners.

```tsx Example component with Evented behavior
<Marker
  position={[50.5, 30.5]}
  evenHandlers={{
    click: () => {
      console.log('marker clicked')
    },
  }}
/>
```

### Attribution behavior

Applies to layer components, making their [`attribution`](https://leafletjs.com/reference-1.6.0.html#layer-attribution) prop mutable.

```tsx Example component with Attribution behavior
<GeoJSON attribution="&copy; credits due..." data={...} />
```

### Path behavior

Applies to [vector layer components](#vector-layers), adding support for a [`pathOptions: PathOptions`](https://leafletjs.com/reference-1.6.0.html#path) mutable prop.

```tsx Example component with PathOptions behavior
<Circle center={[50.5, 30.5]} radius={200} pathOptions={{ color: 'blue' }} />
```

### MediaOverlay behavior

Applies to components using [Leaflet's ImageOverlay class](https://leafletjs.com/reference-1.6.0.html#imageoverlay), adding support for mutable `bounds: LatLngBoundsExpression`, [`opacity`](https://leafletjs.com/reference-1.6.0.html#imageoverlay-opacity) and [`zIndex`](https://leafletjs.com/reference-1.6.0.html#imageoverlay-zindex) props.

```tsx Example component with MediaOverlay behavior
<ImageOverlay
  url="http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
  bounds={[
    [40.712216, -74.22655],
    [40.773941, -74.12544],
  ]}
  opacity={0.5}
  zIndex={10}
/>
```

### CircleMarker behavior

Applies to components using [Leaflet's CircleMarker class](https://leafletjs.com/reference-1.6.0.html#circlemarker), adding support for mutable `center: LatLngExpression` and [`radius`](https://leafletjs.com/reference-1.6.0.html#circlemarker-radius) props.

```tsx Example component with CircleMarker behavior
<Circle center={[50.5, 30.5]} radius={200} />
```

### GridLayer behavior

Applies to components using [Leaflet's GridLayer class](https://leafletjs.com/reference-1.6.0.html#gridlayer), adding support for mutable [`opacity`](https://leafletjs.com/reference-1.6.0.html#gridlayer-opacity) and [`zIndex`](https://leafletjs.com/reference-1.6.0.html#gridlayer-zindex) props.

```tsx Example component with GridLayer behavior
<TileLayer url="..." opacity={0.5} zIndex={10} />
```

### Control behavior

Applies to [control components](#controls), making their [`position`](https://leafletjs.com/reference-1.6.0.html#control-position) prop mutable.

```tsx Example component with Control behavior
<ZoomControl position="bottomleft" />
```

## UI layers

### Marker

[Leaflet reference](http://leafletjs.com/reference-1.6.0.html#marker)

**Behaviors**: [Referenceable](#referenceable-behavior) | [ParentComponent](#parentcomponent-behavior) | [Evented](#evented-behavior) | [Attribution](#attribution-behavior)

**Required props**

- `position: LatLngExpression`

**Mutable props**

- `draggable?: boolean`
- `icon?: Leaflet.Icon`
- `opacity?: number`
- `position: LatLngExpression`
- `zIndexOffset?: number`

### Popup

[Leaflet reference](http://leafletjs.com/reference-1.6.0.html#popup)

**Behaviors**: [Referenceable](#referenceable-behavior) | [ParentComponent](#parentcomponent-behavior) | [Evented](#evented-behavior) | [Attribution](#attribution-behavior)

**Mutable props**

- `onClose?: () => void`
- `onOpen?: () => void`
- `position?: LatLngExpression`

### Tooltip

[Leaflet reference](http://leafletjs.com/reference-1.6.0.html#tooltip)

**Behaviors**: [Referenceable](#referenceable-behavior) | [ParentComponent](#parentcomponent-behavior) | [Evented](#evented-behavior) | [Attribution](#attribution-behavior)

**Mutable props**

- `onClose?: () => void`
- `onOpen?: () => void`
- `position?: LatLngExpression`

## Raster layers

### TileLayer

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#tilelayer)

**Behaviors**: [Referenceable](#referenceable-behavior) | [Evented](#evented-behavior) | [GridLayer](#gridlayer-behavior)

**Required props**

- `url: string`

### WMSTileLayer

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#tilelayer-wms)

**Behaviors**: [Referenceable](#referenceable-behavior) | [Evented](#evented-behavior) | [GridLayer](#gridlayer-behavior)

**Required props**

- `url: string`

**Mutable props**

- `params?: WMSParams`

### ImageOverlay

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#imageoverlay)

**Behaviors**: [Referenceable](#referenceable-behavior) | [ParentComponent](#parentcomponent-behavior) | [Evented](#evented-behavior) | [Attribution](#attribution-behavior) | [MediaOverlay](#mediaoverlay-behavior)

**Required props**

- `bounds: LatLngBoundsExpression`
- `url: string`

### VideoOverlay

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#videooverlay)

**Behaviors**: [Referenceable](#referenceable-behavior) | [Evented](#evented-behavior) | [Attribution](#attribution-behavior) | [MediaOverlay](#mediaoverlay-behavior)

**Required props**

- `bounds: LatLngBoundsExpression`
- `url: string | string[] | HTMLVideoElement`

**Mutable props**

- `play?: boolean`
- `url: string | string[] | HTMLVideoElement`

## Vector layers

### Circle

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#circle)

**Behaviors**: [Referenceable](#referenceable-behavior) | [ParentComponent](#parentcomponent-behavior) | [Evented](#evented-behavior) | [Attribution](#attribution-behavior) | [CircleMarker](#circlemarker-behavior)

**Required props**

- `center: LatLngExpression`

### CircleMarker

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#circlemarker)

**Behaviors**: [Referenceable](#referenceable-behavior) | [ParentComponent](#parentcomponent-behavior) | [Evented](#evented-behavior) | [Attribution](#attribution-behavior) | [CircleMarker](#circlemarker-behavior)

**Required props**

- `center: LatLngExpression`

### Polyline

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#polyline)

**Behaviors**: [Referenceable](#referenceable-behavior) | [ParentComponent](#parentcomponent-behavior) | [Evented](#evented-behavior) | [Attribution](#attribution-behavior)

**Required props**

- `positions: LatLngExpression[] | LatLngExpression[][]`

**Mutable props**

- `positions: LatLngExpression[] | LatLngExpression[][]`

### Polygon

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#polygon)

**Behaviors**: [Referenceable](#referenceable-behavior) | [ParentComponent](#parentcomponent-behavior) | [Evented](#evented-behavior) | [Attribution](#attribution-behavior)

**Required props**

- `positions: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]`

**Mutable props**

- `positions: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]`

### Rectangle

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#rectangle)

**Behaviors**: [Referenceable](#referenceable-behavior) | [ParentComponent](#parentcomponent-behavior) | [Evented](#evented-behavior) | [Attribution](#attribution-behavior)

**Required props**

- `bounds: LatLngBoundsExpression`

**Mutable props**

- `bounds: LatLngBoundsExpression`

### SVGOverlay

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#svgoverlay)

**Behaviors**: [Referenceable](#referenceable-behavior) | [ParentComponent](#parentcomponent-behavior) | [Evented](#evented-behavior) | [Attribution](#attribution-behavior)

## Other layers

### LayerGroup

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#layergroup)

**Behaviors**: [Referenceable](#referenceable-behavior) | [ParentComponent](#parentcomponent-behavior) | [Evented](#evented-behavior) | [Attribution](#attribution-behavior)

### FeatureGroup

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#featuregroup)

**Behaviors**: [Referenceable](#referenceable-behavior) | [ParentComponent](#parentcomponent-behavior) | [Evented](#evented-behavior) | [Attribution](#attribution-behavior)

### GeoJSON

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#geojson)

**Behaviors**: [Referenceable](#referenceable-behavior) | [ParentComponent](#parentcomponent-behavior) | [Evented](#evented-behavior) | [Attribution](#attribution-behavior)

**Required props**

- `data: GeoJsonObject`

## Controls

### ZoomControl

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#control-zoom)

**Behaviors**: [Referenceable](#referenceable-behavior) | [Evented](#evented-behavior) | [Control](#control-behavior)

### AttributionControl

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#control-attribution)

**Behaviors**: [Referenceable](#referenceable-behavior) | [Evented](#evented-behavior) | [Control](#control-behavior)

### LayersControl

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#control-layers)

**Behaviors**: [Referenceable](#referenceable-behavior) | [Evented](#evented-behavior) | [Control](#control-behavior)

**Mutable props**

- `collapsed?: boolean`

### LayersControl.BaseLayer

**Behaviors**: [ParentComponent](#parentcomponent-behavior)

**Required props**

- `name: string`

**Mutable props**

- `checked?: boolean`

### LayersControl.Overlay

**Behaviors**: [ParentComponent](#parentcomponent-behavior)

**Required props**

- `name: string`

**Mutable props**

- `checked?: boolean`

### ScaleControl

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#control-scale)

**Behaviors**: [Referenceable](#referenceable-behavior) | [Evented](#evented-behavior) | [Control](#control-behavior)

## Other

### Pane

[Leaflet reference](https://leafletjs.com/reference-1.6.0.html#map-pane)

**Behaviors**: [ParentComponent](#parentcomponent-behavior)

**Required props**

- `name: string`: unique name for the pane, that must be different from the [default Leaflet pane names](https://leafletjs.com/reference-1.6.0.html#map-pane)

**Mutable props**

- `className?: string`
- `style?: CSSProperties`
