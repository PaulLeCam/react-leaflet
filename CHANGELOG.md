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

React 0.13.0.

## v0.4.0-beta.1 (08/03/15)

- Updated React dependency to 0.13.0-rc2:
  - Components are defined as ES6 classes.
  - Mixins are replaced by the base components `MapComponent`, `MapLayer`, `BaseTileLayer` and `PopupContainer`. All components extend from these.
  - The new [`React.cloneElement()`](https://facebook.github.io/react/blog/2015/03/03/react-v0.13-rc2.html#react.cloneelement) API is used instead of the deprecated `React.addons.cloneWithProps()` to pass the `map` property to the components.
  - The `map` property has been removed from the components `propTypes` definition as it is dynamically injected to its children by the `Map` component, React would [now warn it is not set](https://facebook.github.io/react/blog/2015/02/24/streamlining-react-elements.html#solution-early-proptype-warnings). It is still required by components to have access to the Leaflet object.
- Events can now be set as `on{Event}` rather than `onLeaflet{Event}`, ex `onClick` instead of `onLeafletClick`, as all events are proxied to Leaflet.
- Deprecated `getLeafletElement()` method, simply use the `leafletElement` property instead to access the Leaflet object created for a component.
