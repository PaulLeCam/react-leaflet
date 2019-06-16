---
id: version-v2-events
title: Events
original_id: events
---

Leaflet exposes its own events, different from React. You can listen to them using React-Leaflet by adding a callback to a property prefixed by `on`. Ex: `<Map onMoveend={this.handleMoveend}>...</Map>`.\
The event name is normalized, so the above example would work using the `onmoveend`, `onMoveend`, `onMoveEnd` or another naming preference for the property.

Check [🍃 Leaflet's documentation](http://leafletjs.com/reference-1.5.0.html) for the events associated to each component.
