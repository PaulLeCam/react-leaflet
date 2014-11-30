var React = require("react");
var Leaflet = require("leaflet");

var latlngListType = require("./types/latlngList");
var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "MultiPolyline",

  mixins: [popupContainerMixin],

  propTypes: {
    polylines: React.PropTypes.arrayOf(latlngListType).isRequired
  },

  componentWillMount:function() {
    var $__0=    this.props,map=$__0.map,polylines=$__0.polylines,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{map:1,polylines:1});
    this._leafletElement = Leaflet.multiPolyline(polylines, props);
  },

  componentDidUpdate:function(prevProps) {
    if (this.props.polylines !== prevProps.polylines) {
      this.getLeafletElement().setLatLngs(this.props.polylines);
    }
  }
});
