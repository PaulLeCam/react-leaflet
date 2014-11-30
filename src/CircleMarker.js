var React = require("react");
var Leaflet = require("leaflet");

var latlngType = require("./types/latlng");
var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "CircleMarker",

  mixins: [popupContainerMixin],

  propTypes: {
    center: latlngType.isRequired,
    radius: React.PropTypes.number
  },

  componentWillMount() {
    var {center, map, ...props} = this.props;
    this._leafletElement = Leaflet.circleMarker(center, props);
  },

  componentDidUpdate(prevProps) {
    if (this.props.center !== prevProps.center) {
      this.getLeafletElement().setLatLng(this.props.center);
    }
    if (this.props.radius !== prevProps.radius) {
      this.getLeafletElement().setRadius(this.props.radius);
    }
  }
});
