var React = require("react");
var Leaflet = require("leaflet");

var tileLayerMixin = require("./mixins/tileLayer");

module.exports = React.createClass({
  displayName: "WMSTileLayer",

  mixins: [tileLayerMixin],

  propTypes: {
    url: React.PropTypes.string.isRequired
  },

  componentWillMount:function() {
    var $__0=    this.props,map=$__0.map,url=$__0.url,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{map:1,url:1});
    this._leafletElement =  Leaflet.tileLayer.wms(url, props);
  }
});
