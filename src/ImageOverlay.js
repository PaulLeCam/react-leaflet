var React = require("react");
var Leaflet = require("leaflet");

var boundsType = require("./types/bounds");
var mapLayerMixin = require("./mixins/mapLayer");

module.exports = React.createClass({
  displayName: "ImageOverlay",

  mixins: [mapLayerMixin],

  propTypes: {
    url: React.PropTypes.string.isRequired,
    bounds: boundsType.isRequired,
    opacity: React.PropTypes.number,
    attribution: React.PropTypes.string
  },

  componentWillMount() {
    var {bounds, map, url, ...props} = this.props;
    this._leafletElement =  Leaflet.imageOverlay(url, bounds, props);
  },

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.getLeafletElement().setUrl(this.props.url);
    }
    if (this.props.opacity !== prevProps.opacity) {
      this.getLeafletElement().setOpacity(this.props.opacity);
    }
  },

  render() {
    return null;
  }
});
