---
id: hooks
title: Hooks
---

Starting with version 2.2.2, React-Leaflet leverages the new [Hooks API](https://reactjs.org/docs/hooks-intro.html) introduced in React v16.8.

The `useLeaflet()` hook returns Object of the following Flow type:

```javascript
type LeafletContext = {
  map?: Map,
  pane?: ?string,
  layerContainer?: ?LayerContainer,
  popupContainer?: ?Layer,
}
```

The same type is returned by the leaflet [context](context.md).
