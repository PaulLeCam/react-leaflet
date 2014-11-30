var React = require("react");
var Leaflet = require("leaflet");

var latlngListType = require("./types/latlngList");
var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "Polyline",

  mixins: [popupContainerMixin],

  propTypes: {
    positions: latlngListType.isRequired
  },

  componentWillMount:function() {
    var $__0=    this.props,map=$__0.map,positions=$__0.positions,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{map:1,positions:1});
    this._leafletElement = Leaflet.polyline(positions, props);
  },

  componentDidUpdate:function(prevProps) {
    if (this.props.positions !== prevProps.positions) {
      this.getLeafletElement().setLatLngs(this.props.positions);
    }
  }
});
