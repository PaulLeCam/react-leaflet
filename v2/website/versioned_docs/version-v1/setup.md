---
id: version-v1-setup
title: Leaflet setup
original_id: setup
---

If you are not familiar with Leaflet, make sure to read and **follow the installation instructions** from its
[🍃 quick start guide](http://leafletjs.com/examples/quick-start/) before using
this library.\
You will notably need to add its CSS to your page to render the map properly, and
set the height of the `<Map>` container.

All components are React wrappers for Leaflet elements and layers, they need a
map instance and therefore must be included in a top-level `<Map>` component.
