## v2.8.0 (2020-10-22)

- Added React v17 to peer dependencies ([PR #773](https://github.com/PaulLeCam/react-leaflet/pull/773) by _anajavi_).
- [website] Added `react-esri-leaflet` plugin ([PR #768](https://github.com/PaulLeCam/react-leaflet/pull/768) by _slutske22_).

## v2.7.0 (2020-05-06)

- Added `viewBox` and `preserveAspectRatio` props to `SVGOverlay` component ([PR #704](https://github.com/PaulLeCam/react-leaflet/pull/704) by _spectras_).
- [website] Bump Leaflet docs links to v1.6.0 ([PR #686](https://github.com/PaulLeCam/react-leaflet/pull/686) by _moondef_).
- [website] Set react-leaflet-markercluster v2 support ([PR #693](https://github.com/PaulLeCam/react-leaflet/pull/693) by _yuzhva_).
- [website] Added react-leaflet-kml plugin ([PR #707](https://github.com/PaulLeCam/react-leaflet/pull/707) by _aviklai_).

## v2.6.3 (2020-03-13)

Fixed regression in v2.6.2 handling `maxZoom` and `minZoom` options in `Map` component.

## v2.6.2 (2020-03-12)

- Fixed applying `maxZoom` and `minZoom` options to tile layers.
- [website] Added `react-leaflet-geodesic` plugin ([PR #656](https://github.com/PaulLeCam/react-leaflet/pull/656) by _dcdourado_).
- [website] Added `react-leaflet-arrowheads` and `react-leaflet-editable-popup` plugins ([PR #678](https://github.com/PaulLeCam/react-leaflet/pull/678) by _slutske22_).
- [internal] Set babel runtime version ([PR #670](https://github.com/PaulLeCam/react-leaflet/pull/670) by _anajavi_).

## v2.6.1 (2019-12-14)

Fixed catching falsy values in `utils/pick` ([PR #649](https://github.com/PaulLeCam/react-leaflet/pull/649) by _CaptainLexington_).

## v2.6.0 (2019-11-18)

- Updated Leaflet dependency to v1.6.
- Added support for `doubleClickZoom` option's `center` setting to the `Map` component ([PR #633](https://github.com/PaulLeCam/react-leaflet/pull/633) by _DerGuteMoritz_).
- Added `markersInheritOptions` prop to `GeoJSON` component.
- [website] Updated `react-leaflet-bing` plugin ([PR #634](https://github.com/PaulLeCam/react-leaflet/pull/634) by _Charmatzis_).
- [website] Updated `react-leaflet-google` plugin ([PR #635](https://github.com/PaulLeCam/react-leaflet/pull/635) by _Charmatzis_).
- [website] Added `react-leaflet-curve` plugin ([PR #636](https://github.com/PaulLeCam/react-leaflet/pull/636) by _Shadowman4205_).

## v2.5.0 (2019-10-19)

- Added `SVGOverlay` component ([PR #630](https://github.com/PaulLeCam/react-leaflet/pull/630) by _fenech_).
- Added a `GeoJSON` with `Popup` example ([PR #608](https://github.com/PaulLeCam/react-leaflet/pull/608) by _hackleman_).
- Fixed wrongly injecting the `leaflet` parameter in the `WMSTileLayer` URL.
- [website] Added logo and branding guidelines ([PR #629](https://github.com/PaulLeCam/react-leaflet/pull/629) by _colbyfayock_).
- [website] Added `react-leaflet-enhanced-marker` plugin ([PR #610](https://github.com/PaulLeCam/react-leaflet/pull/610) by _ishaan6395_).
- [website] Added `leaflet-drift-marker` plugin ([PR #615](https://github.com/PaulLeCam/react-leaflet/pull/615) by _hugobarragon_).
- [website] Added `react-leaflet-street-view` plugin ([PR #616](https://github.com/PaulLeCam/react-leaflet/pull/616) by _ishaan6395_).
- [website] Removed unmaintained plugin `react-leaflet-rotatedmarker` plugin ([PR #617](https://github.com/PaulLeCam/react-leaflet/pull/617) by _verdie-g_).
- [website] Added `react-leaflet-d3-svg-overlay` plugin ([PR #628](https://github.com/PaulLeCam/react-leaflet/pull/628) by _johannesloetzsch_).

## v2.4.0 (2019-06-09)

- Added `ZoomPanOptions` and `FitBoundsOptions` to `Map` component ([PR #593](https://github.com/PaulLeCam/react-leaflet/pull/593) by _scailbc_).
- Updated Flow types support for Flow v0.100.
- [website] Updated Docusaurus.

## v2.3.0 (2019-05-12)

- Updated Leaflet dependency to v1.5.
- Updated React dependency to v16.8.
- Added `useLeaflet` hook ([PR #571](https://github.com/PaulLeCam/react-leaflet/pull/571) by _vadzim_).
- [website] Added `react-leaflet-google-layer` plugin ([PR #576](https://github.com/PaulLeCam/react-leaflet/pull/576) by _aviklai_).
- [internal] Replaced deprecated `webpack-serve` library by `webpack-dev-server` to run the examples.

## v2.2.1 (2019-02-17)

- Fixed passing options in the `LayerGroup` component ([PR #570](https://github.com/PaulLeCam/react-leaflet/pull/570) by _failociraptor_).
- [website] Added `react-leaflet-textpath` plugin ([PR #556](https://github.com/PaulLeCam/react-leaflet/pull/556) by _clementallen_).
- [website] Minor text fixes to components docs ([PR #558](https://github.com/PaulLeCam/react-leaflet/pull/558) by _arthurRuf_).
- [website] Updated compatibility info for 5 plugins and added 2 new plugins ([PR #560](https://github.com/PaulLeCam/react-leaflet/pull/560) and [PR #564](https://github.com/PaulLeCam/react-leaflet/pull/564) by _mhasbie_).
- [website] Updated `react-leaflet-control` compatibility status ([PR #567](https://github.com/PaulLeCam/react-leaflet/pull/567) by _robinmetral_).
- [website] Updated third party compatibility docs for 2 plugins ([PR #568](https://github.com/PaulLeCam/react-leaflet/pull/568) by _renanbandeira_).

## v2.2.0 (2019-01-12)

- Updated Leaflet dependency to v1.4.
- Fixed duplicate element creation in `Path` ([PR #549](https://github.com/PaulLeCam/react-leaflet/pull/549) by _vadzim_).
- Changed `whenReady` logic in `Map` to get triggered after React reference is bound.
- [internal] Replaced `lodash` with `fast-deep-equal` and vanilla JS implementations ([PR #554](https://github.com/PaulLeCam/react-leaflet/pull/554) by _jtfell_).
- [website] Added `react-leaflet-semicircle` plugin ([PR #552](https://github.com/PaulLeCam/react-leaflet/pull/552) by _clementallen_).

## v2.1.4 (2018-12-22)

Fixed event handlers changes in `Map` component.

## v2.1.3 (2018-12-15)

- [website] Added `react-leaflet-figure-editor` plugin ([PR #542](https://github.com/PaulLeCam/react-leaflet/pull/542) by _argonavt11_).
- [website] Added `react-leaflet-box-zoom` plugin ([PR #543](https://github.com/PaulLeCam/react-leaflet/pull/543) by _ChrisLowe-Takor_).
- Added example for custom icons usage ([PR #545](https://github.com/PaulLeCam/react-leaflet/pull/545) by _rlahoda_).
- Updated Flow types support for Flow v0.89.

## v2.1.2 (2018-11-10)

- Fixed support for multiple classes in the `Pane` component.
- [internal] Replaced some lodash functions ([PR #533](https://github.com/PaulLeCam/react-leaflet/pull/533) by _radeno_).
- [website] Added `react-leaflet-geojson-patterns` plugin ([PR #536](https://github.com/PaulLeCam/react-leaflet/pull/536) by _lkazberova_).

## v2.1.1 (2018-10-22)

- Fixed regression when updating the `className` prop of the `Map` component.
- [internal] Use ESM babel runtime ([PR #527](https://github.com/PaulLeCam/react-leaflet/pull/527) by _eanajavi_).
- [website] Indicate `react-leaflet-locate-control` as not compatible with v2 ([PR #528](https://github.com/PaulLeCam/react-leaflet/pull/528) by _eanajavi_).

## v2.1.0 (2018-10-06)

- Added support for dynamic `attribution` prop in layers.
- Added `MapEvented` abstract class used by `MapComponent` and `Map`.
- [website] Added `react-leaflet-freedraw` plugin ([PR #508](https://github.com/PaulLeCam/react-leaflet/pull/508) by _elangobharathi_).
- [website] Updated "Lifecycle process" overview ([PR #509](https://github.com/PaulLeCam/react-leaflet/pull/509) by _clintharris_).
- [website] Added `react-leaflet-distortable-imageoverlay` plugin ([PR #511](https://github.com/PaulLeCam/react-leaflet/pull/511) by _ChrisLowe-Takor_).
- [website] Fixed typo in docs ([PR #513](https://github.com/PaulLeCam/react-leaflet/pull/513) by _Roconda_).
- [website] Added `react-leaflet-sidetabs` plugin ([PR #517](https://github.com/PaulLeCam/react-leaflet/pull/517) by _eferhatg_).
- [website] Added `leaflet-react-track-player` plugin ([PR #523](https://github.com/PaulLeCam/react-leaflet/pull/523) by _argonavt11_).
- [website] Added `react-leaflet-wmts` plugin ([PR #524](https://github.com/PaulLeCam/react-leaflet/pull/523) by _mpivaa_).
- [internal] Updated Babel dependency to v7.

## v2.0.1 (2018-08-14)

- Fixed setting `maxZoom` and `minZoom` options to `GridLayer` using `Map` options.
- [website] Added `react-leaflet-search` and `react-leaflet-zoom-indicator` plugins ([PR #501](https://github.com/PaulLeCam/react-leaflet/pull/501) by _tumerorkun_).

## v2.0.0 (2018-07-05)

Changes from v1.9.1:

- [BREAKING] Updated React dependency to v16.3.
- [BREAKING] Replaced React context usage with new APIs introduced in React v16.3.
- [BREAKING] Removed PropTypes.
- [BREAKING] Dropped support for IE < 11.
- [React Portals](https://reactjs.org/docs/portals.html) are now used to render the `DivOverlay` and therefore `Popup` and `Tooltip` components, enabling context propagation ([PR #475](https://github.com/PaulLeCam/react-leaflet/pull/475) by _hannesj_).
- Replaced wrapping `div` elements with `Fragment`.
- Added `collapsed` as dynamic property to `LayersControl`.
- Added `ControlledLayer` abstract class export.
- [website] Added `react-leaflet-nmscale` plugin ([PR #479](https://github.com/PaulLeCam/react-leaflet/pull/479) by _anajavi_).
- [website] Added 3 plugins ([PR #482](https://github.com/PaulLeCam/react-leaflet/pull/482) by _fullhdpixel_).
- [website] Updated docs for abstract classes and usage for custom components.

## v2.0.0-rc.3 (2018-07-02)

Added `collapsed` as dynamic property to `LayersControl`.

## v2.0.0-rc.2 (2018-06-28)

- Added `ControlledLayer` abstract class export.
- [website] Updated docs for abstract classes and usage for custom components.

## v2.0.0-rc.1 (2018-06-10)

- [website] Added `react-leaflet-nmscale` plugin ([PR #479](https://github.com/PaulLeCam/react-leaflet/pull/479) by _anajavi_).
- [website] Added 3 plugins ([PR #482](https://github.com/PaulLeCam/react-leaflet/pull/482) by _fullhdpixel_).

## v2.0.0-beta.1 (2018-05-26)

- [BREAKING] Updated React dependency to v16.3.
- [BREAKING] Replaced React context usage with new APIs introduced in React v16.3.
- [BREAKING] Removed PropTypes.
- [BREAKING] Dropped support for IE < 11.
- [React Portals](https://reactjs.org/docs/portals.html) are now used to render the `DivOverlay` and therefore `Popup` and `Tooltip` components, enabling context propagation ([PR #475](https://github.com/PaulLeCam/react-leaflet/pull/475) by _hannesj_).
- Replaced wrapping `div` elements with `Fragment`.
