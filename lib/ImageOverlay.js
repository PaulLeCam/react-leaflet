var React = require("react");
var Leaflet = require("leaflet");

var boundsType = require("./types/bounds");
var mapLayerMixin = require("./mixins/mapLayer");

module.exports = React.createClass({
  displayName: "ImageOverlay",

  mixins: [mapLayerMixin],

  propTypes: {
    url: React.PropTypes.string.isRequired,
    bounds: boundsType.isRequired
  },

  componentWillMount:function() {
    var $__0=     this.props,bounds=$__0.bounds,map=$__0.map,url=$__0.url,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{bounds:1,map:1,url:1});
    this._leafletElement =  Leaflet.imageOverlay(url, bounds, props);
  },

  render:function() {
    return null;
  }
});
