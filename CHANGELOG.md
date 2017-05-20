## v1.1.7 (2017-05-20)

- Fixed DOM leak when unmounting an unclosed popup, [PR #326](https://github.com/PaulLeCam/react-leaflet/pull/326) by *DirtyHairy*.
- Updated Leaflet documentation links, [PR #324](https://github.com/PaulLeCam/react-leaflet/pull/324) by *Chris-Petty*.
- Fixed "quick start" link, [PR #321](https://github.com/PaulLeCam/react-leaflet/pull/321) by *mojo5000*.
- Added react-leaflet-ant-path to the plugins documentation, [PR #318](https://github.com/PaulLeCam/react-leaflet/pull/318) by *rubenspgcavalcante*.

## v1.1.6 (2017-04-10)

- Added support for React v15.5, fixes PropTypes warning.
- [internal] Use Prettier code formatting.

## v1.1.5 (2017-04-05)

Filter falsy values as event handlers, [PR #308](https://github.com/PaulLeCam/react-leaflet/pull/308) by *awinograd*.

## v1.1.4 (2017-03-22)

Fixed updating some properties in `TileLayer` and `WMSTileLayer`.

## v1.1.3 (2017-03-15)

Fixed regressions in `GridLayer` and Babel configuration.

## v1.1.2 (2017-03-14)

Make `GridLayer` inherit `maxZoom` and `minZoom` properties from `Map`.

## v1.1.1 (2017-03-06)

- The UMD build is now created using Webpack 2.
- Fixed supporting multiple children in `Marker`.
- [internal] Updated Webpack to v2.
- [internal] Small refactoring of the `Map` component.
- [doc] Various improvements, including PRs [#280](https://github.com/PaulLeCam/react-leaflet/pull/280) by *h4*, [#282](https://github.com/PaulLeCam/react-leaflet/pull/282) by *cwalv* and [#283](https://github.com/PaulLeCam/react-leaflet/pull/283) by *YUzhva*.

## v1.1.0 (2017-01-11)

- Added support for `Popup` and `Tooltip` children to `ImageOverlay` [PR #270](https://github.com/PaulLeCam/react-leaflet/pull/270) by *rjdestigter*.
- Added `createLeafletElement()` and `updateLeafletElement()` methods to simplify the abstraction between React's lifecycle hooks and Leaflet's APIs. See the [relevant section of the upgrading guide](https://github.com/PaulLeCam/react-leaflet/blob/master/UPGRADING.md#v11) for more information.

## v1.0.3 (2017-01-07)

Fixed updating the `className` property of `Map`.

## v1.0.2 (2016-12-19)

Fixed binding events in `FeatureGroup`.

## v1.0.1 (2016-11-26)

- Fixed updating `opacity` and `zIndex` in `WMSTileLayer` ([PR #259 ](https://github.com/PaulLeCam/react-leaflet/pull/259) by *YannickBochatay*).
- [doc] Added link to plugins documentation in README ([PR #258](https://github.com/PaulLeCam/react-leaflet/pull/258) by *jakehm*).

## v1.0.0 (2016-11-14)

Changes from v0.12.3:

- [BREAKING] Updated Leaflet dependency requirement to v1.0.0.
- [BREAKING] Renamed `GeoJson` to `GeoJSON` to match Leaflet's change.
- [BREAKING] Removed `MultiPolygon` and `MultiPolyline`, now supported by `Polygon` and `Polyline` respectively.
- [BREAKING] Removed `CanvasTileLayer`, replaced by `GridLayer`. See [Leaflet's documentation](http://leafletjs.com/reference-1.0.0.html#gridlayer).
- [BREAKING] Removed `getLeafletElement()` method in `MapComponent` and `MapControl`, deprecated since v0.12.0.
- [BREAKING] Removed `setIconDefaultImagePath()` helper, set `Leaflet.Icon.Default.imagePath` directly using Leaflet if you need.
- `Leaflet.Icon.Default.imagePath` is no longer set by default, as per Leaflet v1.0.0 it should be auto-detected.
- The `Map` component no longer creates an unique ID for its container if none is provided.
- Added `useFlyTo: bool` property to `Map` to use `flyTo` instead of `setView` and `flyToBounds` instead of `fitBounds` when changing the map's view or bounds ([PR #148](https://github.com/PaulLeCam/react-leaflet/pull/192) by *jgimbel*).
- Added `GridLayer`.
- Added `Pane` component introduced in Leaflet v1. ([PR #227](https://github.com/PaulLeCam/react-leaflet/pull/227) by *rjdestigter*).
- Added `Tooltip` component introduced in Leaflet v1. See [Leaflet's documentation](http://leafletjs.com/reference-1.0.0.html#tooltip) for usage.
- Added support for IE9 and IE10 ([PR #235](https://github.com/PaulLeCam/react-leaflet/pull/235) by *dettier*).
- Updated `WMSTileLayer` to support dynamic `url` and parameters.
- [internal] Fixed Flow errors ([PR #251](https://github.com/PaulLeCam/react-leaflet/pull/251) by *joeyrosztoczy*).
- [internal] Updated `MapLayer` to only create divs when necessary.
- [internal] Removed `BaseTileLayer`, replaced by `GridLayer`.
- [internal] Removed `bower.json` file.

## v1.0.0-rc.3 (2016-11-04)

Updated `WMSTileLayer` to support dynamic `url` property.

## v1.0.0-rc.2 (2016-10-20)

- Added `Pane` component introduced in Leaflet v1. ([PR #227](https://github.com/PaulLeCam/react-leaflet/pull/227) by *rjdestigter*).
- Added support for IE9 and IE10 ([PR #235](https://github.com/PaulLeCam/react-leaflet/pull/235) by *dettier*).
- Updated `WMSTileLayer` to support dynamic parameters.

## v1.0.0-rc.1 (2016-09-28)

- [BREAKING] Removed `setIconDefaultImagePath()` helper, set `Leaflet.Icon.Default.imagePath` directly using Leaflet if you need.
- Updated Leaflet dependency requirement to v1.0.0.
- `Leaflet.Icon.Default.imagePath` is no longer set by default, as per Leaflet v1.0.0 it should be auto-detected.

## v1.0.0-beta.3 (2016-08-26)

Fixed `Tooltip` removal handling.

## v1.0.0-beta.2 (2016-08-20)

- Added `Tooltip` component introduced in Leaflet v1.0.0-rc.2. See [Leaflet's documentation](http://leafletjs.com/reference-1.0.0.html#tooltip) for usage.
- Updated Leaflet dependency to v1.0.0-rc.3.
- Reverted basing components on `React.PureComponent`, they are now based on `React.Component`.

## v1.0.0-beta.1 (2016-07-30)

- [BREAKING] Renamed `GeoJson` to `GeoJSON` to match Leaflet's change.
- [BREAKING] Removed `MultiPolygon` and `MultiPolyline`, now supported by `Polygon` and `Polyline` respectively.
- [BREAKING] Removed `CanvasTileLayer`, replaced by `GridLayer`. See [Leaflet's documentation](http://leafletjs.com/reference-1.0.0.html#gridlayer).
- [BREAKING] Removed `getLeafletElement()` method in `MapComponent` and `MapControl`, deprecated since v0.12.0.
- Removed `BaseTileLayer`, replaced by `GridLayer`.
- Removed `bower.json` file.
- The `Map` component no longer creates an unique ID for its container if none is provided.
- All components now extend from `React.PureComponent` instead of `React.Component`, as such React v15.3.0+ is now required.
- Added `GridLayer`.
- Added `useFlyTo: bool` property to `Map` to use `flyTo` instead of `setView` and `flyToBounds` instead of `fitBounds` when changing the map's view or bounds ([PR #148](https://github.com/PaulLeCam/react-leaflet/pull/192) by *jgimbel*).

## v0.12.3 (2016-09-21)

Fixed events bindind in UMD build.

## v0.12.2 (2016-09-09)

- Updated propTypes to allow polygons with holes in `MultiPolygon` ([PR #218](https://github.com/PaulLeCam/react-leaflet/pull/218) by *ernoaapa*).
- Fixed badly named `ScaleControl` class.

## v0.12.1 (2016-07-08)

- Fixed unmounting `LayersControl` when the `Map` is unmounting as well.
- Added a [plugins](docs/Plugins.md) section to the [documentation](docs).

## v0.12.0 (2016-06-25)

- [BREAKING] Moved Leaflet instances injection from props to [context](https://facebook.github.io/react/docs/context.html). All components provided by this lib should continue to work as expected, but custom components need to be updated. Read the [UPGRADING](UPGRADING.md) file for more information.
- Deprecated `getLeafletElement()` method, simply use the `leafletElement` property instead.
- Documentation moved to the [docs](docs) folder and has been split into different files for better readability.

## v0.11.7 (2016-06-14)

Fixed removing layers from `LayersControl`.

## v0.11.6 (2016-06-09)

- Fixed allowing to set and update the `style` prop as a function in `GeoJson`.
- [internal] Added [lodash-webpack-plugin](https://github.com/lodash/lodash-webpack-plugin) to reduce the size of the UMD build.

## v0.11.5 (2016-05-14)

- Fixed updating `boundsOptions` in the `Map` without updating `bounds`.
- Fixed setting `opacity` and `zIndex` properties to `0` in tile layers.

## v0.11.4 (2016-05-05)

Fixed `TileLayer` properties update.

## v0.11.3 (2016-04-28)

Made the `draggable` property in `Marker` dynamic ([PR #148](https://github.com/PaulLeCam/react-leaflet/pull/148) by *riolowry*).

## v0.11.2 (2016-04-25)

Fixed layer removal in `LayersControl`.

## v0.11.1 (2016-04-17)

Fixed `map` property injection in `LayersControl` ([PR #142](https://github.com/PaulLeCam/react-leaflet/pull/142) by *Dahlgren*).

## v0.11.0 (2016-04-09)

- [BREAKING] Added `layerContainer` property as a consistent replacement for `map` or `layerGroup` ([PR #132](https://github.com/PaulLeCam/react-leaflet/pull/132) by *boromisp*). This is only breaking if you are creating custom components, as you will need to make sure to also inject the `layerContainer` property to children layers as you need to do with `map`.
- Changed `LayersControl` to be based on components:
  - Added `LayersControl.BaseLayer` container component to add a base layer to a `LayersControl`.
  - Added `LayersControl.Overlay` container component to add an overlay to a `LayersControl`.
  - `baseLayers` and `overlays` properties for `LayersControl` are still supported but deprecated. Using either of them will make the `LayersControl` behave the same way it does in versions < 0.11.
- Deprecated `onLeaflet...` properties for events, simply use `on...`, ex `onClick` instead of `onLeafletClick`.
- Added warnings for deprecated features, the same way React does. Make sure to address these warnings to ease the transition to future releases.
- Added React v15.0.0 support as peer dependency.
- [internal] Fixed `no-unused-vars` linting ([PR #131](https://github.com/PaulLeCam/react-leaflet/pull/131) by *boromisp*).

## v0.10.2 (2016-03-12)

- Added `animate` optional property to `Map` ([PR #126](https://github.com/PaulLeCam/react-leaflet/pull/126) by *mariusandra*).
- Added React v15.0.0-rc.1 support as peer dependency.

## v0.10.1 (2016-02-22)

- Added the popup container as source layer to `Popup` creation, fixes [#113](https://github.com/PaulLeCam/react-leaflet/issues/113) ([PR #112](https://github.com/PaulLeCam/react-leaflet/pull/112) by *amarant*).
- [internal] Updated Lodash to v4.

## v0.10.0 (2015-12-22)

- Added `AttributionControl`, `LayersControl` and `ScaleControl` ([PR #100](https://github.com/PaulLeCam/react-leaflet/pull/100) by *jonboiser*).
- Added example to render a list of custom Markers ([PR #104](https://github.com/PaulLeCam/react-leaflet/pull/104) by *varya*).
- [internal] Updated Babel to v6.

## v0.9.0 (2015-11-12)

- Removed `PopupContainer` component, extended internally by other components.
- `FeatureGroup` now expects its layers to be passed as children, like `LayerGroup`.
- Added `renderChildrenWithProps()` to `MapLayer`, used internally by the library.
- Added `MapControl` as base component for controls.
- Added `ZoomControl`.

## v0.8.1 (2015-10-21)

Fix `PropTypes` export.

## v0.8.0 (2015-10-07)

Changes from v0.7.0:

- Updated React to v0.14.0.
- Added ReactDOM v0.14.0 to peer dependencies.
- `Popup` now renders its contents using `ReactDOM.render()` and therefore supports dynamic children.
- `Map` now supports dynamic `bounds` and `maxBounds` properties ([#72](https://github.com/PaulLeCam/react-leaflet/pull/72)).
- Added `LayerGroup` component ([#58](https://github.com/PaulLeCam/react-leaflet/pull/58)).

## v0.8.0-rc.3 (2015-09-29)

- Added `LayerGroup` component ([#58](https://github.com/PaulLeCam/react-leaflet/pull/58)).
- `Map` now supports dynamic `bounds` and `maxBounds` properties ([#72](https://github.com/PaulLeCam/react-leaflet/pull/72)).

## v0.8.0-rc.2 (2015-09-22)

Check if `Popup` content node exists before trying to unmount.

## v0.8.0-rc.1 (2015-09-16)

- Updated React to v0.14.0-rc1.
- Added ReactDOM v0.14.0-rc1 to peer dependencies.
- `Popup` now renders its contents using `ReactDOM.render()` and therefore supports dynamic children.

## v0.7.0 (2015-09-08)

- Updated Leaflet to v0.7.5.
- Added `Path` base component for vector layers, handling dynamic [Path options](http://leafletjs.com/reference.html#path-options) properties.
- Added support for holes in `Polygon`.
- [internal] Updated Jest to v0.5.
- [internal] Updated Gulpfile to use Babel.
- [internal] Added ESLint validation.

## v0.6.2 (2015-06-14)

Fix ignored events in `MapComponent` ([#41](https://github.com/PaulLeCam/react-leaflet/pull/41)).

## v0.6.1 (2015-05-22)

Fix `PopupContainer` export.

## v0.6.0 (2015-05-18)

- Added `style` property on the `Map` component.
- Replaced the `<noscript>` element in `PopupContainer` by a `<div>` to be properly updated.

## v0.5.0 (2015-05-02)

Set `icon`, `zIndexOffset` and `opacity` properties as dynamic on `Marker`.

## v0.4.1 (2015-04-06)

- Removed `getLeafletElement()` deprecation.
- Updated Babel to v5.

## v0.4.0 (2015-03-28)

Released v0.4.

## v0.4.0-rc.1 (2015-03-11)

React v0.13.0.

## v0.4.0-beta.1 (2015-03-08)

- Updated React dependency to v0.13.0-rc2:
  - Components are defined as ES6 classes.
  - Mixins are replaced by the base components `MapComponent`, `MapLayer`, `BaseTileLayer` and `PopupContainer`. All components extend from these.
  - The new [`React.cloneElement()`](https://facebook.github.io/react/blog/2015/03/03/react-v0.13-rc2.html#react.cloneelement) API is used instead of the deprecated `React.addons.cloneWithProps()` to pass the `map` property to the components.
  - The `map` property has been removed from the components `propTypes` definition as it is dynamically injected to its children by the `Map` component, React would [now warn it is not set](https://facebook.github.io/react/blog/2015/02/24/streamlining-react-elements.html#solution-early-proptype-warnings). It is still required by components to have access to the Leaflet object.
- Events can now be set as `on{Event}` rather than `onLeaflet{Event}`, ex `onClick` instead of `onLeafletClick`, as all events are proxied to Leaflet.
- Deprecated `getLeafletElement()` method, simply use the `leafletElement` property instead to access the Leaflet object created for a component.
