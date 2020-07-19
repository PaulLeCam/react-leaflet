## v1.9.1 (2018-03-22)

- Added check for open popup to rendering logic ([PR #464](https://github.com/PaulLeCam/react-leaflet/pull/464) by _olabalboa_).
- [website] Added plugins ([PR #463](https://github.com/PaulLeCam/react-leaflet/pull/463) by _mhasbie_).

## v1.9.0 (2018-03-14)

- Fixed event listeners removal in `Map` ([PR #459](https://github.com/PaulLeCam/react-leaflet/pull/459) by _andersonveiga_).
- Added support for dynamic handlers in `Map` ([PR #452](https://github.com/PaulLeCam/react-leaflet/pull/452) by _jonathanchrisp_).
- Added `DivOverlay` component as base class for `Popup` and `Tooltip`, now supporting dynamic `className` prop.
- [website] Updated Docusaurus, with added on-page navigation sidebar.

## v1.8.2 (2018-02-26)

- Fixed `Map` unmounting when `preferCanvas` is set.
- Added `es` folder to npm package ([PR #449](https://github.com/PaulLeCam/react-leaflet/pull/449) by _jonathanchrisp_).
- [website] Fixed link in examples page.
- [internal] Updated examples to webpack 4.

## v1.8.1 (2018-02-21)

- Fixed `Tooltip` component unmounting.
- Updated Flow support for v0.66 ([PR #447](https://github.com/PaulLeCam/react-leaflet/pull/447) by _slek22_).
- [website] Fixed typo ([PR #440](https://github.com/PaulLeCam/react-leaflet/pull/440) by _BartWaardenburg_).
- [website] Added plugins ([PR #446](https://github.com/PaulLeCam/react-leaflet/pull/446) by _mhasbie_).

## v1.8.0 (2018-01-15)

React-Leaflet now has a website! Check out [react-leaflet.js.org](https://react-leaflet.js.org/) to browse the documentation.\
If you wish to help out improving the website, [this issue is a good starting point](https://github.com/PaulLeCam/react-leaflet/issues/434)!

- Updated documentation and dependency to
  [Leaflet v1.3](http://leafletjs.com/2018/01/15/leaflet-1.3.0.html).
- Added `HTMLImageElement` support to `ImageOverlay` (new in Leaflet v1.3).
- [website] Setup using Docusaurus.
- [website] Fixed links to examples ([PR #430](https://github.com/PaulLeCam/react-leaflet/pull/430) by _subelsky_).

## v1.7.8 (2017-12-03)

Update `Popup` and `Tooltip` layout after render
([PR #423](https://github.com/PaulLeCam/react-leaflet/pull/423) by _jeffchan_).

## v1.7.7 (2017-11-27)

More permissive support for the `className` prop of `Map`.

## v1.7.6 (2017-11-23)

- Fixed supporting `Popup` children in `CircleMarker`.
- Fixed updating multiple classes in the `className` prop of `Map`.

## v1.7.5 (2017-11-20)

Fixed unmounting `Tooltip` with `interactive` prop.

## v1.7.4 (2017-11-10)

Updated Flow types for Flow v0.59
([PR #412](https://github.com/PaulLeCam/react-leaflet/pull/412) by _rsolomon_).

## v1.7.3 (2017-11-04)

Fixed `Tooltip` teardown logic.

## v1.7.2 (2017-10-31)

- Updated docs to use `https` for URLs ([PR #403](https://github.com/PaulLeCam/react-leaflet/pull/403) by _sehaas_).
- Fixed initial props in `WMSTileLayer` ([PR #405](https://github.com/PaulLeCam/react-leaflet/pull/405) by _markhepburn_).
- Added tests for viewport and teardown logic in the `Map` component ([PR #406](https://github.com/PaulLeCam/react-leaflet/pull/406) by _uxtx_).

## v1.7.1 (2017-10-09)

- Added UMD build to CDNJS ([PR #11863 in cdnjs/cdnjs](https://github.com/cdnjs/cdnjs/pull/11863) and [#390](https://github.com/PaulLeCam/react-leaflet/pull/390) by _extend1994_).
- Fixed setting the default pane for `Popup` and `Tooltip` ([PR #394](https://github.com/PaulLeCam/react-leaflet/pull/394) by _RichardWithnell_).

## v1.7.0 (2017-09-26)

- [internal] Added support for building the library using node 6 ([PR #376](https://github.com/PaulLeCam/react-leaflet/pull/376) by _tusbar_).
- Added support for React v16 as peer dependency.

## v1.6.6 (2017-09-05)

- Fixed `Path` options.
- Fixed `WMSTileLayer` options.

## v1.6.5 (2017-08-31)

- [doc] Added `react-leaflet-sidebarv2` to the plugins documentation ([PR #369](https://github.com/PaulLeCam/react-leaflet/pull/369) by _markhepburn_).
- Fixed Flow types in `Map` and `Popup`.

## v1.6.4 (2017-08-24)

Fixed `positions` proptype in `Polyline`.

## v1.6.3 (2017-08-21)

Fixed support for Flow types.

## v1.6.2 (2017-08-21)

Added support for Flow types in CommonJS and ESM builds as Flow comments.

## v1.6.1 (2017-08-20)

- Fixed `GridLayer` inheriting `maxZoom` and `minZoom` from `Map`.
- Fixed regression introduced in v1.6.0 with `ScaleControl`.

## v1.6.0 (2017-08-20)

- [internal] Updated build process ([PR #359](https://github.com/PaulLeCam/react-leaflet/pull/359) by _tusbar_) - see the [UPGRADING guide](UPGRADING.md) for more information if you're relying on internals.
- [internal] Fixed hot module reloading in examples ([PR #360](https://github.com/PaulLeCam/react-leaflet/pull/360) by _tusbar_).
- Updated Flow types to support Flow v0.53.

## v1.5.0 (2017-08-10)

Updated documentation and dependency to [Leaflet v1.2](http://leafletjs.com/2017/08/08/leaflet-1.2.0.html).

## v1.4.1 (2017-07-25)

Fixed allowing a `zoom` value of `0` in `Map`.

## v1.4.0 (2017-06-28)

This release now requires Leaflet v1.1+ as a peer dependency in order to add support for the [new features introduced by Leaflet in this release](http://leafletjs.com/2017/06/27/leaflet-1.1.0.html):

- Added support for dynamic `zIndex` property to `ImageOverlay`.
- Added [`VideoOverlay` component](https://github.com/PaulLeCam/react-leaflet/blob/master/docs/Components.md#videooverlay).
- Moved the `prop-types` dependency to `peerDependencies`.

See the [relevant section of the upgrading guide](https://github.com/PaulLeCam/react-leaflet/blob/master/UPGRADING.md#v14) for more information.

## v1.3.1 (2017-06-20)

Fixed Popup auto-panning.

## v1.3.0 (2017-06-11)

- Added `viewport` property to `Map`, as an alternative and complementary way to manipulate the map's viewport.
- Added `onViewportChange` and `onViewportChanged` callbacks to `Map` as a simplified way to track the map's viewport changes.
- Added `onClose` and `onOpen` callbacks to `Popup`.
- Added `onClose` and `onOpen` callbacks to `Tooltip`.

## v1.2.2 (2017-06-07)

Fixed updating the Map's `zoom` when not previously set.

## v1.2.1 (2017-06-01)

Removed leftover `console.log()` in `Polygon`.

## v1.2.0 (2017-05-24)

- Added support for dynamic `bounds` property in `ImageOverlay`, [PR #326](https://github.com/PaulLeCam/react-leaflet/pull/328) by _Gjum_.
- Added `whenReady` property to `Map`, running the provided function according to [Leaflet's documentation](http://leafletjs.com/reference-1.0.3.html#map-whenready).

## v1.1.7 (2017-05-20)

- Fixed DOM leak when unmounting an unclosed popup, [PR #326](https://github.com/PaulLeCam/react-leaflet/pull/326) by _DirtyHairy_.
- [doc] Updated Leaflet documentation links, [PR #324](https://github.com/PaulLeCam/react-leaflet/pull/324) by _Chris-Petty_.
- [doc] Fixed "quick start" link, [PR #321](https://github.com/PaulLeCam/react-leaflet/pull/321) by _mojo5000_.
- [doc] Added react-leaflet-ant-path to the plugins documentation, [PR #318](https://github.com/PaulLeCam/react-leaflet/pull/318) by _rubenspgcavalcante_.

## v1.1.6 (2017-04-10)

- Added support for React v15.5, fixes PropTypes warning.
- [internal] Use Prettier code formatting.

## v1.1.5 (2017-04-05)

Filter falsy values as event handlers, [PR #308](https://github.com/PaulLeCam/react-leaflet/pull/308) by _awinograd_.

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
- [doc] Various improvements, including PRs [#280](https://github.com/PaulLeCam/react-leaflet/pull/280) by _h4_, [#282](https://github.com/PaulLeCam/react-leaflet/pull/282) by _cwalv_ and [#283](https://github.com/PaulLeCam/react-leaflet/pull/283) by _YUzhva_.

## v1.1.0 (2017-01-11)

- Added support for `Popup` and `Tooltip` children to `ImageOverlay` [PR #270](https://github.com/PaulLeCam/react-leaflet/pull/270) by _rjdestigter_.
- Added `createLeafletElement()` and `updateLeafletElement()` methods to simplify the abstraction between React's lifecycle hooks and Leaflet's APIs. See the [relevant section of the upgrading guide](https://github.com/PaulLeCam/react-leaflet/blob/master/UPGRADING.md#v11) for more information.

## v1.0.3 (2017-01-07)

Fixed updating the `className` property of `Map`.

## v1.0.2 (2016-12-19)

Fixed binding events in `FeatureGroup`.

## v1.0.1 (2016-11-26)

- Fixed updating `opacity` and `zIndex` in `WMSTileLayer` ([PR #259 ](https://github.com/PaulLeCam/react-leaflet/pull/259) by _YannickBochatay_).
- [doc] Added link to plugins documentation in README ([PR #258](https://github.com/PaulLeCam/react-leaflet/pull/258) by _jakehm_).

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
- Added `useFlyTo: bool` property to `Map` to use `flyTo` instead of `setView` and `flyToBounds` instead of `fitBounds` when changing the map's view or bounds ([PR #148](https://github.com/PaulLeCam/react-leaflet/pull/192) by _jgimbel_).
- Added `GridLayer`.
- Added `Pane` component introduced in Leaflet v1. ([PR #227](https://github.com/PaulLeCam/react-leaflet/pull/227) by _rjdestigter_).
- Added `Tooltip` component introduced in Leaflet v1. See [Leaflet's documentation](http://leafletjs.com/reference-1.0.0.html#tooltip) for usage.
- Added support for IE9 and IE10 ([PR #235](https://github.com/PaulLeCam/react-leaflet/pull/235) by _dettier_).
- Updated `WMSTileLayer` to support dynamic `url` and parameters.
- [internal] Fixed Flow errors ([PR #251](https://github.com/PaulLeCam/react-leaflet/pull/251) by _joeyrosztoczy_).
- [internal] Updated `MapLayer` to only create divs when necessary.
- [internal] Removed `BaseTileLayer`, replaced by `GridLayer`.
- [internal] Removed `bower.json` file.

## v1.0.0-rc.3 (2016-11-04)

Updated `WMSTileLayer` to support dynamic `url` property.

## v1.0.0-rc.2 (2016-10-20)

- Added `Pane` component introduced in Leaflet v1. ([PR #227](https://github.com/PaulLeCam/react-leaflet/pull/227) by _rjdestigter_).
- Added support for IE9 and IE10 ([PR #235](https://github.com/PaulLeCam/react-leaflet/pull/235) by _dettier_).
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
- Added `useFlyTo: bool` property to `Map` to use `flyTo` instead of `setView` and `flyToBounds` instead of `fitBounds` when changing the map's view or bounds ([PR #148](https://github.com/PaulLeCam/react-leaflet/pull/192) by _jgimbel_).
