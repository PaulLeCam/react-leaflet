---
title: Installation
---

## React prerequisites

This documentation assumes you are already familiar with [React](https://reactjs.org/) and have a project setup. If it is not the case, you should read [React's Getting Started documentation](https://reactjs.org/docs/getting-started.html) first.

## Leaflet prerequisites

This documentation assumes you are already familiar with [Leaflet](https://leafletjs.com/). React Leaflet **does not replace Leaflet**, it only provides bindings between React and Leaflet.

This documentation **is not a replacement** for [Leaflet's documentation](https://leafletjs.com/reference-1.7.1.html), it only focuses on aspects specific to React Leaflet.

:::caution Read this before going further
Before using React Leaflet, you must setup your project following [Leaflet's Quick Start Guide](https://leafletjs.com/examples/quick-start/).
:::

## Adding React Leaflet

React, React DOM and Leaflet are required peer dependencies. You must add them to your project if they are not already installed:

```bash
yarn add react react-dom leaflet
```

React Leaflet v3 is not released as a stable version yet. To install it, you must use the `next` tag:

```bash
yarn add react-leaflet@next
```
