---
title: Core API
---

## Interfaces and types

### ControlledLayer

```ts
interface ControlledLayer {
  addLayer(layer: Layer): void
  removeLayer(layer: Layer): void
}
```

### LeafletContextInterface

```ts
interface LeafletContextInterface {
  map: Map
  layerContainer?: ControlledLayer | LayerGroup
  layersControl?: Control.Layers
  overlayContainer?: Layer
  pane?: string
}
```

### LeafletElement

```ts
interface LeafletElement<T, C = any> {
  instance: T
  context: LeafletContextInterface
  container?: C | null
}
```

### ElementHook

```ts
type ElementHook<E, P> = (
  props: P,
  context: LeafletContextInterface,
) => MutableRefObject<LeafletElement<E>>
```

### DivOverlay

```ts
type DivOverlay = Popup | Tooltip
```

### SetOpenFunc

```ts
type SetOpenFunc = (open: boolean) => void
```

### DivOverlayLifecycleHook

```ts
type DivOverlayLifecycleHook<E, P> = (
  element: LeafletElement<E>,
  context: LeafletContextInterface,
  props: P,
  setOpen: SetOpenFunc,
) => void
```

### DivOverlayHook

```ts
type DivOverlayHook<E extends DivOverlay, P> = (
  useElement: ElementHook<E, P>,
  useLifecycle: DivOverlayLifecycleHook<E, P>,
) => (props: P, setOpen: SetOpenFunc) => ReturnType<ElementHook<E, P>>
```

### EventedProps

```ts
interface EventedProps {
  eventHandlers?: LeafletEventHandlerFnMap
}
```

### LayerProps

```ts
interface LayerProps extends EventedProps, LayerOptions {}
```

### PathProps

```ts
interface PathProps extends EventedProps {
  pathOptions?: PathOptions
}
```

### CircleMarkerProps

```ts
interface CircleMarkerProps extends CircleMarkerOptions, PathProps {
  center: LatLngExpression
  children?: ReactNode
}
```

### MediaOverlayProps

```ts
interface MediaOverlayProps extends ImageOverlayOptions, EventedProps {
  bounds: LatLngBoundsExpression
}
```

### PropsWithChildren

```ts
interface PropsWithChildren {
  children?: ReactNode
}
```

### EventedWithChildrenProps

```ts
interface EventedWithChildrenProps extends EventedProps, PropsWithChildren {}
```

### PathWithChildrenProps

```ts
interface PathWithChildrenProps extends PathProps, PropsWithChildren {}
```

## Context

### LeafletContext

[React Context](https://reactjs.org/docs/context.html) used by React Leaflet, implementing the [`LeafletContextInterface`](#leafletcontextinterface)

### LeafletProvider

`LeafletContext.Provider` component.

### useLeafletContext

[React Hook](https://reactjs.org/docs/hooks-intro.html) returning the [`LeafletContext`](#leafletcontext). Calling this hook will throw an error if the context is not provided.

## Hook factories

The following functions return [React hooks](https://reactjs.org/docs/hooks-intro.html) for specific purposes.

### createElementHook

**Type parameters**

1. `E`: Leaflet's element class type
1. `P`: the component's props
1. `C = any`: the element's container, if relevant

**Arguments**

1. `createElement: (props: P, context: LeafletContextInterface) => LeafletElement<E>`
1. `updateElement?: (instance: E, props: P, prevProps: P) => void`

**Returns** [`ElementHook<E, P>`](#elementhook)

### createControlHook

**Type parameters**

1. `E extends Control`: Leaflet's element class type
1. `P extends ControlOptions`: the component's props

**Arguments**

1. `useElement: ElementHook<E, P>`

**Returns** [`ElementHook<E, P>`](#elementhook)

### createDivOverlayHook

**Type parameters**

1. `E extends DivOverlay`: Leaflet's element class type
1. `P extends EventedProps`: the component's props

**Arguments**

1. `useElement: ElementHook<E, P>`
1. `useLifecycle: DivOverlayLifecycleHook<E, P>`

**Returns** [`ElementHook<E, P>`](#elementhook)

### createLayerHook

**Type parameters**

1. `E extends Layer`: Leaflet's element class type
1. `P extends LayerProps`: the component's props

**Arguments**

1. `useElement: ElementHook<E, P>`

**Returns** [`ElementHook<E, P>`](#elementhook)

### createPathHook

**Type parameters**

1. `E extends FeatureGroup | Path`: Leaflet's element class type
1. `P extends PathProps`: the component's props

**Arguments**

1. `useElement: ElementHook<E, P>`

**Returns** [`ElementHook<E, P>`](#elementhook)

## Lifecycle hooks

These hooks implement specific pieces of logic used by multiple components.

### useEventHandlers

This hook adds support for the `eventHandlers` prop, adding and removing event listeners as needed.

**Arguments**

1. `element: LeafletElement<Evented>`
1. `eventHandlers: LeafletEventHandlerFnMap | null | undefined`

**Returns** `void`

### useLayerLifecycle

This hook adds support for adding and removing the layer to/from its parent container or the map.

**Arguments**

1. `element: LeafletElement<Layer>`
1. `context: LeafletContextInterface`

**Returns** `void`

### usePathOptions

This hook adds support for the `pathOptions` prop, updating the layer as needed.

**Arguments**

1. `element: LeafletElement<FeatureGroup | Path>`
1. `props: PathProps`

**Returns** `void`

## Update functions

Shared update logic for different components.

### updateCircle

Updates the circle's `center` and `radius` if the props change.

**Type parameters**

1. `E extends CircleMarker`: Leaflet's element class type
1. `P extends CircleMarkerProps`: the component's props

**Arguments**

1. `layer: E`
1. `props: P`
1. `prevProps: P`

**Returns** `void`

### updateGridLayer

Updates the layer's `opacity` and `zIndex` if the props change.

**Type parameters**

1. `E extends GridLayer`: Leaflet's element class type
1. `P extends GridLayerOptions`: the component's props

**Arguments**

1. `layer: E`
1. `props: P`
1. `prevProps: P`

**Returns** `void`

### updateMediaOverlay

Updates the overlay's `bounds`, `opacity` and `zIndex` if the props change.

**Type parameters**

1. `E extends ImageOverlay | SVGOverlay | VideoOverlay`: Leaflet's element class type
1. `P extends MediaOverlayProps`: the component's props

**Arguments**

1. `overlay: E`
1. `props: P`
1. `prevProps: P`

**Returns** `void`

## DOM interactions

Utility functions to change the class of a `HTMLElement`.

### addClassName

**Arguments**

1. `element: HTMLElement`
1. `className: string`

**Returns** `void`

### removeClassName

**Arguments**

1. `element: HTMLElement`
1. `className: string`

**Returns** `void`

### updateClassName

**Arguments**

1. `element?: HTMLElement`
1. `prevClassName?: string`
1. `nextClassName?: string`

**Returns** `void`

## Component factories

These functions create components from the provided element hook.

### createContainerComponent

**Type parameters**

1. `E`: Leaflet's element class type
1. `P extends PropsWithChildren`: the component's props

**Arguments**

1. `useElement: ElementHook<E, P>`

**Returns** `ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>`

### createDivOverlayComponent

**Type parameters**

1. `E extends DivOverlay`: Leaflet's element class type
1. `P extends PropsWithChildren`: the component's props

**Arguments**

1. `useElement: ReturnType<DivOverlayHook<E, P>>`

**Returns** `ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>`

### createLeafComponent

**Type parameters**

1. `E`: Leaflet's element class type
1. `P`: the component's props

**Arguments**

1. `useElement: ElementHook<E, P>`

**Returns** `ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>`

## High-level component factories

These functions combine hooks and component factories to provide high-level factories for common component types.

### createControlComponent

**Type parameters**

1. `E extends Control`: Leaflet's element class type
1. `P extends ControlOptions`: the component's props

**Arguments**

1. `createInstance: (props: P) => E`

**Returns** `ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>`

### createLayerComponent

**Type parameters**

1. `E extends Layer`: Leaflet's element class type
1. `P extends EventedWithChildrenProps`: the component's props

**Arguments**

1. `createElement: (props: P, context: LeafletContextInterface) => LeafletElement<E>`
1. `updateElement?: (instance: E, props: P, prevProps: P) => void`

**Returns** `ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>`

### createOverlayComponent

**Type parameters**

1. `E extends DivOverlay`: Leaflet's element class type
1. `P extends EventedWithChildrenProps`: the component's props

**Arguments**

1. `createElement: (props: P, context: LeafletContextInterface) => LeafletElement<E>`
1. `useLifecycle: DivOverlayLifecycleHook<E, P>`

**Returns** `ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>`

### createPathComponent

**Type parameters**

1. `E extends FeatureGroup | Path`: Leaflet's element class type
1. `P extends PathWithChildrenProps`: the component's props

**Arguments**

1. `createElement: (props: P, context: LeafletContextInterface) => LeafletElement<E>`
1. `updateElement?: (instance: E, props: P, prevProps: P) => void`

**Returns** `ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>`

### createTileLayerComponent

**Type parameters**

1. `E extends Layer`: Leaflet's element class type
1. `P extends EventedProps`: the component's props

**Arguments**

1. `createElement: (props: P, context: LeafletContextInterface) => LeafletElement<E>`
1. `updateElement?: (instance: E, props: P, prevProps: P) => void`

**Returns** `ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>`
