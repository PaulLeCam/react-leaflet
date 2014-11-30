var React = require("react");
var Leaflet = require("leaflet");

var latlngListType = require("./types/latlngList");
var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "Rectangle",

  mixins: [popupContainerMixin],

  propTypes: {
    bounds: latlngListType.isRequired
  },

  componentWillMount:function() {
    var $__0=    this.props,bounds=$__0.bounds,map=$__0.map,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{bounds:1,map:1});
    this._leafletElement = Leaflet.rectangle(bounds, props);
  },

  componentDidUpdate:function(prevProps) {
    if (this.props.bounds !== prevProps.bounds) {
      this.getLeafletElement().setBounds(this.props.bounds);
    }
  }
});
