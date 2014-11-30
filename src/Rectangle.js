var React = require("react");
var Leaflet = require("leaflet");

var latlngListType = require("./types/latlngList");
var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "Rectangle",

  mixins: [popupContainerMixin],

  propTypes: {
    bounds: latlngListType.isRequired
  },

  componentWillMount() {
    var {bounds, map, ...props} = this.props;
    this._leafletElement = Leaflet.rectangle(bounds, props);
  },

  componentDidUpdate(prevProps) {
    if (this.props.bounds !== prevProps.bounds) {
      this.getLeafletElement().setBounds(this.props.bounds);
    }
  }
});
