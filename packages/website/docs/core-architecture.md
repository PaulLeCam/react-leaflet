---
title: Core architecture
---

## Introduction

This page describes the core architecture by presenting how to build an example `Square` layer component using the APIs provided by React Leaflet's core.

Most of React Leaflet's public APIs are using the core APIs as described in this page to provide their functionalities.

## Identifying necessary Leaflet APIs

The first step to implement a component in React Leaflet is to identify the necessary APIs made available by Leaflet and potentially third-party plugins to achieve the desired functionalities.

For our `Square` component, we'll support two properties: a `center` position and the square's `size`.

By using [Leaflet's `Rectangle` class](https://leafletjs.com/reference.html#rectangle), we can add a rectangle to the map, so this is the base we'll use for our `Square`.
Leaflet's `Rectangle` constructor needs to be provided bounds, so we'll also use the [`toBounds` method of the `LatLng` class](https://leafletjs.com/reference.html#latlng-tobounds) to converts our `center` and `size` props to bounds.

## First version

To get started, let's simply focus on adding the square to the map, using the following code:

```tsx {1-16,26}
function Square(props) {
  const context = useLeafletContext()

  useEffect(() => {
    const bounds = L.latLng(props.center).toBounds(props.size)
    const square = new L.Rectangle(bounds)
    const container = context.layerContainer || context.map
    container.addLayer(square)

    return () => {
      container.removeLayer(square)
    }
  })

  return null
}

const center = [51.505, -0.09]

render(
  <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Square center={center} size={1000} />
  </MapContainer>,
)
```

First, we need to access the context created by the [`MapContainer` component](api-map.md#mapcontainer), by calling the [`useLeafletContext` hook exported by the core APIs](core-api.md#useleafletcontext):

```ts
const context = useLeafletContext()
```

Then, we use [React's `useEffect` hook](https://reactjs.org/docs/hooks-reference.html#useeffect) to create the square instance, using the props to calculate the bounds to provide to [Leaflet's `Rectangle` constructor](https://leafletjs.com/reference.html#rectangle):

```ts
const bounds = L.latLng(props.center).toBounds(props.size)
const square = new L.Rectangle(bounds)
```

The created layer needs to be added to a container provided in the context, either a parent container such as a [`LayerGroup`](api-components.md#layergroup), or the `Map` instance created with the context:

```ts
const container = context.layerContainer || context.map
container.addLayer(square)
```

We also need to return the cleaning up function for the `useEffect` hook, that removes the layer from the container:

```ts
return () => {
  container.removeLayer(square)
}
```

Finally, the `Square` component needs to return a valid React node, but as the rendering of the layer is performed by Leaflet, it only returns `null`.

## Improved update logic

The first version of the code successfully works for simple cases, but it has a drawback: every time the component is rendered, the `useEffect` callback will run and add/remove the square to/from the map, possibly unnecessarily if the props haven't changed.

This is usually not the expected behavior when using React, because the virtual DOM will check what updates are necessary to apply to the DOM. In React Leaflet, DOM rendering is performed by Leaflet, so we need to implement more logic to avoid unnecessary changes to the DOM, as in the following code:

```tsx {1-3,7-8,10-18,20-28}
function getBounds(props) {
  return L.latLng(props.center).toBounds(props.size)
}

function Square(props) {
  const context = useLeafletContext()
  const squareRef = useRef()
  const propsRef = useRef(props)

  useEffect(() => {
    squareRef.current = new L.Rectangle(getBounds(props))
    const container = context.layerContainer || context.map
    container.addLayer(squareRef.current)

    return () => {
      container.removeLayer(squareRef.current)
    }
  }, [])

  useEffect(() => {
    if (
      props.center !== propsRef.current.center ||
      props.size !== propsRef.current.size
    ) {
      squareRef.current.setBounds(getBounds(props))
    }
    propsRef.current = props
  }, [props.center, props.size])

  return null
}

const center = [51.505, -0.09]

render(
  <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Square center={center} size={1000} />
  </MapContainer>,
)
```

First, we extract the function that returns bounds from props, as this logic will be needed in two places:

```ts
function getBounds(props) {
  return L.latLng(props.center).toBounds(props.size)
}
```

We also need to keep references to the Leaflet element instance and the props, by leveraging the [`useRef` hook](https://reactjs.org/docs/hooks-reference.html#useref):

```ts
const squareRef = useRef()
const propsRef = useRef(props)
```

Finally, we separate the logic for adding and removing the layer from the logic to update it, by setting the [dependencies argument of the `useEffect` hook](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect). The first `useEffect` callback will be only called when the component is mounted and unmounted (setting the dependencies to `[]`), while the second `useEffect` callback will be called whenever the props change, and conditionally apply the update to the layer:

```ts
useEffect(() => {
  squareRef.current = new L.Rectangle(getBounds(props))
  const container = context.layerContainer || context.map
  container.addLayer(squareRef.current)

  return () => {
    container.removeLayer(squareRef.current)
  }
}, [])

useEffect(() => {
  if (
    props.center !== propsRef.current.center ||
    props.size !== propsRef.current.size
  ) {
    squareRef.current.setBounds(getBounds(props))
  }
  propsRef.current = props
}, [props.center, props.size])
```

## Element hook factory

The above code gets very repetitive as it's needed for most components in React Leaflet, this is why the core APIs provide functions such as the [`createElementHook` factory](core-api.md#createelementhook) to simplify the process:

```tsx {5-7,9-13,15,19}
function getBounds(props) {
  return L.latLng(props.center).toBounds(props.size)
}

function createSquare(props, context) {
  return { instance: new L.Rectangle(getBounds(props)), context }
}

function updateSquare(instance, props, prevProps) {
  if (props.center !== prevProps.center || props.size !== prevProps.size) {
    instance.setBounds(getBounds(props))
  }
}

const useSquareElement = createElementHook(createSquare, updateSquare)

function Square(props) {
  const context = useLeafletContext()
  const elementRef = useSquareElement(props, context)

  useEffect(() => {
    const container = context.layerContainer || context.map
    container.addLayer(elementRef.current.instance)

    return () => {
      container.removeLayer(elementRef.current.instance)
    }
  }, [])

  return null
}

const center = [51.505, -0.09]

render(
  <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Square center={center} size={1000} />
  </MapContainer>,
)
```

First, instead of having the Leaflet element creation and updating logic in `useEffect` callbacks, we can extract them to standalone functions implementing the [expected interface](core-api.md#createelementhook):

```ts
function createSquare(props, context) {
  return { instance: new L.Rectangle(getBounds(props)), context }
}

function updateSquare(instance, props, prevProps) {
  if (props.center !== prevProps.center || props.size !== prevProps.size) {
    instance.setBounds(getBounds(props))
  }
}
```

Based on these functions, we can create a `useSquareElement` hook:

```ts
const useSquareElement = createElementHook(createSquare, updateSquare)
```

This hook will keep track of the element's instance and props, so a single `useEffect` hook can be used to handle the addition and removal of the layer:

```ts
const elementRef = useSquareElement(props, context)

useEffect(() => {
  const container = context.layerContainer || context.map
  container.addLayer(elementRef.current.instance)

  return () => {
    container.removeLayer(elementRef.current.instance)
  }
}, [])
```

## Layer lifecycle hook

The core APIs provide additional hooks to handle specific pieces of logic. Here, we can replace the `useEffect` hook used previously to add and remove the layer by the [`useLayerLifecycle` hook](core-api.md#uselayerlifecycle):

```tsx {20}
function getBounds(props) {
  return L.latLng(props.center).toBounds(props.size)
}

function createSquare(props, context) {
  return { instance: new L.Rectangle(getBounds(props)), context }
}

function updateSquare(instance, props, prevProps) {
  if (props.center !== prevProps.center || props.size !== prevProps.size) {
    instance.setBounds(getBounds(props))
  }
}

const useSquareElement = createElementHook(createSquare, updateSquare)

function Square(props) {
  const context = useLeafletContext()
  const elementRef = useSquareElement(props, context)
  useLayerLifecycle(elementRef.current, context)

  return null
}

const center = [51.505, -0.09]

render(
  <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Square center={center} size={1000} />
  </MapContainer>,
)
```

## Higher-level createPathHook

The core APIs also provide higher-level factory functions implementing logic shared by different hooks, such as [`createPathHook`](core-api.md#createpathhook).
Here we can extract the logic previously implemented in the component to a hook factory, and simply call the created hook in the component:

```tsx {16,19}
function getBounds(props) {
  return L.latLng(props.center).toBounds(props.size)
}

function createSquare(props, context) {
  return { instance: new L.Rectangle(getBounds(props)), context }
}

function updateSquare(instance, props, prevProps) {
  if (props.center !== prevProps.center || props.size !== prevProps.size) {
    instance.setBounds(getBounds(props))
  }
}

const useSquareElement = createElementHook(createSquare, updateSquare)
const useSquare = createPathHook(useSquareElement)

function Square(props) {
  useSquare(props)
  return null
}

const center = [51.505, -0.09]

render(
  <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Square center={center} size={1000} />
  </MapContainer>,
)
```

[`createPathHook`](core-api.md#createpathhook) also implements further logic, notably calling the [`useEventHandlers`](core-api.md#useeventhandlers) and [`useLayerLifecycle`](core-api.md#uselayerlifecycle) hooks as well.

## Component factory

Following the changes above, we can see that the `Square` component gets very simple as all the logic is implemented in the `useSquare` hook. We can replace it by the [`createLeafComponent` function](core-api.md#createleafcomponent) that implements similar logic:

```tsx {17}
function getBounds(props) {
  return L.latLng(props.center).toBounds(props.size)
}

function createSquare(props, context) {
  return { instance: new L.Rectangle(getBounds(props)), context }
}

function updateSquare(instance, props, prevProps) {
  if (props.center !== prevProps.center || props.size !== prevProps.size) {
    instance.setBounds(getBounds(props))
  }
}

const useSquareElement = createElementHook(createSquare, updateSquare)
const useSquare = createPathHook(useSquareElement)
const Square = createLeafComponent(useSquare)

const center = [51.505, -0.09]

render(
  <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Square center={center} size={1000} />
  </MapContainer>,
)
```

[`createLeafComponent`](core-api.md#createleafcomponent) also provides additional logic in order to make the Leaflet element instance available using React's `ref`.

## Supporting children elements

All the steps above focus on displaying the `Square` element only. However, it is common for React Leaflet components to also have children when possible. Our `Square` being a Leaflet layer, overlays such as [`Popup`](api-components.md#popup) and [`Tooltip`](api-components.md#tooltip) could be attached to it:

```tsx {6-7,18,28-30}
function getBounds(props) {
  return L.latLng(props.center).toBounds(props.size)
}

function createSquare(props, context) {
  const instance = new L.Rectangle(getBounds(props))
  return { instance, context: { ...context, overlayContainer: instance } }
}

function updateSquare(instance, props, prevProps) {
  if (props.center !== prevProps.center || props.size !== prevProps.size) {
    instance.setBounds(getBounds(props))
  }
}

const useSquareElement = createElementHook(createSquare, updateSquare)
const useSquare = createPathHook(useSquareElement)
const Square = createContainerComponent(useSquare)

const center = [51.505, -0.09]

render(
  <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Square center={center} size={1000}>
      <Popup>Hello Popup</Popup>
    </Square>
  </MapContainer>,
)
```

In order to support these overlays, we need to update the `createSquare` function to set the created layer as the context's `overlayContainer`. Note that the `context` object returned **must be a copy** of the one provided in the function arguments, the function **must not mutate** the provided `context`.

```ts
function createSquare(props, context) {
  const instance = new L.Rectangle(getBounds(props))
  return { instance, context: { ...context, overlayContainer: instance } }
}
```

We also need to replace the component factory by one taking care of providing the changed context and rendering the children, [`createContainerComponent`](core-api.md#createcontainercomponent):

```ts
const Square = createContainerComponent(useSquare)
```

In addition to the `createLeafComponent` and `createContainerComponent` functions, [`createOverlayComponent`](core-api.md#createoverlaycomponent) can be used to create overlays such as [`Popup`](api-components.md#popup) and [`Tooltip`](api-components.md#tooltip).

## Higher-level component factory

Most of React Leaflet's APIs are React components abstracting the logic of creating and interacting with Leaflet elements.
The different hooks and factories exposed by the core APIs implement various pieces of logic that need to be combined to create components, and in some cases the same series of functions are used to create different components.

In the previous step, we combine the following three functions to create the component:

```ts
const useSquareElement = createElementHook(createSquare, updateSquare)
const useSquare = createPathHook(useSquareElement)
const Square = createContainerComponent(useSquare)
```

This logic is similar for other types of layers and is therefore provided as a higher-level component factory, [`createPathComponent`](core-api.md#createpathcomponent), as used below:

```tsx {16}
function getBounds(props) {
  return L.latLng(props.center).toBounds(props.size)
}

function createSquare(props, context) {
  const instance = new L.Rectangle(getBounds(props))
  return { instance, context: { ...context, overlayContainer: instance } }
}

function updateSquare(instance, props, prevProps) {
  if (props.center !== prevProps.center || props.size !== prevProps.size) {
    instance.setBounds(getBounds(props))
  }
}

const Square = createPathComponent(createSquare, updateSquare)

const center = [51.505, -0.09]

render(
  <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Square center={center} size={1000}>
      <Popup>Hello Popup</Popup>
    </Square>
  </MapContainer>,
)
```

The core APIs export other [high-level component factories](core-api.md#high-level-component-factories) that can be used in a similar way.
