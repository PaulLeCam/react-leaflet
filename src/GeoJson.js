var React = require("react");
var Leaflet = require("leaflet");

var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "GeoJson",

  mixins: [popupContainerMixin],

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {geoJson: Leaflet.geoJson(this.props.data, this.props)};
  },

  componentWillMount() {
    var {data, map, ...props} = this.props;
    this._leafletElement = Leaflet.geoJson(data, props);
  }
});
