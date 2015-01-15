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
  setInitial: function(properties){
    var $__0=     properties,bounds=$__0.bounds,map=$__0.map,url=$__0.url,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{bounds:1,map:1,url:1});
    this.setState({url:url,bounds:bounds,props:props});
  },

  componentWillMount:function() {
    this.setInitial(this.props);
  },

  componentWillReceiveProps: function(nextProps){
    this.setInitial(nextProps);
  },

  render:function() {
    if(this._leafletElement){
      this._leafletElement.initialize(this.state.url, this.state.bounds, this.state.props);
      this._leafletElement.reset();
    }else{
      this._leafletElement = Leaflet.imageOverlay(this.state.url, this.state.bounds, this.state.props);
    }
    return null;
  }
});
