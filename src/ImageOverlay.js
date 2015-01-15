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

  render() {
    var {bounds, map, url, ...props} = this.props;

    if(this._leafletElement){
      this.props.map.removeLayer(this._leafletElement);
      this._leafletElement = Leaflet.imageOverlay(url, bounds, props);
      this.props.map.addLayer(this._leafletElement);
    }else{
      this._leafletElement = Leaflet.imageOverlay(url, bounds, props);
    }
    return null;
  },

});
