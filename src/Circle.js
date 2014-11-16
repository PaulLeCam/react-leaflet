var React = require("react");
var Leaflet = require("leaflet");

var latlngType = require("./types/latlng");
var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "Circle",

  mixins: [popupContainerMixin],

  propTypes: {
    center: latlngType.isRequired,
    radius: React.PropTypes.number.isRequired
  },

  componentWillMount() {
    var {center, map, radius, ...props} = this.props;
    this._leafletElement = Leaflet.circle(center, radius, props);
  }
});
