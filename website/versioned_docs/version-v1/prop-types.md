---
id: version-v1-prop-types
title: PropTypes
original_id: prop-types
---

The following PropTypes are exported in the `PropTypes` object.

**children**: One `PropTypes.node` or an Array of `PropTypes.node`.

**latLng**: One of `[number, number]`, `{lat: number, lng: number}` or `{lat: number, lon: number}`.

**latLngList**: An Array of _latLng_.

**bounds**: An instance of _Leaflet.LatLngBounds_ or a _latLngList_.

**controlPosition**: One of `topleft`, `topright`, `bottomleft` or
`bottomright`.

**layerContainer**: An object containing `addLayer()` and `removeLayer()`
functions.

**viewport**: An Object having an optional `center` of type _latLng_ and
optional `zoom` of type _number_.
