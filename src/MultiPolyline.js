var React = require("react");
var Leaflet = require("leaflet");

var latlngListType = require("./types/latlngList");
var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "MultiPolyline",

  mixins: [popupContainerMixin],

  propTypes: {
    polylines: React.PropTypes.arrayOf(latlngListType).isRequired
  },

  componentWillMount() {
    var {map, polylines, ...props} = this.props;
    this._leafletElement = Leaflet.multiPolyline(polylines, props);
  },

  componentDidUpdate(prevProps) {
    if (this.props.polylines !== prevProps.polylines) {
      this.getLeafletElement().setLatLngs(this.props.polylines);
    }
  }
});
