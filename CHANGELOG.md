## v5.0.0 (2024-12-14)

### Breaking changes

- React v19 is now required as peer dependency.
- Removed `LeafletProvider` component from the core package.

## v5.0.0-rc.2 (2024-12-06)

This RC uses the stable releases of React v19.

## v5.0.0-rc.1 (2024-05-24)

### Breaking changes

- React v19 is now required as peer dependency.
- Removed `LeafletProvider` component from the core package.

## v4.2.1 (2023-02-28)

Fixed bounds update in `ImageOverlay`
([PR #1063](https://github.com/PaulLeCam/react-leaflet/pull/1063) by
[hwonyo](https://github.com/hwonyo))

## v4.2.0 (2022-11-27)

Added support for mutable `url` prop on `TileLayer`
([PR #1047](https://github.com/PaulLeCam/react-leaflet/pull/1047) by
[goto-bus-stop](https://github.com/goto-bus-stop))

## v4.1.0 (2022-09-24)

- Updated Leaflet dependency to v1.9.
- Fixed `eventHandlers` object being injected in WMS request URL.
- Added support for dynamic `bounds` props on `ImageOverlay`.

## v4.0.2 (2022-08-22)

- Fix typos in getting started docs
  ([PR #1013](https://github.com/PaulLeCam/react-leaflet/pull/1013) by
  [jacobtylerwalls](https://github.com/jacobtylerwalls))
- Fixing useRef() usage in createElementHook to prevent unnecessary Leaflet
  object creation
  ([PR #1014](https://github.com/PaulLeCam/react-leaflet/pull/1014) by
  [abac](https://github.com/abac))

## v4.0.1 (2022-06-25)

Fix calling `map.remove()` on `MapContainer` unmounting.

## v4.0.0 (2022-04-18)

Changes from v3:

### Breaking changes

- React v18 and Leaflet v1.8 are now required as peer dependency.
- ES2020 is the new compilation target version.
- Removed `useMapElement` hook.
- Removed `MapConsumer` component.
- Removed `whenCreated` property from the `MapContainer` component (a `ref`
  callback can be used instead).
- Removed `onOpen` and `onClose` properties from `Popup` and `Tooltip`
  components.
- Removed CommonJS distribution.
- Removed UMD distribution.

### Other changes

- Added support for React v18 (concurrent mode).
- Added support for `ref` in the `MapContainer` and `Pane` components.
- Added `createLeafletContext` function to core.
- The created element and context objects are now frozen (immutable).

## v4.0.0-beta.1 (2022-04-18)

Updated Leaflet dependency to v1.8 beta.

## v4.0.0-beta.0 (2022-04-02)

Updated React dependencies to v18 stable.

## v4.0.0-alpha.2 (2022-03-12)

- Added `createLeafletContext` function to core.
- Updated React dependencies to v18 RC2.
- Changed Leaflet dependency range to v1.7.x until tested with v1.8.x.

## v4.0.0-alpha.1 (2022-02-05)

- Merged changes from v3.
- Updated docs for v4 support.

## v4.0.0-alpha.0 (2022-01-05)

### Breaking changes

- React v18 is now required as peer dependency.
- ES2020 is the new compilation target version.
- Removed `useMapElement` hook.
- Removed `MapConsumer` component.
- Removed `whenCreated` property from the `MapContainer` component.
- Removed `onOpen` and `onClose` properties from `Popup` and `Tooltip`
  components.
- Removed CommonJS distribution.
- Removed UMD distribution.

### Other changes

- Added support for React v18 (concurrent mode).
- Added support for `ref` in the `MapContainer` and `Pane` components.
- The created element and context objects are now frozen (immutable).
