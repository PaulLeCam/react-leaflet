---
id: version-v1-custom-components
title: Creating custom components
original_id: custom-components
---

React-Leaflet aims to provide all the controls and layers provided by Leaflet,
but it does not support any Leaflet plugin.

The [plugins page](plugins.md) offers a non-exhaustive list of third-party plugins.\
If these plugins do not match your needs, adding layers and behaviors provided by plugins in your application should be relatively easy by extending one of the components provided by React-Leaflet (see the [class hierarchy](class-hierarchy.md) to find the most relevant component to extend) and implementing the relevant methods:

* `createLeafletElement (props: Object): Object` (mandatory): create and return
  the relevant Leaflet element instance. this instance will be stored in the
  class as `this.leafletElement` and used by other methods handling behavior
  such as events bindings.
* `updateLeafletElement (fromProps: Object, toProps: Object): Object`
  (optional): use this method to update the `leafletElement` according to the
  properties changes.

Make sure to read the [introduction page](intro.md) of this
documentation to understand what your custom component should use and eventually
provide, and check the [class hierarchy](class-hierarchy.md) to see what component to extend.
