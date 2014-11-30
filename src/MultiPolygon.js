var React = require("react");
var Leaflet = require("leaflet");

var latlngListType = require("./types/latlngList");
var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "MultiPolygon",

  mixins: [popupContainerMixin],

  propTypes: {
    polygons: React.PropTypes.arrayOf(latlngListType).isRequired
  },

  componentWillMount() {
    var {map, polygons, ...props} = this.props;
    this._leafletElement = Leaflet.multiPolygon(polygons, props);
  },

  componentDidUpdate(prevProps) {
    if (this.props.polygons !== prevProps.polygons) {
      this.getLeafletElement().setLatLngs(this.props.polygons);
    }
  }
});
