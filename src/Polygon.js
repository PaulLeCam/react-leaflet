var React = require("react");
var Leaflet = require("leaflet");

var latlngListType = require("./types/latlngList");
var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "Polygon",

  mixins: [popupContainerMixin],

  propTypes: {
    positions: latlngListType.isRequired
  },

  componentWillMount() {
    var {map, positions, ...props} = this.props;
    this._leafletElement = Leaflet.polygon(positions, props);
  }
});
