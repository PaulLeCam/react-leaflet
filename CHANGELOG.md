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
- Removed `onOpen` and `onClose` properties from `Popup` and `Tooltip` components.
- Removed CommonJS distribution.
- Removed UMD distribution.

### Other changes

- Added support for React v18 (concurrent mode).
- Added support for `ref` in the `MapContainer` and `Pane` components.
- The created element and context objects are now frozen (immutable).
