## v0.10.2 (12/03/16)

- Added `animate` optional property to `Map` ([PR #126](https://github.com/PaulLeCam/react-leaflet/pull/126) by *mariusandra*).
- Added React v15.0.0-rc.1 support as peer dependencies.

## v0.10.1 (22/02/16)

- Added the popup container as source layer to `Popup` creation, fixes [#113](https://github.com/PaulLeCam/react-leaflet/issues/113) ([PR #112](https://github.com/PaulLeCam/react-leaflet/pull/112) by *amarant*).
- [internal] Updated Lodash to v4.

## v0.10.0 (22/12/15)

- Added `AttributionControl`, `LayersControl` and `ScaleControl` ([PR #100](https://github.com/PaulLeCam/react-leaflet/pull/100) by *jonboiser*).
- Added example to render a list of custom Markers ([PR #104](https://github.com/PaulLeCam/react-leaflet/pull/104) by *varya*).
- [internal] Updated Babel to v6.

## v0.9.0 (12/11/15)

- Removed `PopupContainer` component, extended internally by other components.
- `FeatureGroup` now expects its layers to be passed as children, like `LayerGroup`.
- Added `renderChildrenWithProps()` to `MapLayer`, used internally by the library.
- Added `MapControl` as base component for controls.
- Added `ZoomControl`.

## v0.8.1 (21/10/15)

Fix `PropTypes` export.

## v0.8.0 (07/10/15)

Changes from v0.7.0:

- Updated React to v0.14.0.
- Added ReactDOM v0.14.0 to peer dependencies.
- `Popup` now renders its contents using `ReactDOM.render()` and therefore supports dynamic children.
- `Map` now supports dynamic `bounds` and `maxBounds` properties ([#72](https://github.com/PaulLeCam/react-leaflet/pull/72)).
- Added `LayerGroup` component ([#58](https://github.com/PaulLeCam/react-leaflet/pull/58)).

## v0.8.0-rc.3 (29/09/15)

- Added `LayerGroup` component ([#58](https://github.com/PaulLeCam/react-leaflet/pull/58)).
- `Map` now supports dynamic `bounds` and `maxBounds` properties ([#72](https://github.com/PaulLeCam/react-leaflet/pull/72)).

## v0.8.0-rc.2 (22/09/15)

Check if `Popup` content node exists before trying to unmount.

## v0.8.0-rc.1 (16/09/15)

- Updated React to v0.14.0-rc1.
- Added ReactDOM v0.14.0-rc1 to peer dependencies.
- `Popup` now renders its contents using `ReactDOM.render()` and therefore supports dynamic children.

## v0.7.0 (08/09/15)

- Updated Leaflet to v0.7.5.
- Added `Path` base component for vector layers, handling dynamic [Path options](http://leafletjs.com/reference.html#path-options) properties.
- Added support for holes in `Polygon`.
- [internal] Updated Jest to v0.5.
- [internal] Updated Gulpfile to use Babel.
- [internal] Added ESLint validation.

## v0.6.2 (14/06/15)

Fix ignored events in `MapComponent` ([#41](https://github.com/PaulLeCam/react-leaflet/pull/41)).

## v0.6.1 (22/05/15)

Fix `PopupContainer` export.

## v0.6.0 (18/05/15)

- Added `style` property on the `Map` component.
- Replaced the `<noscript>` element in `PopupContainer` by a `<div>` to be properly updated.

## v0.5.0 (02/05/15)

Set `icon`, `zIndexOffset` and `opacity` properties as dynamic on `Marker`.

## v0.4.1 (06/04/15)

- Removed `getLeafletElement()` deprecation.
- Updated Babel to v5.

## v0.4.0 (28/03/15)

Released v0.4.

## v0.4.0-rc.1 (11/03/15)

React v0.13.0.

## v0.4.0-beta.1 (08/03/15)

- Updated React dependency to v0.13.0-rc2:
  - Components are defined as ES6 classes.
  - Mixins are replaced by the base components `MapComponent`, `MapLayer`, `BaseTileLayer` and `PopupContainer`. All components extend from these.
  - The new [`React.cloneElement()`](https://facebook.github.io/react/blog/2015/03/03/react-v0.13-rc2.html#react.cloneelement) API is used instead of the deprecated `React.addons.cloneWithProps()` to pass the `map` property to the components.
  - The `map` property has been removed from the components `propTypes` definition as it is dynamically injected to its children by the `Map` component, React would [now warn it is not set](https://facebook.github.io/react/blog/2015/02/24/streamlining-react-elements.html#solution-early-proptype-warnings). It is still required by components to have access to the Leaflet object.
- Events can now be set as `on{Event}` rather than `onLeaflet{Event}`, ex `onClick` instead of `onLeafletClick`, as all events are proxied to Leaflet.
- Deprecated `getLeafletElement()` method, simply use the `leafletElement` property instead to access the Leaflet object created for a component.
