var React = require("react");
var Leaflet = require("leaflet");

var latlngType = require("./types/latlng");
var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "CircleMarker",

  mixins: [popupContainerMixin],

  propTypes: {
    center: latlngType.isRequired
  },

  componentWillMount() {
    var {center, map, ...props} = this.props;
    this._leafletElement = Leaflet.circleMarker(center, props);
  }
});
