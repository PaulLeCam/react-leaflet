var React = require("react");
var Leaflet = require("leaflet");

var latlngListType = require("./types/latlngList");
var mapLayerMixin = require("./mixins/mapLayer");

module.exports = React.createClass({
  displayName: "ImageOverlay",

  mixins: [mapLayerMixin],

  propTypes: {
    url: React.PropTypes.string.isRequired,
    bounds: latlngListType.isRequired
  },

  componentWillMount() {
    var {bounds, map, url, ...props} = this.props;
    this._leafletElement =  Leaflet.imageOverlay(url, bounds, props);
  },

  render() {
    return null;
  }
});
