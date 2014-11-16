var React = require("react");
var Leaflet = require("leaflet");

var tileLayerMixin = require("./mixins/tileLayer");

module.exports = React.createClass({
  displayName: "TileLayer",

  mixins: [tileLayerMixin],

  propTypes: {
    url: React.PropTypes.string.isRequired
  },

  componentWillMount() {
    var {map, url, ...props} = this.props;
    this._leafletElement =  Leaflet.tileLayer(url, props);
  },

  componentDidUpdate(prevProps) {
    var {url} = this.props;
    if (url && url !== prevProps.url) {
      this.getLeafletElement().setUrl(url);
    }
  }
});
