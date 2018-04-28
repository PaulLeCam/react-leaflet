---
id: version-v1-intro
title: Introduction
original_id: intro
---

## Core concepts

React-Leaflet uses
[⚛️ React's lifecycle methods](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods)
to call the relevant Leaflet handlers, which has a few consequences:

### DOM rendering

React **does not** render Leaflet layers to the DOM, this rendering is done by
Leaflet itself.\
React only renders the map container for the [Map component](components.md#map) and
potentially empty `<div>` elements for components having multiple children.

### Component properties

The properties passed to the components are used to create the relevant Leaflet
instance when the component will mount. When adding a component, all these
properties should be supported as they are by Leaflet, **however they will not
be updated in the UI when they change** unless they are referenced in the
documentation as _dynamic_, which are the ones handled by the components to call
the relevant Leaflet method to update it.\
Dynamic properties changes are compared by reference, except for properties documenting
how their changes are compared in other ways.

### Component context

React-Leaflet uses [⚛️ React's context API](https://facebook.github.io/react/docs/context.html) to make
Leaflet elements available to other element that need it.\
If you create custom components, you may need to access the following instances from
the context:

* `map`: The `Leaflet.Map` instance created by the `<Map>` component.
* `layerContainer`: The containing layer, for example a `LayerGroup` instance.
  Defaults to the `map` value if no other container is set.
* `popupContainer`: The layer that could contain a popup.

## Lifecycle process

1. The top-level `Map` renders an empty `<div>` to contain the map.
1. The `Map`'s `componentDidMount()` handler instantiates a `Leaflet.Map()` for
   the created `<div>` with the component properties and sets this instance in
   state. This instance is made available in the context.
1. The `Map`'s `render()` handler is executed again, this time rendering its
   children components.
1. For each child component, the `componentWillMount()` handler is called and
   instantiates the relevant Leaflet instance for this element using the
   component properties and context.
1. The `render()` handler for each child is called, either returning `null` or
   rendering its own children.
1. When the `componentDidUpdate()` handler of a component is called, it updates
   its Leaflet instance according to its supported _dynamic_ properties.
1. When the `componentWillUnmount()` handler of a component is called, it
   removes its layer from the map if relevant.

## Limitations

* Leaflet makes direct calls to the DOM when it is loaded, therefore this
  library is not compatible with server-side rendering.
* The components exposed are abstractions for Leaflet layers, not DOM elements.
  Some of them have properties that can be updated directly by calling the
  setters exposed by Leaflet while others should be completely replaced, by
  setting an unique value on their `key` property so that they are properly
  handled by React's algorithm.
