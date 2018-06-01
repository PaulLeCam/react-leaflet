---
id: installation
title: Installation
---

⚠️ If you have not read the [introduction](intro.md) and [Leaflet setup](setup.md) parts before accessing this page, please **read them first**. The Leaflet setup is **required** to make the following instructions work.

## Using npm or Yarn

```bash
npm install react-leaflet@next # npm
yarn add react-leaflet@next # Yarn
```

React, ReactDOM and Leaflet are peer dependencies, if you haven't already installed them you can use:

```bash
npm install leaflet react react-dom # npm
yarn add leaflet react react-dom # Yarn
```

You can then use the API as presented in the [example CodePen](https://codepen.io/PaulLeCam/pen/gzVmGw).

## UMD

UMD builds are available on [unpkg](https://unpkg.com/):

```html
<!-- unpkg, production (minified) -->
<script src="https://unpkg.com/react-leaflet@next/dist/react-leaflet.min.js"></script>
<!-- unpkg, development -->
<script src="https://unpkg.com/react-leaflet@next/dist/react-leaflet.js"></script>
```

The library is injected as `window.ReactLeaflet`.\
See the [UMD example](https://github.com/PaulLeCam/react-leaflet/blob/master/example/umd.html) to get started.

⚠️ When using Object destructuring with the UMD build, prefer aliasing the `Map` class to avoid shadowing the browser's `Map`, using `const { Map: LeafletMap } = window.ReactLeaflet` rather than `const { Map } = window.ReactLeaflet` for example.
