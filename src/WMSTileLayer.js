var React = require("react");
var Leaflet = require("leaflet");

var tileLayerMixin = require("./mixins/tileLayer");

module.exports = React.createClass({
  displayName: "WMSTileLayer",

  mixins: [tileLayerMixin],

  propTypes: {
    url: React.PropTypes.string.isRequired
  },

  componentWillMount() {
    var {map, url, ...props} = this.props;
    this._leafletElement =  Leaflet.tileLayer.wms(url, props);
  }
});
