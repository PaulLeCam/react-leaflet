---
title: Introduction
---

## Core concepts

React Leaflet provides bindings between React and Leaflet. It **does not replace Leaflet**, but leverages it to abstract Leaflet layers as React components. As such, it can behave differently from how other React components work, notably:

### DOM rendering

React **does not** render Leaflet layers to the DOM, this rendering is done by Leaflet itself.
React only renders a `<div>` element when rendering the [`MapContainer` component](api-map.md#mapcontainer), the contents of [UI layers components](api-components.md#ui-layers).

### Component properties

The properties passed to the components are used to create the relevant Leaflet instance when the component is rendered the first time and should be treated as **immutable by default**.

During the first render, all these properties should be supported as they are by Leaflet, **however they will not be updated in the UI when they change** unless they are explicitely documented as being **mutable**.

Mutable properties changes are compared by reference (unless stated otherwise) and are applied calling the relevant method on the Leaflet element instance.

### React context

React Leaflet uses [React's context API](https://reactjs.org/docs/context.html) to make some Leaflet elements instances available to children elements that need it.

Each Leaflet map instance has its own React context, created by the [`MapContainer` component](api-map.md#mapcontainer). Other components and hooks provided by React Leaflet can only be used as descendants of a `MapContainer`.

## Lifecycle process

1. The `MapContainer` renders a container `<div>` element for the map. If the `placeholder` prop is set, it will be rendered inside the container `<div>`.
1. The `MapContainer` instantiates a Leaflet Map for the created `<div>` with the component properties and creates the React context containing the map instance.
1. The `MapContainer` renders its children components.
1. Each child component instantiates the matching Leaflet instance for the element using the component properties and context, and adds it to the map.
1. When a child component is rendered again, changes to its supported mutable props are applied to the map.
1. When a component is removed from the render tree, it removes its layer from the map as needed.

## Limitations

- Leaflet makes direct calls to the DOM when it is loaded, therefore React Leaflet is not compatible with server-side rendering.
- The components exposed are abstractions for Leaflet layers, not DOM elements. Some of them have properties that can be updated directly by calling the setters exposed by Leaflet while others should be completely replaced, by setting an unique value on their `key` property so they are properly handled by React's algorithm.
