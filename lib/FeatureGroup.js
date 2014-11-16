var React = require("react");
var Leaflet = require("leaflet");

var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "FeatureGroup",

  mixins: [popupContainerMixin],

  propTypes: {
    layers: React.PropTypes.array.isRequired
  },

  componentWillMount:function() {
    var $__0=    this.props,layers=$__0.layers,map=$__0.map,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{layers:1,map:1});
    this._leafletElement = Leaflet.featureGroup(layers);
  }
});
