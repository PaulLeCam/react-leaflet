var React = require("react");
var Leaflet = require("leaflet");

var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "FeatureGroup",

  mixins: [popupContainerMixin],

  propTypes: {
    layers: React.PropTypes.array.isRequired
  },

  componentWillMount() {
    var {layers, map, ...props} = this.props;
    this._leafletElement = Leaflet.featureGroup(layers);
  }
});
