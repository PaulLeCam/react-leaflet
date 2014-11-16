var React = require("react");
var Leaflet = require("leaflet");

var latlngType = require("./types/latlng");
var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "Marker",

  mixins: [popupContainerMixin],

  propTypes: {
    position: latlngType.isRequired
  },

  componentWillMount() {
    var {map, position, ...props} = this.props;
    this._leafletElement = Leaflet.marker(position, props);
  },

  componentDidUpdate(prevProps) {
    if (this.props.position !== prevProps.position) {
      this.getLeafletElement().setLatLng(this.props.position);
    }
  }
});
