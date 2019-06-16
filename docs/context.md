---
id: context
title: Context
---

Starting with version 2, React-Leaflet leverages the new [Context API](https://reactjs.org/docs/context.html#api) introduced in React v16.3.

The context Object has the following Flow type:

```javascript
type LeafletContext = {
  map?: Map,
  pane?: ?string,
  layerContainer?: ?LayerContainer,
  popupContainer?: ?Layer,
}
```

The context provider and consumer are exported as `LeafletProvider` and `LeafletConsumer`, along with a `withLeaflet(Component: ComponentType<*>) => ComponentType<*>` [higher-order component](https://reactjs.org/docs/higher-order-components.html) factory that can be used to wrap [custom components](custom-components.md). This wrapper injects the context as the `leaflet` prop.

All the [controls and layers exported by React-Leaflet](components.md) use this wrapper, your application should only need to use these APIs in specific cases.

Starting with version 2.3, the `useLeaflet()` [hook](https://reactjs.org/docs/hooks-intro.html) can also be used to access the `LeafletContext` object.
