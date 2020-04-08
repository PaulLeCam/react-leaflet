---
title: Map creation and interactions
---

## MapContainer

The `MapContainer` component is responsible for creating the [Leaflet Map](https://leafletjs.com/reference-1.6.0.html#map) instance and providing it to its [child components](child-components.md), using a [React Context](https://reactjs.org/docs/context.html).

When creating a `MapContainer` element, its props are used as options to [create the Map instance](https://leafletjs.com/reference-1.6.0.html#map-l-map).

The following additional props are supported:

- `bounds?: LatLngBoundsExpression`
- `boundsOptions?: FitBoundsOptions`
- `children?: ReactNode`
- `className?: string`
- `id?: string`
- `style?: CSSProperties`
- `whenCreated?: (map: Leaflet.Map) => void`
- `whenReady?: () => void`

Except for its `children`, `MapContainer` props are **immutable**: changing them after they have been set a first time will have no effect on the Map instance or its container.  
The Leaflet `Map` instance created by the `MapContainer` element can be accessed by [child components](child-components.md) using one of [the provided hooks](#hooks) or the [`MapConsumer` component](#mapconsumer).

## Hooks

### useMap

Hook providing the Leaflet `Map` instance in any descendant of a [`MapContainer`](#mapcontainer).

```tsx
function MyComponent() {
  const map = useMap()
  console.log('map center:', map.getCenter())
  return null
}

function MyMapComponent() {
  return (
    <MapContainer>
      <MyComponent />
    </MapContainer>
  )
}
```

### useMapEvents

Hook attaching the provided `LeafletEventHandlerFnMap` event handlers to the map instance and returning the instance in any descendant of a [`MapContainer`](#mapcontainer).

```tsx
function MyComponent() {
  const map = useMapEvents({
    click: () => {
      map.locate()
    },
    locationfound: (location) => {
      console.log('location found:', location)
    },
  })
  return null
}

function MyMapComponent() {
  return (
    <MapContainer>
      <MyComponent />
    </MapContainer>
  )
}
```

### useMapEvent

Hook attaching a single event handler to the map instance and returning the instance in any descendant of a [`MapContainer`](#mapcontainer).

```tsx
function MyComponent() {
  const map = useMapEvent('click', () => {
    map.setCenter([50.5, 30.5])
  })
  return null
}

function MyMapComponent() {
  return (
    <MapContainer>
      <MyComponent />
    </MapContainer>
  )
}
```

## MapConsumer

Component using the [render prop](https://reactjs.org/docs/render-props.html) technique to provide the Leaflet `Map` instance in any descendant of a [`MapContainer`](#mapcontainer).

```tsx
function MyMapComponent() {
  return (
    <MapContainer>
      <MapConsumer>
        {(map) => {
          console.log('map center:', map.getCenter())
          return null
        }}
      <MapConsumer>
    </MapContainer>
  )
}
```
